import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle } from "../slices/authSlice";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      await dispatch(loginWithGoogle(credentialResponse.credential));
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
  };

  return (
    <div className="w-full">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <div className="relative flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
            width="300"
            disabled={isLoading || loading}
          />
          {(isLoading || loading) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 rounded">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleLoginButton;
