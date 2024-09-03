import React from 'react';
import Mylayout from './../components/Layout/Mylayout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const navigate = useNavigate();
    const backendUrl = process.env.BACKEND_URL || "https://cloud-pharmacy-api.vercel.app";

    const addToCart = (product) => {
        let newCart = [...cart];
        newCart.push(product);

        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        toast.success("تمت الاضافة الي العربة بنجاح");
    };

    const removeCartItem = (id) => {
        try {
            let newCart = [...cart];
            const productIndex = newCart.findIndex(item => item._id === id);

            if (productIndex > -1) {
                newCart.splice(productIndex, 1);
            }

            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            toast.success("تم الحزف من العربة بنجاح");
        } catch (error) {
            console.log(error);
            toast.error("فشل في الحذف من العربة");
        }
    };

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach(item => { total += item.price; });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "EGP"
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getProductCount = (id) => {
        return cart.filter(item => item._id === id).length;
    };

    const uniqueProducts = [...new Map(cart.map(item => [item._id, item])).values()];

    const placeOrder = async () => {
        try {
            const totalcash = cart.reduce((total, item) => total + item.price, 0);

            const { data } = await axios.post(`${backendUrl}/api/v1/order/create`, {
                products: cart.map(item => item._id),
                totalcash
            }, {
                headers: {
                    Authorization: auth.token
                }
            });

            if (data.success) {
                setCart([]);
                localStorage.removeItem("cart");
                toast.success(data.message);
                navigate('/dashboard/user/orders'); // Assuming you have an orders page to show placed orders
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("فشل في انشاء الطلب");
        }
    };

    // Function to get the URL for product photo
    const getProductPhotoUrl = (productId) => {
        return `${backendUrl}/api/v1/product/get-product-photo/${productId}`;
    };

    return (
        <Mylayout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`${auth?.token && auth?.user?.name} اهلا`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `في العربة ${cart?.length} لديك ${auth?.token ? "" : "من فضلك قم بتسجيل الدخول لكي تقوم بانشاء الطلب"}` : "العربة فارغة"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {uniqueProducts.map(p => (
                            <div key={p._id} className='row mb-2 card p-3 flex-row'>
                                <div className='col-md-4'>
                                    <img 
                                        style={{ objectFit: "fill" }} 
                                        width={"100px"} 
                                        height={"100px"} 
                                        src={getProductPhotoUrl(p._id)} 
                                        alt={p.name} 
                                        className='product-image' 
                                    />
                                </div>
                                <div className='col-md-8'>
                                    <h4>{p.name}</h4>
                                    <p>{p.description.substring(0, 30)}</p>
                                    <h3><b>EGP</b>{p.price}</h3>
                                    <p>Quantity: {getProductCount(p._id)}</p>
                                    <div className='d-flex align-items-center'>
                                        <button className='btn btn-danger me-2' onClick={() => removeCartItem(p._id)}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        <button className='btn btn-primary' onClick={() => addToCart(p)}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-4 text-center'>
                        <h2>Cart Summary</h2>
                        <h5>المجموع | انشاء الطلب | الدفع</h5>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {
                            auth?.user?.address ? (
                                <>
                                    <div className='mb-3'>
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>تعديل العنوان اذا كنت في مكان اخر</button>
                                    </div>
                                </>
                            ) : (
                                <div className='mb-3'>
                                    {
                                        auth?.token ? (
                                            <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>تعديل العنوان اذا كنت في مكان اخر</button>
                                        ) : (
                                            <button className='btn btn-outline-warning' onClick={() => navigate("/login", { state: "/cart" })}>قم بتسجيل الدخول للتتمنكن من انشاء طلب</button>
                                        )
                                    }
                                </div>
                            )
                        }
                        {
                            cart.length > 0 && auth?.token && (
                                <button className='btn btn-success' onClick={placeOrder}>انشاء طلب</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Mylayout>
    );
};

export default CartPage;
