import React, { useEffect, useState } from 'react';
import Mylayout from './../components/Layout/Mylayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import '../styles/home.css';

const ProductDetails = () => {
    const [cart, setCart] = useCart();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const backendUrl = process.env.BACKEND_URL || "https://cloud-pharmacy-api.vercel.app";

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/product/get-product/${params.id}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
            toast.error("خطا في جلب المنتجات");
        }
    };

    useEffect(() => {
        if (params.id) {
            getProduct();
        }
    }, [params.id]);

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/v1/product/related-product/${pid}/${cid}`);
            if (data?.success) {
                setRelatedProducts(data.products);
            } else {
                toast.error("لا توجد منتجات مشابهة");
            }
        } catch (error) {
            console.log(error);
            toast.error("خطا في جلب منتجات مشابهة");
        }
    };

    // Function to get the URL for product photo
    const getProductPhotoUrl = (productId) => {
        return `${backendUrl}/api/v1/product/get-product-photo/${productId}`;
    };

    return (
        <Mylayout title={"تفاصيل المنتج الزغبي"}>
            <div className='row container mt-2'>
                <div className='col-md-6'>
                    <img 
                        style={{ objectFit: "cover" }} 
                        height={"400px"} 
                        width={"400px"} 
                        src={getProductPhotoUrl(product._id)} 
                        alt={product.name}  
                    />
                </div>
                <div className='col-md-6'>
                    <h1 className='text-center'>تفاصيل المنتج</h1>
                    <h5> {product.name} :الاسم</h5>
                    <h5> <b>جنية</b> {product.price} :السعر </h5>
                    <h5> {product.description}:الوصف</h5>
                    <h5>{product.category?.name} :الفئة</h5>
                    <button 
                        style={{ backgroundColor: "black" }} 
                        className='btn btn-primary' 
                        onClick={() => {
                            setCart([...cart, product]);
                            toast.success("تمت الاضافة للعربة بنجاح");
                            localStorage.setItem("cart", JSON.stringify([...cart, product]));
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className='row'>
                <h2 className='text-start mt-4'>منتجات مشابهة</h2>
                <div className='product-container'>
                    {relatedProducts.length > 0 ? relatedProducts.map(product => (
                        <div key={product._id} className='product-card'>
                            <img 
                                style={{ objectFit: "cover" }} 
                                src={getProductPhotoUrl(product._id)} 
                                alt={product.name} 
                                className='product-image' 
                            />
                            <div className='product-info'>
                                <h3 className='product-name'>{product.name}</h3>
                                <p className='product-description'>{product.description.substring(0, 40)}</p>
                                <p className='product-price'><b>جنية</b>{product.price}</p>
                            </div>
                            <div className='product-buttons'>
                                <button 
                                    className='btn btn-primary' 
                                    onClick={() => {
                                        setCart([...cart, product]);
                                        toast.success("تمت الاضافة للعربة بنجاح");
                                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    className='btn btn-secondary' 
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    )) : <h5>لا توجد منتجات مشابهة</h5>}
                </div>
            </div>
        </Mylayout>
    );
};

export default ProductDetails;
