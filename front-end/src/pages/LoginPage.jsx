import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (!res.error) navigate("/");
    });
  };

  return (
    <>
      <NavBar />
      <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {loading && <Loader />}
        {error && <p className="text-red-500">{error.message || "Login failed"}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Inputs
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" text={loading ? <Loader /> : "Login"} />
        </form>
      </div>
    </>
  );
};

export default LoginPage;
