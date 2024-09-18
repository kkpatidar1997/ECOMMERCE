
// import React, { useEffect, useState } from 'react';
// import Layout from '../components/Layout/Layout';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const ProductDetails = () => {
//     const params = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({});
//   const [relatedProducts, setRelatedProducts] = useState([]);


//   useEffect(() => {
//     if (params?.slug) getProduct();
//   }, [params?.slug]);
//   //getProduct
//   const getProduct = async () => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/get-product/${params.slug}`
//       );
//       setProduct(data?.product);
//       getSimilarProduct(data?.product._id, data?.product.category._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get similar product
//   const getSimilarProduct = async (pid, cid) => {
//     try {
//       const { data } = await axios.get(
//         `/api/v1/product/related-product/${pid}/${cid}`
//       );
//       setRelatedProducts(data?.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
    
//     <Layout>
//         <h1>product details</h1>
        
//         {/* {JSON.stringify(product,null,4)} */}
//         <div className="row container mt-2 " >
//           <div className="col-md-6">
//                { product?.map((p)=>(
               
//            <div className="card m-2" style={{width: '18rem'}} >
//   <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id }`} className="card-img-top" alt={p.name} />
//   <div className="card-body">
//     <h5 className="card-title">{p.name}</h5>
//     <p className="card-text">{p.description}</p>
//      <p className="card-text"> ${p.price}</p>
//     {/* <button  className="btn btn-primary ms-1 "  onClick={() => navigate(`/product/${p.slug}`)}>More Detail</button> */}
//      <button  className="btn btn-secondary ms-1">Add to cart</button>
//   </div>
// </div>

//           ))}
//           </div>
//           <div className="col-md-6 ">
//              <h1 className='text-center'>Product Details</h1>
//                 { product?.map((p)=>(
               
//            <div className="card m-2" style={{width: '18rem'}} >
//   {/* <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id }`} className="card-img-top" alt={p.name} /> */}
//   <div className="card-body">
//     <h6 className="card-title"> Name : {p.name}</h6>
//     <h6 className="card-text">Description: {p.description}</h6>
//      <h6 className="card-text"> Price: ${p.price}</h6>
//     <h6 className="card-text"> Category ${ p.category.name}</h6>
    
    
//   </div>
// </div>

//           ))}


//           </div>
//         </div>
//         <div className="row">
//           <h1>Similar product</h1>

//           { relatedProducts?.map((p)=>(
               
//            <div className="card m-2" style={{width: '18rem'}} >
//   <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id }`} className="card-img-top" alt={p.name} />
//   <div className="card-body">
//     <h5 className="card-title">{p.name}</h5>
//     <p className="card-text">{p.description}</p>
//      <p className="card-text"> ${p.price}</p>
//     {/* <button  className="btn btn-primary ms-1 "  onClick={() => navigate(`/product/${p.slug}`)}>More Detail</button> */}
//      <button  className="btn btn-secondary ms-1">Add to cart</button>
//   </div>
// </div>

//           ))}
//           </div>
      
//     </Layout>
//   );
// }

// export default ProductDetails;
import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Initial product details
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      console.log("Fetched product data:", data);
      console.log(data.product[0])
      if (data?.product) {
        setProduct(data.product[0]);
        // console.log("Product ID:", data.product._id);
        getSimilarProduct(data.product[0]._id, data.product[0].category._id);
      } else {
        console.error("Product data is undefined or null");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      console.log(data);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          {product._id ? (
            <img
              src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height="300"
              width={"350px"}
            />
          ) : (
            <p>Loading product image...</p>
          )}
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name || "N/A"}</h6>
          <h6>Description: {product.description || "N/A"}</h6>
          <h6>Price: {product.price ? `$${product.price}` : "N/A"}</h6>
          <h6>Category: {product?.category?.name || "N/A"}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text">$ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button className="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
