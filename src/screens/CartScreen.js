import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeItemFromCart, getUserCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';


export default function CartScreen(props) {
  const userId = props.match.params.id;
  let cartItems = JSON.parse(localStorage.getItem('cartItems'));

  const getTotalAmount = () => {
    let total_price = 0;
    if (cartItems) {
      cartItems.forEach(cart => {
        total_price += cart.gross_amount
      });
    }
    return total_price;
  }
  // const qty = props.location.search
  //   ? Number(props.location.search.split('=')[1])
  //   : 1;
  const cart = useSelector((state) => state.cart);
  // const { cartItems, error } = cart;
  const dispatch = useDispatch();


  const getUserCartItems = () => {
    if (userId) {
      dispatch(getUserCart(userId));
    }
  }
  useEffect(() => {
    getUserCartItems();
    cartItems = JSON.parse(localStorage.getItem('cartItems'));
    // console.log(cartItems);
  }, []);

  const removeFromCartHandler = (id) => {
    console.log(Number(id), userId);
    // delete action
    dispatch(removeItemFromCart(Number(id), userId));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
        {cartItems?.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems?.map((item) => (
              <li key={item.id}>
                <div className="row">
                  <div>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product.id}`}>{item.product.name} x {item.quantity} Pieces</Link>
                  </div>
                  <div>
                    {/* <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <div>₦{item.gross_amount}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ₦ {getTotalAmount()}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems?.length === 0 && cartItems?.length !== 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
