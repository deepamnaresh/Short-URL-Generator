import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validate } from 'email-validator';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
  });
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if ([formData.username, formData.email, formData.password, formData.fullName].some((value) => value?.trim() === "")) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!avatar) {
      setError("Profile picture is required");
      setLoading(false);
      return;
    }

    if (!validate(formData.email)) {
      setError("Please enter email in correct format");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("avatar", avatar);

      const response = await axios.post('http://localhost:5000/api/v1/users/register', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Signup successful:', response.data);
      setSuccess(true);
      setError(null);
    } catch (error) {
      setError("Email or username already exists");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="w-full max-w-md bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
        {success && <div className="mb-4 text-green-500">Signup successful! You can now <Link to="/user/login">login</Link>.</div>}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
          <input className="w-full border rounded px-3 py-2 text-gray-700" type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input className="w-full border rounded px-3 py-2 text-gray-700" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <div className="flex justify-between border rounded pe-3">
            <input className="w-full px-2 py-2 text-gray-700 outline-none" type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-5 h-5 top-0 right-0 mt-2 ml-2 text-gray-500 cursor-pointer">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
          <input className="w-full border rounded px-3 py-2 text-gray-700" type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">Profile Picture</label>
          <input className="w-full border rounded px-3 py-2 text-gray-700" type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} required />
        </div>

        <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-600" type="submit">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-gray-600">
          Already have an account? <Link to="/user/login" className="text-blue-500">Log in here</Link>.
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
