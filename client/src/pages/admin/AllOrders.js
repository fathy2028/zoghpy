import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import Mylayout from '../../components/Layout/Mylayout';
import AdminMenu from '../../components/Layout/AdminMenu';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [auth] = useAuth();
    const backendUrl = process.env.BACKEND_URL || "https://cloud-store-api-ruby.vercel.app"

    useEffect(() => {
        if (auth?.token) {
            fetchAllOrders();
        }
    }, [auth?.token]);

    const fetchAllOrders = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/order/all-orders`, {
                headers: {
                    Authorization: `${auth.token}`,
                },
            });
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch orders');
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const { data } = await axios.put(
                `${backendUrl}/api/v1/order/update-status/${orderId}`,
                { status },
                {
                    headers: {
                        Authorization: `${auth.token}`,
                    },
                }
            );
            if (data.success) {
                fetchAllOrders(); // Refresh the order list
                toast.success('تم تحديث الحالة بنجاح');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('قشل في تجدبث الحالة');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const { data } = await axios.delete(
                `${backendUrl}/api/v1/order/delete/${orderId}`,
                {
                    headers: {
                        Authorization: `${auth.token}`,
                    },
                }
            );
            if (data.success) {
                fetchAllOrders(); // Refresh the order list
                toast.success('تم مسح الطلب بنجاح');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('فشل في مسح الطلب');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredOrders = orders.filter(order =>
        order.customer && order.customer.name && order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getProductPhotoUrl = (productId) => {
        return `${backendUrl}/api/v1/product/get-product-photo/${productId}`;
    };

    return (
        <Mylayout title={"ادارة الطلبات - الزغبي"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>ادارة الطلبات</h1>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="بحث باسم العميل"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        {filteredOrders.map((order) => (
                            <div key={order._id} className="card mb-2">
                                <div className="card-body">
                                    <h5 className="card-title">رقم الطلب: {order._id}</h5>
                                    <p className="card-text">العميل: {order.customer ? order.customer.name : "No customer information"}</p>
                                    <p className="card-text">العنوان: {order.customer ? order.customer.address : "No address information"}</p>
                                    <p className="card-text">رقم الموبايل: {order.customer ? order.customer.phone : "No Phone information"}</p>
                                    <p className="card-text">المجموع: {order.totalcash} جنية</p>
                                    <p className="card-text">الحالة: {order.status}</p>
                                    <div className="mb-2">
                                        <strong>Products:</strong>
                                        <div className="d-flex flex-wrap">
                                            {order.products.map((product) => (
                                                <div key={product._id} className="d-flex align-items-center me-2 mb-2">
                                                    <img
                                                        src={getProductPhotoUrl(product._id)}
                                                        alt={product.name}
                                                        width="50"
                                                        height="50"
                                                        className="me-1"
                                                    />
                                                    <div>
                                                        <span>{product.name}</span>
                                                        <br />
                                                        <span>{product.price} جنية</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <select
                                            className="form-select me-2"
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        >
                                            <option value="Not processed">لم يتم اي اجراء</option>
                                            <option value="Processing">يتم البحث</option>
                                            <option value="Shipped">تم التعبئة</option>
                                            <option value="Out For Delivery">خرج للتستليم</option>
                                            <option value="Delivered">تم الاستلام</option>
                                            <option value="Canceled">تم الالغاء</option>
                                        </select>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteOrder(order._id)}
                                        >
                                            مسح الطلب
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Mylayout>
    );
};

export default AllOrders;
