import React, { useState } from 'react';
import Mylayout from '../../components/Layout/Mylayout';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../../styles/authstyle.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const backendUrl = process.env.BACKEND_URL || "https://cloud-pharmacy-api.vercel.app"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/forgotpassword`, { email, answer, newpassword });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطا");
    }
  }

  return (
    <Mylayout title={"نسيت كلمة المرور - الزغبي"}>
      <>
        <div className='login'>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail" placeholder='ادخل الايميل' />
            </div>
            <div className="mb-3">
              <input type="password" required value={newpassword} onChange={(e) => { setNewpassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder='ادخل كلمة المرور' />
            </div>
            <div className="mb-3">
              <input type="text" required value={answer} onChange={(e) => { setAnswer(e.target.value) }} className="form-control" id="exampleInputAnswer" placeholder='ادخل اسم الصديق المفضل ' />
            </div>
            <button type="submit" className="btn btn-dark">Reset</button>
          </form>
        </div>
      </>
    </Mylayout>
  );
}

export default ForgotPassword;
