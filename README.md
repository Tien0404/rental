# Nền tảng cho thuê phòng trọ toàn diện

![RentEase Logo](https://via.placeholder.com/200x200.png?text=RentEase)

RentEase là ứng dụng kết nối giữa người tìm phòng trọ và chủ nhà, giúp đơn giản hóa quy trình tìm kiếm và cho thuê nhà ở. Hệ thống gồm ứng dụng di động (Flutter), website (React) và trang quản trị (Angular), tất cả được hỗ trợ bởi backend NodeJS mạnh mẽ.

## Mục lục

- [Tổng quan](#tổng-quan)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Tính năng chính](#tính-năng-chính)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt và chạy ứng dụng](#cài-đặt-và-chạy-ứng-dụng)
  - [Backend (NodeJS)](#backend-nodejs)
  - [Mobile App (Flutter)](#mobile-app-flutter)
  - [Website (React)](#website-react)
  - [Admin Dashboard (Angular)](#admin-dashboard-angular)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Thành viên phát triển](#thành-viên-phát-triển)
- [License](#license)

## Tổng quan

RentEase giải quyết các vấn đề phổ biến trong thị trường thuê nhà:
- Thiếu minh bạch về thông tin phòng trọ
- Khó khăn trong việc liên hệ giữa người thuê và chủ nhà
- Thiếu hệ thống đánh giá và phản hồi đáng tin cậy
- Quy trình thanh toán và quản lý hợp đồng phức tạp

Dự án hướng đến xây dựng một nền tảng toàn diện, cung cấp trải nghiệm tìm kiếm và giao dịch minh bạch, an toàn và thuận tiện cho tất cả người dùng.

## Kiến trúc hệ thống

RentEase được xây dựng theo kiến trúc microservices, bao gồm:

1. **Backend (NodeJS + Express + MongoDB)**: Cung cấp RESTful API cho tất cả các ứng dụng client
2. **Mobile App (Flutter)**: Ứng dụng di động đa nền tảng (iOS & Android)
3. **Website (React)**: Giao diện web dành cho người dùng
4. **Admin Dashboard (Angular)**: Hệ thống quản trị cho quản trị viên

![System Architecture](https://via.placeholder.com/800x400.png?text=RentEase+Architecture)

## Tính năng chính

### Cho người thuê nhà:
- **Tìm kiếm phòng trọ**: Bộ lọc thông minh theo khu vực, giá cả, tiện ích
- **Xem chi tiết phòng**: Hình ảnh chất lượng cao, thông tin đầy đủ
- **Đặt lịch xem phòng**: Đặt lịch trực tiếp từ ứng dụng
- **Thanh toán**: Tích hợp ZaloPay, MoMo cho thanh toán an toàn
- **Đánh giá và phản hồi**: Hệ thống đánh giá minh bạch
- **Quản lý hợp đồng**: Theo dõi và quản lý các hợp đồng thuê nhà

### Cho chủ nhà:
- **Đăng tin cho thuê**: Giao diện thân thiện, dễ sử dụng
- **Quản lý danh sách phòng/nhà**: Theo dõi trạng thái các phòng/nhà cho thuê
- **Xác minh người thuê**: Hệ thống xác minh người thuê tiềm năng
- **Thống kê và báo cáo**: Báo cáo thu nhập và hoạt động chi tiết
- **Quản lý lịch xem phòng**: Lịch hẹn xem phòng và giao tiếp với khách hàng

### Tính năng kỹ thuật:
- **Xác thực người dùng**: Email, số điện thoại, Google OAuth
- **Tích hợp bản đồ**: Xem vị trí phòng trọ trên bản đồ
- **Thông báo thời gian thực**: Cập nhật thông tin ngay lập tức
- **Thanh toán đa nền tảng**: Hỗ trợ nhiều phương thức thanh toán
- **Quản lý hình ảnh**: Lưu trữ và tối ưu hình ảnh
- **Tương thích đa nền tảng**: iOS, Android, Web

## Công nghệ sử dụng

### Backend
- **Ngôn ngữ & Framework**: Node.js, Express
- **Cơ sở dữ liệu**: MongoDB
- **Authentication**: JWT, Passport.js, Google OAuth
- **Thanh toán**: ZaloPay API, MoMo API
- **Cloud Storage**: (Có thể sử dụng AWS S3, Firebase Storage,...)
- **Logging**: Winston, Morgan

### Mobile App
- **Framework**: Flutter
- **State Management**: Provider/Bloc
- **API Integration**: Dio/HTTP
- **Local Storage**: Shared Preferences, SQLite

### Website
- **Framework**: React
- **State Management**: Redux
- **UI Library**: Material UI/Ant Design
- **API Integration**: Axios

### Admin Dashboard
- **Framework**: Angular
- **UI Library**: Angular Material
- **Charts**: ngx-charts
- **API Integration**: HttpClient

## Cài đặt và chạy ứng dụng

### Backend (NodeJS)

```bash
# Di chuyển vào thư mục backend
cd serverjs

# Cài đặt các dependencies
npm install

# Khởi động server ở chế độ development
npm run dev

# Khởi động server ở chế độ production
npm start
```

Server sẽ chạy tại `http://localhost:3000`

### Mobile App (Flutter)

```bash
# Di chuyển vào thư mục mobile app
cd app_flutter

# Kiểm tra cài đặt Flutter
flutter doctor

# Cài đặt các dependencies
flutter pub get

# Chạy ứng dụng
flutter run
```

### Website (React)

```bash
# Di chuyển vào thư mục website
cd web-react

# Cài đặt các dependencies
npm install

# Chạy ứng dụng ở chế độ development
npm start
```

Website sẽ chạy tại `http://localhost:3001`

### Admin Dashboard (Angular)

```bash
# Di chuyển vào thư mục admin dashboard
cd admin-angular

# Cài đặt các dependencies
npm install

# Chạy ứng dụng ở chế độ development
ng serve
```

Admin dashboard sẽ chạy tại `http://localhost:4200`

## Cấu trúc dự án

```
rentease/
├── serverjs/                 # Backend NodeJS
│   ├── src/
│   │   ├── config/           # Cấu hình database, env,...
│   │   ├── controllers/      # Controller xử lý logic
│   │   ├── middlewares/      # Middleware xác thực,...
│   │   ├── models/           # Schema MongoDB
│   │   ├── routers/          # API routes
│   │   ├── utils/            # Utility functions
│   │   └── server.js         # Entry point
│   ├── uploads/              # Thư mục lưu file upload
│   └── package.json
│
├── app_flutter/              # Mobile App (Flutter)
│   ├── lib/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # App screens
│   │   ├── screens/          # Additional screens
│   │   ├── services/         # API services
│   │   └── main.dart         # Entry point
│   ├── assets/               # Images, fonts,...
│   └── pubspec.yaml          # Dependencies
│
├── web-react/                # Website (React)
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Website pages
│   │   ├── services/         # API services
│   │   ├── redux/            # State management
│   │   └── App.js            # Main component
│   └── package.json
│
└── admin-angular/           # Admin Dashboard (Angular)
    ├── src/
    │   ├── app/
    │   │   ├── components/   # Reusable UI components
    │   │   ├── pages/        # Dashboard pages
    │   │   ├── services/     # API services
    │   │   └── app.module.ts # Main module
    │   └── assets/           # Static assets
    └── package.json
```

## API Documentation

### Authentication

```
POST /api/auth/register - Đăng ký tài khoản
POST /api/auth/login - Đăng nhập
GET /api/auth/profile - Lấy thông tin user
PUT /api/auth/profile - Cập nhật thông tin user
```

### Posts (Bài đăng phòng trọ)

```
GET /api/posts - Lấy danh sách bài đăng
GET /api/posts/:id - Lấy chi tiết bài đăng
POST /api/posts - Tạo bài đăng mới
PUT /api/posts/:id - Cập nhật bài đăng
DELETE /api/posts/:id - Xóa bài đăng
```

### Categories

```
GET /api/categories - Lấy danh sách danh mục
GET /api/categories/:id - Lấy chi tiết danh mục
POST /api/categories - Tạo danh mục mới (Admin)
PUT /api/categories/:id - Cập nhật danh mục (Admin)
DELETE /api/categories/:id - Xóa danh mục (Admin)
```

### Services

```
GET /api/services - Lấy danh sách dịch vụ
GET /api/services/:id - Lấy chi tiết dịch vụ
POST /api/services - Tạo dịch vụ mới (Admin)
PUT /api/services/:id - Cập nhật dịch vụ (Admin)
DELETE /api/services/:id - Xóa dịch vụ (Admin)
```

### Feedback

```
GET /api/feedback - Lấy danh sách phản hồi
POST /api/feedback - Tạo phản hồi mới
PUT /api/feedback/:id - Cập nhật phản hồi
DELETE /api/feedback/:id - Xóa phản hồi
```

### Payment

```
POST /api/payment/zalopay - Thanh toán qua ZaloPay
POST /api/payment/momo - Thanh toán qua MoMo
GET /api/payment/history - Lấy lịch sử thanh toán
```

## Screenshots

![Home Screen](https://via.placeholder.com/300x600.png?text=Home+Screen)
![Search Results](https://via.placeholder.com/300x600.png?text=Search+Results)
![Room Details](https://via.placeholder.com/300x600.png?text=Room+Details)
![Payment Screen](https://via.placeholder.com/300x600.png?text=Payment+Screen)

## Thành viên phát triển

- Developer 1 - Frontend Developer
- Developer 2 - Backend Developer
- Developer 3 - Mobile Developer
- Developer 4 - UI/UX Designer

## License

© 2023 RentEase. All Rights Reserved.
