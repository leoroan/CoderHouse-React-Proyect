import { useState } from 'react';

export default function useMisMeses(initialValue) {
  const [misMeses, setMisMeses] = useState(initialValue);

  // +
  const agregarMes = (nuevoMes) => {
    // setMisMeses([...misMeses, nuevoMes]);
    setMisMeses((prevMeses) => [...prevMeses, nuevoMes]);
  };

  // -
  const eliminarMes = (mesAEliminar) => {
    setMisMeses((prevMeses) => prevMeses.filter((mes) => mes !== mesAEliminar));
  };

  return {
    misMeses,
    agregarMes,
    eliminarMes,
  };
}
