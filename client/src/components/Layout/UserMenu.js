import React from 'react'
import { NavLink } from 'react-router-dom';
const UserMenu = () => {
  return (
    <>
<div className='text-ceter'>
<div class="list-group">
<h1 className='bg-black text-light'>واجهة المستخدم</h1>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">الملف الشخصي</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">الطلبات</NavLink>
</div>
</div>
    </>
  )
}

export default UserMenu