import React from 'react'

export default (props) => {
  return (
    <>
      <div className="col-md-auto col-xl-4 animate__animated animate__bounce">
        <div className="card border-light bg-transparent">
          <div className="card-body">
            <h4 className="card-title"> {props.mes.nombre + " " + props.mes.mes} </h4>
            {/* <p> Inversion este mes:  {props.mes.inversion} 💵</p> */}
            <p> Inversion este mes:  some things 💵</p>
            {/* <button id="${id}" type="button" class="btn btn-outline-success btn-sm fs-5" data-bs-toggle="modal" data-bs-target="#${id}"> saber + </button> */}
          </div>
        </div>
      </div>
    </>
  )
}