import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import img from "../img/r6.jpg"
import { Footer, Navbar } from "../components";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const redirectToCheckout = () => {
    navigate('/Checkout');
  };
  const redirectToInsurance = () => {
    navigate('/insurance');
  };
  const handleadd =()=>{
    addProduct(product);
    redirectToCheckout();
  };
  const handleins =()=>{
    addProduct(product);
    redirectToInsurance();
  };


  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
 

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);


      const response = await fetch(`http://localhost:7000/product/search/${id}`);
      const data = await response.json();
      console.log("data", data);
      setProduct(data);
      setLoading(false);
        localStorage.setItem('product_id',id);


     
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
  };

  
  
    let imgSrc;

    try {
      imgSrc = 
      product.imgID;
    } catch (error) {
      imgSrc = img;
      console.log("error occured while fetching image ",error) 
    }



  const ShowProduct = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 col-sm-12 py-3">
          
              <div className="img-fluid" style={{ width: '400px', height: '400px', backgroundColor: '#ccc' }}>

              <img src={product.imgID} id="productImage"  style={{ width: '400px', height: '400px' }} />

              </div>
            </div>
            <div className="col-md-6 col-md-6 py-5">
              <h4 className="text-uppercase text-muted">{product.category}</h4>
              <h1 className="display-5">{product.name}</h1>
              <p className="lead">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="display-6  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <div>
              <button
                className="btn btn-outline-dark"
                onClick={handleadd}
                style={{ display: 'inline-block', marginRight: '10px' }}
              >
                buy Without Insurance
              </button>

              <button
                className="btn btn-outline-dark"
                onClick={handleins}
                style={{ display: 'inline-block' }}
              >
                Buy With Insurance
              </button>
            </div>
            </div>
          </div>
        </div>
      </>
    );
  };


  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-10 py-10">
          
          <div className="d-none d-md-block">
         
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >

           
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
  