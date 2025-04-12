import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Payment,
  CategoryPage,
  Login,
  Register,
  VerificationPage,
  ForgetPassword,
  DetailPage,
  ServicePage,
  FeedbackPage,
  NewPost,
  ManagePostPage,
  UpdateProfilePage,
  PaymentHistoryPage,
  UpdatePostPage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/detail-page/:postId" element={<DetailPage />} />
        <Route path="/service-page" element={<ServicePage />} />
        <Route path="/feedback-page" element={<FeedbackPage />} />
        <Route path="/management/new-post" element={<NewPost />} />
        <Route
          path="/management/manage-post-page"
          element={<ManagePostPage />}
        />
        <Route
          path="/management/update-profile"
          element={<UpdateProfilePage />}
        />
        <Route path="/payment-history" element={<PaymentHistoryPage />} />
        <Route
          path="/management/update-post/:postId"
          element={<UpdatePostPage />}
        />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default App;
