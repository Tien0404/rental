const Post = require("../models/post.model");
const { uploadImage, deleteImage } = require("../config/cloudinary");
const fs = require("fs");
const validator = require("validator");

exports.createPost = async (req, res) => {
  try {
    console.log("Dữ liệu nhận vào:", req.body);
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }
    if (!req.userId) {
      return res.status(400).json({ message: "Không tìm thấy userId" });
    }
    const newPost = new Post({
      userId: req.userId,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      area: req.body.area,
      categoryId: req.body.categoryId,
      serviceId: req.body.serviceId,
      paymentId: req.body.paymentId,
      images: imageUrls,
      expiredAt: req.body.expiredAt,
      status: req.body.status || "active",
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const filters = {};
    if (req.query.title)
      filters.title = { $regex: req.query.title, $options: "i" };
    if (req.query.location)
      filters.location = { $regex: req.query.location, $options: "i" };
    if (req.query.categoryId) filters.categoryId = req.query.categoryId;

    const posts = await Post.find(filters)
      .populate("userId categoryId serviceId")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bài đăng", error });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name phone createdAt")
      .populate("categoryId", "name")
      .populate("serviceId", "name rating title_color");
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({ message: "Error fetching post by ID", error });
  }
};
exports.updatePost = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const post = await Post.findById(req.params.id);
    let imageUrls = post.images;
    if (req.files && req.files.length > 0) {
      for (const imageUrl of imageUrls) {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await deleteImage(publicId);
      }
      imageUrls = [];
      for (const file of req.files) {
        const result = await uploadImage(file.path);
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path);
      }
    }
    if (req.body.title) post.title = req.body.title;
    if (req.body.description) post.description = req.body.description;
    if (req.body.price) post.price = req.body.price;
    if (req.body.location) post.location = req.body.location;
    if (req.body.area) post.area = req.body.area;
    if (req.body.categoryId) post.categoryId = req.body.categoryId;
    if (req.body.servicesId) post.servicesId = req.body.servicesId;
    if (imageUrls && imageUrls.length > 0) post.images = imageUrls;
    if (req.body.status) post.status = req.body.status;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "Không tìm thấy userId" });
    }
    const posts = await Post.find({ userId })
      .populate("categoryId serviceId")
      .exec();

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài đăng của người dùng" });
    }

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách bài đăng của người dùng",
      error,
    });
  }
};
exports.searchPosts = async (req, res) => {
  try {
    const filters = {};

    // Lọc
    if (req.query.categoryId) filters.categoryId = req.query.categoryId;
    if (req.query.location)
      filters.location = { $regex: req.query.location, $options: "i" };
    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {
        ...(req.query.minPrice && { $gte: parseFloat(req.query.minPrice) }),
        ...(req.query.maxPrice && { $lte: parseFloat(req.query.maxPrice) }),
      };
    }
    if (req.query.minArea || req.query.maxArea) {
      filters.area = {
        ...(req.query.minArea && { $gte: parseFloat(req.query.minArea) }),
        ...(req.query.maxArea && { $lte: parseFloat(req.query.maxArea) }),
      };
    }

    // Phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sắp xếp
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const posts = await Post.find(filters)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.status(200).json({ posts, currentPage: page });
  } catch (error) {
    console.error("Error in searchPosts:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi tìm kiếm bài đăng", error: error.message });
  }
};
