import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const { isLoggedIn, onClick} = props;
  return(
    <nav>
      <button onClick={onClick} className="login">{isLoggedIn ? 'Log Out' : 'Log In'}</button>
      <Link className="" to="/">Home</Link>
    </nav>
  );
}

export default Nav;
