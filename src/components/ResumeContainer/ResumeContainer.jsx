import React, { useEffect, useState } from 'react';
import useMisMeses from '../Hooks/useMisMeses';

export default (props) => {
  const { misMeses } = props;
  const { limpiarMeses, borrarInversionPorId } = useMisMeses([]);
  const [mesesConInversiones, setMesesConInversiones] = useState([]);

  const handleErase = (id) => {
    borrarInversionPorId(id);
    const mesesConInversiones = misMeses.filter((mes) => mes.inversiones && mes.inversiones.length > 0);
    setMesesConInversiones(mesesConInversiones);
  };

  const borrarTodasLasInversiones = () => {
    limpiarMeses();
    setMesesConInversiones([]);
    alert("todo borrado");
  };

  useEffect(() => {
    const mesesConInversiones = misMeses && misMeses.filter((mes) => mes.inversiones && mes.inversiones.length > 0);
    setMesesConInversiones(mesesConInversiones);
  }, [misMeses]);

  return (
    <div>
      <h1>Meses con inversiones:</h1>
      {mesesConInversiones.length > 0 ? (
        <div>
          <button className='btn btn-outline-danger btn-sm m-2' onClick={borrarTodasLasInversiones}>Borrar todas las inversiones</button>
          <ul>
            {mesesConInversiones.map((mes, index) => (
              <li key={index}>
                <p>Mes: {mes.nombre} AÑO: {mes.anio}</p>
                <ul>
                  {mes.inversiones.map((inversion, inversionIndex) => (
                    <li key={inversion.id}>{inversion.nombre}, INVERTIDO: ${inversion.montoInversion}
                      <button
                        type='button'
                        className="btn" data-bs-toggle="button"
                        onClick={() => handleErase(inversion.id)}
                      >❌</button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay meses con inversiones disponibles.</p>
      )}
    </div>
  );
};
