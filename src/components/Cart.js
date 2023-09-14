import React, { useEffect } from "react";
import { cartitems, onAdd, onRemove } from "../reduxslice/cartslice";
import { useDispatch, useSelector } from "react-redux";
import './Cart.css'
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let navigate = useNavigate()
  let cart = useSelector(cartitems);
  let dispatch = useDispatch()
  const isUserLoggedIn = useSelector((state)=> state.userreducer.isUserLoggedIn);

  const itemsPrice = cart.reduce((a, c) => a + c.qty * (c.price), 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 200 ? 0 : 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  
  const onRemoveItem = (item) => {dispatch(onRemove (item))};
  const onAddItem = (item) => {dispatch(onAdd(item))};
const Cancel = ()=>
    {
        navigate('/')
    }


  const Checkout = ()=>
    {
        navigate('/checkout')
    }
  useEffect(()=>{
    if(!isUserLoggedIn){
      navigate('/login')
    }
  },[])
  return (
    <aside className="container mt-5">
      <h2 className="text-center">Cart Items</h2>
      <div>
        {cart.length === 0 && <div>Cart is empty</div>}
        {cart.map((movie) => (
          <div key={movie.id} className="row mb-3">
            <div className="col-4">{movie.title}</div>
            <div className="col-2">
              <button onClick={() => onRemoveItem(movie)} className="remove text-center">
                -
              </button>{"     "}
              <button onClick={() => onAddItem(movie)} className="add  text-center">
                +
              </button>
            </div>

            <div className="col-2 text-right">
             {movie.qty} x ${(movie.price)}
            </div>
          </div>
        ))}

        {cart.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
            <div className="col-4"></div>
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
            <div className="col-4"></div>
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ${shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
            <div className="col-4"></div>
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="text-center">
              <button onClick={() => Checkout()} className="btn btn-success">
                Checkout
              </button></div>
              <br/>
              <div className="text-center">
              <button onClick={() => Cancel()} className="btn btn-success">
                Cancel
              </button></div>
          </>
        )}
      </div>
    </aside>
  );
}