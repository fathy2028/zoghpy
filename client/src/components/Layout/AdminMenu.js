import React from 'react'
import Mylayout from './Mylayout';
import { NavLink } from 'react-router-dom';
const AdminMenu = () => {
  return (
    <>
<div className='text-ceter'>
<div class="list-group">
<h1 className='bg-black text-light'>واجهة المسئول</h1>
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action"> انشاء فئة</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">اضافة منتج</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">المنتجات</NavLink>
  <NavLink to="/dashboard/admin/allusers" className="list-group-item list-group-item-action">ادارة المستخدمين</NavLink>
  <NavLink to="/dashboard/admin/adminprofile" className="list-group-item list-group-item-action">الملف الشخصي</NavLink>
  <NavLink to="/dashboard/admin/allorders" className="list-group-item list-group-item-action">ادارة الطلبات</NavLink>
</div>
</div>
    </>
  )
}

export default AdminMenu