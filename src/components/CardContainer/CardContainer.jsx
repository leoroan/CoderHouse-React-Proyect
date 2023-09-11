import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import { getMesPorId } from '../mockApi';

export default () => {
  const { cid } = useParams();
  const [mesActual, setMesActual] = useState(null);
  const [valor, setValor] = useState('');
  const [cargando, setCargando] = useState(true);

  const handleChange = (e) => {
    setValor(e.target.value);
  };

  const guardarValor = () => {
    if (mesActual) {
      const nuevoMonto = parseFloat(valor);
      if (!isNaN(nuevoMonto)) {
        mesActual.inversion += nuevoMonto;
        const nuevoRetorno = mesActual.inversion * mesActual.factorRetorno;
        mesActual.retorno = parseFloat(nuevoRetorno.toFixed(2));
        setMesActual({ ...mesActual });
        setValor('');
      } else {
        alert('Por favor, ingresa un número válido.');
      }
    }
  };

  useEffect(() => {
    getMesPorId(cid)
      .then((mesEncontrado) => {
        if (mesEncontrado) {
          setMesActual(mesEncontrado);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el mes:', error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [cid]);

  return (
    <div>
      <h1> Mis Meses </h1>
      {cargando ? ( // Verificamos si estamos cargando
        <p>Cargando datos...</p>
      ) : (
        mesActual && (
          <div>
            <h2>{mesActual.nombre + ' ' + mesActual.anio}</h2>
            <h6>Inversion actual: ${mesActual.inversion}</h6>
            <h6>Retorno actual: ${mesActual.retorno}</h6>

            {mesActual.inversion > 0 ? (
              <p>Querés invertir más este mes?</p>
            ) : (
              <p>Querés empezar a invertir este mes??</p>
            )}

            <input
              className='form-control-card col-2 mx-auto'
              id='montoInput'
              type='number'
              value={valor}
              onChange={handleChange}
              placeholder='Ingresa un monto a invertir'
            />
          </div>
        )
      )}
      <button
        className='btn btn-outline-light btn-sm'
        onClick={guardarValor}
      >
        Invertir
      </button>
      <Link to='/'>
        <button className='btn btn-outline-dark btn-sm'>Volver</button>
      </Link>
    </div>
  );
};