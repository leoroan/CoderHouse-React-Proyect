import React from 'react'

const CartWidget = props => {
  return (
    <div className="col-1 ">
      <a className="navbar-brand input-group flex-nowrap" href="#">
        <span className="input-group-text bg-transparent" id="basic-addon1"><i className={props.cartIcon}></i></span>
        <input type="text" className="form-control bg-transparent text-center" placeholder='0' aria-label="cartQty" aria-describedby="basic-addon1" disabled />
      </a>
    </div>
  )
}

export default CartWidget