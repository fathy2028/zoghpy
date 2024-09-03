import React, { useState } from 'react';
import Mylayout from '../../components/Layout/Mylayout';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/authstyle.css";
import { useAuth } from '../../context/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const backendUrl = process.env.BACKEND_URL || "https://cloud-pharmacy-api.vercel.app"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/login`, { email, password });
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data && res.data.message);
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطا");
    }
  }

  return (
    <Mylayout title={"تسجيل الدخول - الزغبي"}>
      <div className='login'>
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => { setEmail(e.target.value) }} 
              className="form-control" 
              id="exampleInputEmail" 
              placeholder='ادخل الايميل' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => { setPassword(e.target.value) }} 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder='ادخل الرقم السري' 
            />
          </div>
          <div className="mb-3">
            <button 
              type="button" 
              onClick={() => { navigate("/forgotpassword") }} 
              className="btn btn-dark"
            >
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-dark">تسجيل</button>
        </form>
      </div>
    </Mylayout>
  );
}

export default Login;
