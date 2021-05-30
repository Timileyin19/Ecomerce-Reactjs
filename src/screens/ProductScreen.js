import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { addToCart } from '../actions/cartActions';
// import Rating from '../components/Rating';
// import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    // productDetails1 = detailsProduct(productId);
    dispatch(detailsProduct(productId)); 
  }, [dispatch, productId])

//   const productReviewCreate = useSelector((state) => state.productReviewCreate);
//   const {
//     loading: loadingReviewCreate,
//     error: errorReviewCreate,
//     success: successReviewCreate,
//   } = productReviewCreate;

//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   useEffect(() => {
//     if (successReviewCreate) {
//       window.alert('Review Submitted Successfully');
//       setRating('');
//       setComment('');
//       dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
//     }
//     dispatch(detailsProduct(productId));
//   }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = (id, qty) => {
  if (userInfo) {
    let request_body = {};
    request_body.action = "save_to_cart";
    request_body.user_id = Number(userInfo.id);
    request_body.products = id;
    request_body.quantities = qty;
    request_body.sku_index = 0; 
    request_body.issubmit = 1;

    // console.log(request_body);
    dispatch(addToCart(request_body));

    // const { data } = Axios.post(`https://v2.foodlocker.com.ng/apiv1`, request_body);
    // console.log(data);
  } else {
    document.location.href = '/signin';
  }

      // addToCart(id, Number(qty));
    // props.history.push(`/cart/${productId}?qty=${qty}`);
  };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (comment && rating) {
//       dispatch(
//         createReview(productId, { rating, comment, name: userInfo.name })
//       );
//     } else {
//       alert('Please enter comment and rating');
//     }
//   };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to All Products</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.social_meta_data.image}
                alt={product.social_meta_data.tag}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.social_meta_data.tag}</h1>
                </li>
                {/* <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li> */}
                <li>Pirce : ₦{product.data.quantities[0].price}</li>
                <li>
                  Description:
                  <p>{product.social_meta_data.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  {/* <li>
                    Seller{' '}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.seller.name}
                      </Link>
                    </h2>
                    <Rating
                      rating={product.seller.seller.rating}
                      numReviews={product.seller.seller.numReviews}
                    ></Rating>
                  </li> */}
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">₦{product.data.quantities[0].price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.data.quantities?.length > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.data.quantities?.length > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.data.quantities?.length).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button onClick={() => addToCartHandler(product.data.id, qty)} className="primary block"> Add to Cart </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
         <div>
            {/* <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )} */}
           
          </div>
        </div> 
      )}
    </div>
  );
}
