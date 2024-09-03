import React from 'react'
import Mylayout from '../components/Layout/Mylayout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Mylayout title={"صفحة غير موجوده"}>
    <div className='pnf'>
    <h1 className='pnf-title'>404</h1>
    <h2 className='pnf-heading'>لا توجد صحة بهاذا الاسم</h2>
    <Link to="/" className='pnf-btn'>الرجوع</Link>
    </div>
    </Mylayout>
  )
}

export default PageNotFound