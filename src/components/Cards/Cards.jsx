import React from 'react'
import { Link } from 'react-router-dom'

export default ({ mes } = props) => {
  return (
    <>
      <div className="col-md-auto col-xl-4 animate__animated animate__bounce">
        <div className="card border-light bg-transparent">
          <div className="card-body">
            <h4 className="card-title"> {mes.nombre} </h4>
            <h3 className="card-subtitle"> {mes.mes + " " + mes.anio} </h3>
            <p> Inversion este mes: ${mes.inversionTotal} 💵</p>
            <p> Retorno de inversion esperado, este mes: ${mes.retorno} 💵</p>
          </div>
          <div className="card-footer border-light bg-transparent">
            <Link to={`./Card/${mes.id}`}>
              <button className='btn btn-outline-dark btn-sm'>ver más</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}