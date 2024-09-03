import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import Mylayout from '../../components/Layout/Mylayout';
import AdminMenu from '../../components/Layout/AdminMenu';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [auth] = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    answer: ''
  });
  const backendUrl = process.env.BACKEND_URL || "https://cloud-store-api-ruby.vercel.app"

  useEffect(() => {
    if (auth?.token) {
      fetchUsers();
    }
  }, [auth?.token]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/auth/users`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('خطا في جلب المستخدمين');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/v1/auth/users/${userId}`, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      if (data.success) {
        fetchUsers(); // Refresh the user list
        toast.success('تم مسح المستخدم بنجاح');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('فشل في مسح المستخدم');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUserDetails({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      password: '',
      answer: ''
    });
  };

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateUser = async () => {
    try {
      const { data } = await axios.put(`${backendUrl}/api/v1/auth/users/${selectedUser._id}`, userDetails, {
        headers: {
          Authorization: `${auth.token}`,
        },
      });
      if (data.success) {
        toast.success('تم تعديل المستخدم بنجاح');
        setSelectedUser(null);
        fetchUsers(); // Refresh the user list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('حدث خطا');
    }
  };

  return (
    <Mylayout title={"ادارة المستخدمين - الزغبي"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>ادارة المستخدمين</h1>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="بحث باسم المستخدم"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {filteredUsers.map((user) => (
              <div key={user._id} className="card mb-2">
                <div className="card-body">
                  <h5 className="card-title">الاسم: {user.name}</h5>
                  <p className="card-text">الايميل: {user.email}</p>
                  <p className="card-text">رقم الموبايل: {user.phone}</p>
                  <p className="card-text">العنوان: {user.address}</p>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    تعديل المستخدم
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    مسح المستخدم
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {selectedUser && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">تعديل المستخدم</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">الاسم</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">الايميل</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">رقم الموبايل</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">العنوان</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={userDetails.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">الرقم السري</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={userDetails.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">الصديق المفضل</label>
                    <input
                      type="text"
                      className="form-control"
                      name="answer"
                      value={userDetails.answer}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>غلق</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateUser}>حفظ التغييرات</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Mylayout>
  );
};

export default Users;
