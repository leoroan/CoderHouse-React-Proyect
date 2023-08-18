import React from 'react'
import PropTypes from 'prop-types'

const MainBox = props => {
  return (
    /* <!-- MAIN BOX START --> */
    <div className="container text-center" id="mainBox">

      {/* / MODAL START */}
      <div className="modal fade" id="mesModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div id="modalSpace" className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
      </div>
      {/* / MODAL END */}

    {/* /*  A CARD START */}
        <div className="row row-cols-1  justify-content-md-center" id="cardInicial">
        <div className="col-md-auto animate__animated animate__bounce">
          <div className="card border-light bg-transparent tarjetaPrincipal">
            <div className="card-body">
              <h2 className="card-title" id="toppp"> 💸</h2>
              <div id="cardMes" className="row justify-content-md-center">
                {/* <!-- AQUI SE GENERAN LAS CARDS --> */}
                {props.card}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* /* A CARD END */}
    </div>
    /* <!-- MAIN BOX END --> */
  )
}


export default MainBox