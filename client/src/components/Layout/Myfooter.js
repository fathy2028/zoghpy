import React from 'react'
import {Link} from "react-router-dom"
const Myfooter = () => {
  return (
    <div className='footer'>
   <h4 className='text-center'>
    All Rights Reserved! &copy; Eng/ Fathy Nassef 01096180475
   </h4> 
   <p className='text-center mt-3'>
   <Link to="/contactus">اتصل بنا</Link> | <Link to="/aboutus">من نحن</Link> |  <Link to="/policy">سياسة الخصوصية</Link>
   </p>
    </div>
  )
}

export default Myfooter