import React from 'react'
import { useParams } from 'react-router-dom'

export default ( {misMeses} = props) => {

  const {cid} = useParams();
  const mesActual = misMeses[cid];

  return (
    <div>
      <h1> Cards </h1>
      <h2> {mesActual.nombre + " " + mesActual.anio} </h2>
      <h6> Inversion actual: {mesActual.inversion}</h6>
      <h6> Retorno actual: {mesActual.retorno}</h6>
    </div>
  )
}
