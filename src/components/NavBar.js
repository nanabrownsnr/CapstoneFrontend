import React from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../reduxslice/userslice";
import { cartitems } from "../reduxslice/cartslice";



export default function NavBar() {


    // const username = useSelector((state)=> state.userreducer.username);
    const isUserLoggedIn = useSelector((state)=> state.userreducer.isUserLoggedIn);
    const isAdminLoggedIn = useSelector((state)=> state.adminreducer.isAdminLoggedIn);
    const cart = useSelector(cartitems);
    
    const dispatch = useDispatch();

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand">
              MyMoviePlan
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {          !isAdminLoggedIn
                    &&
                    
                    <li className="nav-item">
                      <Link className="nav-link" aria-current="page" to="">
                        Now Showing
                      </Link>
                    </li>}
                  {/* {
                  isUserLoggedIn && 
                  <li className="nav-item">
                    <Link className="nav-link" to="/myevents">
                      Buy Tickets 
                    </Link>
                  </li>
                  } */}
                  {
                  isAdminLoggedIn && 
                  <li className="nav-item">
                    <Link className="nav-link" to="/updatemovie">
                      Update Movie list 
                    </Link>
                  </li>
                  }

                  {
                    (!isUserLoggedIn && !isAdminLoggedIn) && 
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login 
                    </Link>
                  </li>
                  }

                  {
                    (isUserLoggedIn || isAdminLoggedIn) && 
                  <li className="nav-item">
                    <a className="nav-link" href="/" onClick={()=>dispatch(logoutUser())}>
                      Logout 
                    </a>
                  </li>
              }
                  {
                    (!isUserLoggedIn && !isAdminLoggedIn)  && 
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up 
                    </Link>
                  </li>
              }
                </ul>
              </div>
              {
                isUserLoggedIn &&
                <Link className="nav-link" to="/cart">
                            <i className="fa badge fa-lg" style={{color:'black'}} 
                            value={cart.length}>&#xf290;</i>
                </Link>}
            
            
            </div>
          </nav>
        </div>
      );
}
