import React from "react";
import Logo from "../asset/Logo.svg";

const Forgotpassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="syncsystems" className="w-22 h-22" />
        </div>

        <h2 className="text-center text-xl font-semibold mb-4">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to get a password reset link.
        </p>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 rounded-lg hover:opacity-90 focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Forgotpassword;
