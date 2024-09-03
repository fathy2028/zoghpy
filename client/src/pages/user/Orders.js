import React, { useEffect, useState } from 'react';
import Mylayout from '../../components/Layout/Mylayout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const backendUrl = process.env.BACKEND_URL || "https://cloud-store-api-ruby.vercel.app"

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/order/user-orders`, {
          headers: {
            Authorization: auth.token
          }
        });
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch orders");
      }
    };

    if (auth?.token) {
      fetchOrders();
    }
  }, [auth, backendUrl]);

  const deleteOrder = async (orderId) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/v1/order/user-order/${orderId}`, {
        headers: {
          Authorization: auth.token
        }
      });
      if (data.success) {
        toast.success('تم المسح بنجاح');
        setOrders(orders.filter(order => order._id !== orderId)); // Remove deleted order from state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("فشل في مسح الطلب");
    }
  };

  // Function to get the URL for product photo
  const getProductPhotoUrl = (productId) => {
    return `${backendUrl}/api/v1/product/get-product-photo/${productId}`;
  };

  return (
    <Mylayout title={"الطلبات الزغبي"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <h1>Orders</h1>
            {orders.length === 0 ? (
              <p>لا توجد طلبات حاليا</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className="card mb-3">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Order ID: {order._id} - Status: {order.status}</span>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteOrder(order._id)}
                    >
                      مسح الطلب
                    </button>
                  </div>
                  <div className="card-body">
                    {order.products.map(product => (
                      <div key={product._id} className="row mb-2">
                        <div className="col-md-4">
                          <img 
                            src={getProductPhotoUrl(product._id)} 
                            alt={product.name} 
                            width="100" 
                            height="100" 
                            style={{ objectFit: 'fill' }} 
                          />
                        </div>
                        <div className="col-md-8">
                          <h5>{product.name}</h5>
                          <p>{product.description}</p>
                          <h6>السعر: {product.price}</h6>
                        </div>
                      </div>
                    ))}
                    <h5>المجموع: {order.totalcash}</h5>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Mylayout>
  );
};

export default Orders;
