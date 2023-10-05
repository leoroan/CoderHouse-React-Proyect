import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
  const [miProp, setMiProp] = useState(props.mes);
  const inversiones = props.mes.inversiones;
  const tiposUnicos = new Set(inversiones.map(inversion => inversion.tipo));

  useEffect(() => {
    setMiProp(props.mes);
  }, [props.mes]);

  return (
    <>
      <div className="col-md-auto col-xl-4 animate__animated animate__bounce">
        <div className="card border-light bg-transparent">
          <div className="card-body">
            <h4 className="card-title"> {miProp.nombre} </h4>
            <h3 className="card-subtitle"> {miProp.mes + " " + miProp.anio} </h3>
            <p> 💵 Invertido este mes: ${miProp.inversionTotal.toFixed(2)}</p>
            <p> 💵 Retorno de inversion esperado, a fin de mes: ${miProp.retorno.toFixed(2)}</p>
          </div>


          {miProp.inversionTotal > 0 ? (
            <div>
              <ul>
                <p>🛒? Invertiste este mes en:</p>
                {Array.from(tiposUnicos).map((tipo, index) => (
                  <span className="badge rounded-pill text-bg-info m-1" key={index}>{tipo}</span>
                ))}
              </ul>
            </div>
          ) : (
            <p>Aún no invertiste nada este mes</p>
          )}

          <div className="card-footer border-light bg-transparent">
            <Link to={`./Card/${miProp.id}`}>
              <button className='btn btn-outline-dark btn-sm'>ver más</button>
            </Link>
          </div>  
        </div>
      </div>
    </>
  )
}