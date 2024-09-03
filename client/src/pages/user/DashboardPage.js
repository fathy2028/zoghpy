import React from 'react'
import Mylayout from './../../components/Layout/Mylayout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';
const DashboardPage = () => {
  const [auth]=useAuth()
  return (
    <Mylayout title={"المستخدم - الزغبي"}>
    <div className='container-fluid m-3 p-3'>
      <div className='row'>
      <div className='col-md-3'>
        <UserMenu/>
      </div>
      <div className='col-md-9'>
        <div className='card w-75 p-3'>
        <h1>اسم المستخدم: {auth?.user?.name}</h1>
        <h1>الايميل: {auth?.user?.email}</h1>
        </div>
      </div>
      </div>
    </div>
    </Mylayout>
  )
}

export default DashboardPage