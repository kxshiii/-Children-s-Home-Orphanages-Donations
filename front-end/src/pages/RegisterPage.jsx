import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (!res.error) navigate("/login");
    });
  };

  return (
    <>
      <NavBar />
      <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        {loading && <Loader />}
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Inputs
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
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
          <Button type="submit" text="Register" />
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
