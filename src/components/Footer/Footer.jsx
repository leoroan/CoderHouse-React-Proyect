import React from 'react'
import './Footer.css'

const Footer = (props) => {
  return (
    /* <!-- FOOTER START --> */
    <footer className="fixed-bottom">
      <div className="container-fluid text-center w-100">
        <a href="https://github.com/leoroan" className="text-decoration-none">
          <h5 className="fw-light text-black m-0">— By Lean # 2023 {props.copy}—</h5>
        </a>
      </div>
    </footer>
    /* <!-- FOOTER END --> */
  )
}

export default Footer