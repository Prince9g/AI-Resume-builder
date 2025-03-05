import axios from 'axios';
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/admin/login", formData);
      if(res.data.success){
        toast.success(res.data.message);
        localStorage.setItem("admin", JSON.stringify({ email: formData.email, isAuthenticated: true }));
        setTimeout(() => {
          navigate('/admin');
        }, 2000);

      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

    setFormData({email: '', password: ''});
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <div className="flex flex-col items-center justify-center gap-5 w-96 p-4 border border-gray-300 rounded-md">
        <h1 className="text-4xl font-bold">Sign In as Admin</h1>
        {/* Sign In form */}
        <form className="flex flex-col gap-4 w-full m-2" onSubmit={onSubmitHandler}>
          {/* email */}
          <input type="email" name="email" value={formData.email} className="w-full border rounded-md p-2" placeholder="Email" onChange={onChangeHandler}/>
          {/* password */}
          <input type="password" name="password" value={formData.password} className="w-full border rounded-md p-2" placeholder="Password" onChange={onChangeHandler}/>
          {/* submit button */}
          <button type="submit"  className="w-full border rounded-full p-2 bg-primary hover:bg-[#906ebf]">Sign In</button>
        </form>
        <p className="mt-4 text-center">Do not have an account? <Link to="/sign-up" className="text-[#60a1ea]">sign up</Link></p>
      </div>
    </div>
  )
}

export default Signin
