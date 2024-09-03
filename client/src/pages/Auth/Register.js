import React, { useState } from 'react';
import Mylayout from '../../components/Layout/Mylayout';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/authstyle.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const backendUrl = process.env.BACKEND_URL || "https://cloud-store-api-ruby.vercel.app"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/register`, { name, email, password, phone, address, answer });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data && res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا في الايميل او الرقم السري");
    }
  }

  return (
    <Mylayout title={"انشاء حساب - الزغبي"}>
      <div className='register'>
        <h2>انشاء حساب</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="form-control" 
              id="exampleInputName" 
              placeholder='ادخل الاسم'
            />
          </div>
          <div className="mb-3">
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
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
              onChange={(e) => setPassword(e.target.value)} 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder='ادخل الرقم السري' 
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              required 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              className="form-control" 
              id="exampleInputPhone" 
              placeholder='ادخل رقم الموبايل'
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              required 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="form-control" 
              id="exampleInputAddress" 
              placeholder='ادخل العنوان'
            />
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              required 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
              className="form-control" 
              id="exampleInputAnswer" 
              placeholder="اخل اسم صديقك المفضل لانه سيسدخدم لاسترجاع الحساب"
            />
          </div>
          <button type="submit" className="btn btn-dark">تسجيل</button>
        </form>
      </div>
    </Mylayout>
  );
}

export default Register;
