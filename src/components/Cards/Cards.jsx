import React from 'react'

const Cards = props => {
  return (
    <>
      <div key={props.mes.id} class="col-md-auto col-xl-4 animate__animated animate__bounce">
        <div class="card border-light bg-transparent">
          <div class="card-body">
            <h4 class="card-title"> {props.mes.nombre} </h4>
            <p> Inversion este mes:  {props.mes.inversion} 💵</p>
            {/* <button id="${id}" type="button" class="btn btn-outline-success btn-sm fs-5" data-bs-toggle="modal" data-bs-target="#${id}"> saber + </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

Cards.propTypes = {}

export default Cards