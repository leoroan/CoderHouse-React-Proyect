import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <div className="container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h1"> <Link to={"/"}>💵 Mis Cuentas</Link> </span>

          <ul className="nav nav-pills nav-fill">
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={'/'}> Home </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="/About">About</a> */}
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={'/About'}> About </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link disabled" href="#">News</a> */}
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={'/News'}> News </NavLink>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link ">Contact</a> */}
              <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={'/Contact'}> Contact </NavLink>
            </li>
          </ul>
        </nav >
      </div>
    </>
  )
}

export default Navbar