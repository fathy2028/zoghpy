import React, { useEffect, useState } from 'react';
import Mylayout from '../../components/Layout/Mylayout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedname, setUpdatedName] = useState("");
  const backendUrl = process.env.BACKEND_URL || "https://cloud-store-api-ruby.vercel.app"

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/v1/category/create-category`, { name });
      if (data?.success) {
        toast.success(` بنجاح ${name} تمت اضافة `);
        getallCategories();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا في الاضافة");
    }
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${backendUrl}/api/v1/category/update-category/${selected._id}`, { name: updatedname });
      if (data.success) {
        toast.success(`${updatedname} الاسم الجديد الان هو`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getallCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("هناك خطا في اضافة الفئة");
    }
  };

  const handledelete = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/v1/category/deletecategory/${id}`);
      if (data.success) {
        toast.success(`تم المسح بنجاح`);
        setSelected(null);
        getallCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا في المسح");
    }
  };

  const getallCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/category/getcategories`);
      if (data?.success) {
        setCategories(data?.categories);
      } else {
        toast.error("خطا في جلب الفئات");
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطا");
    }
  };

  useEffect(() => {
    getallCategories();
  }, []);

  return (
    <Mylayout title={"ادارة الفئات - الزغبي"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Category Management</h1>
            <div className='p-3 w-50'>
              <CategoryForm handlesubmit={handlesubmit} value={name} setValue={setName} />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">الاسم</th>
                    <th scope="col">العمليات</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map(c => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c); }} className='btn btn-primary ms-2'>تعديل</button>
                        <button onClick={() => handledelete(c._id)} className='btn btn-danger ms-2'>مسح</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
              <CategoryForm value={updatedname} setValue={setUpdatedName} handlesubmit={handleupdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Mylayout>
  );
};

export default CreateCategory;
