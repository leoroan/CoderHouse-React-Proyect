import React from 'react'
import CartWidget from './CartWidget/CartWidget'

const Navbar = () => {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h1"> 💵 Mis Cuentas </span>
          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#">News</a>
            </li>
            <li className="nav-item">
              <a className="nav-link ">Contact</a>
            </li>
          </ul>
          <CartWidget cartIcon="bi bi-cart"/>
        </nav >
      </div>
    </>
  )
}

export default Navbar