import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartView,setCartView] = useState(false);

  useEffect(() => {
    const authtoken = localStorage.getItem("authToken");
    if (authtoken) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);
  const loadCart = () => {
    setCartView(true)
}
  const signoutHandler = () => {
    setLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  const items = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to={"/"}>
            <img src={require('../../src/logo.png')} alt="logo" width={80}/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {
                loggedIn ? (<li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorders">
                  My Orders
                </Link>
              </li>) :(null)
              }
            </ul>
          </div>
          {!loggedIn ? (
            <div className="d-flex">
              <Link
                className="btn bg-white text-success mx-1 fw-bold"
                aria-current="page"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="btn bg-white text-success mx-1 fw-bold"
                aria-current="page"
                to="/signup"
              >
                Sign up
              </Link>
            </div>
          ) : 
            (
              <div>
                 <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length} >
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

                <div className="btn bg-white text-danger mx-1 fw-bold" onClick={signoutHandler}>Logout</div>
              </div>
            )
          }
        </div>
        
      </nav>
    </div>
  );
};

export default Navbar;
