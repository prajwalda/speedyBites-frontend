import React from "react";
import { useCart, useDispacthCart } from "../components/ContextReducer";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispacthCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }

  const HandleCheckout =async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("https://speedybites-backend.onrender.com/api/orderData",{
      method:"POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date: new Date().toDateString(),

      })
    })
    console.log("orderr response ", response)
    if(response.status === 200){
        dispatch({type:"DROP"}) 
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Options</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((food,idx)=>(
                    <tr>
                        <th scope="row">{idx+1}</th>
                        <td>{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td>
                        <td><button type="button" className="btn p-0"><div onClick={()=> {dispatch({type: "REMOVE",index:idx})}}><FaTrashAlt/></div></button></td>

                    </tr>
                ))
            }
          </tbody>
        </table>
            <div className="fs-2">Total Price: {totalPrice}/-</div>
        <div>
          <button className="btn bg-success mt-5" onClick={HandleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
