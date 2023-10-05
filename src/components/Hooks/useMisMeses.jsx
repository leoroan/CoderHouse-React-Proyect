import { useState, useEffect } from 'react';
import { getMeses } from '../mockApi';

export default function useMisMeses() {
  const [misMeses, setMisMeses] = useState();

  useEffect(() => {
    getMeses().then((data) => {
      setMisMeses(data);
    });
  }, []);

  const limpiarMeses = () => {
    misMeses.forEach((mes, index) => {
      misMeses[index].inversionTotal = 0;
      misMeses[index].retorno = 0;
      misMeses[index].inversiones = [];
    });
  }

  // +
  const agregarMes = (nuevoMes) => {
    setMisMeses((prevMeses) => [...prevMeses, nuevoMes]);
  };

  // -
  const eliminarMes = (mesAEliminar) => {
    setMisMeses((prevMeses) => prevMeses.filter((mes) => mes !== mesAEliminar));
  };

  const agregarInversion = (mesIndex, nuevaInversion) => {
    let indice = Number(mesIndex);
    if (indice >= 0 && indice < misMeses.length) {
      const mesActual = misMeses[indice]
      mesActual.inversionTotal += nuevaInversion.montoInversion;
      mesActual.retorno += (nuevaInversion.montoInversion * nuevaInversion.retornoMensual) / 100;
      mesActual.inversiones.push({ ...nuevaInversion });

      const plazo = nuevaInversion.plazo;
      for (let i = 1; i < plazo; i++) {
        const siguienteMesIndex = indice + i;

        if (siguienteMesIndex >= 0 && siguienteMesIndex < misMeses.length) {
          const mesSiguiente = misMeses[siguienteMesIndex];
          const mesAnterior = misMeses[siguienteMesIndex - 1];

          mesSiguiente.inversiones.push({ ...nuevaInversion });

          if (nuevaInversion.tipo === "Plazo Fijo Cto") {
            const inversionTotalAnterior = mesAnterior.inversionTotal + mesAnterior.retorno;
            mesSiguiente.inversionTotal = inversionTotalAnterior + nuevaInversion.montoInversion;
            mesSiguiente.retorno += (inversionTotalAnterior * nuevaInversion.retornoMensual) / 100;
          } else {
            mesSiguiente.inversionTotal += nuevaInversion.montoInversion;
            mesSiguiente.retorno += (nuevaInversion.montoInversion * nuevaInversion.retornoMensual) / 100;
          }
        }
      }
    }
  };

  const borrarInversion = (mesIndex, inversion) => {
    const indice = Number(mesIndex);

    if (indice >= 0 && indice < misMeses.length) {
      const mesActual = misMeses[indice];

      if (mesActual && mesActual.inversiones) {
        const index = mesActual.inversiones.indexOf(inversion);
        const invId = inversion.id;

        if (index !== -1) {
          const montoInversion = inversion.montoInversion;
          const retornoMensual = inversion.retornoMensual;

          mesActual.inversionTotal -= montoInversion;
          mesActual.retorno -= (montoInversion * retornoMensual) / 100;
          mesActual.inversiones.splice(index, 1);

          const plazo = inversion.plazo;
          const tipo = inversion.tipo;

          for (let i = 1; i < plazo; i++) {
            const siguienteMesIndex = indice + i;
            if (siguienteMesIndex >= 0 && siguienteMesIndex < misMeses.length) {
              const mesSiguiente = misMeses[siguienteMesIndex];
              const mesAnterior = misMeses[siguienteMesIndex - 1];
              if (mesSiguiente && mesSiguiente.inversiones) {
                let indexSiguiente = -1;
                for (let j = 0; j < mesSiguiente.inversiones.length; j++) {
                  if (mesSiguiente.inversiones[j].id === invId) {
                    indexSiguiente = j;
                  }
                }

                if (indexSiguiente !== -1) {
                  if (tipo === "Plazo Fijo Cto") {
                    mesSiguiente.inversiones.splice(indexSiguiente, 1);
                    mesSiguiente.inversionTotal -= (montoInversion + mesAnterior.inversionTotal + mesAnterior.retorno);
                    mesSiguiente.retorno -= (montoInversion * retornoMensual) / 100;
                  } else {
                    mesSiguiente.inversiones.splice(indexSiguiente, 1);
                    mesSiguiente.inversionTotal -= montoInversion;
                    mesSiguiente.retorno -= (montoInversion * retornoMensual) / 100;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const borrarInversionPorId = (inversionId) => {
    // Recorremos los meses en busca de la inversión por ID
    for (let i = 0; i < misMeses.length; i++) {
      const mesActual = misMeses[i];
      
      if (mesActual && mesActual.inversiones) {
        const index = mesActual.inversiones.findIndex(inversion => inversion.id === inversionId);
        
        if (index !== -1) {
          const inversion = mesActual.inversiones[index];
          const montoInversion = inversion.montoInversion;
          const retornoMensual = inversion.retornoMensual;
  
          mesActual.inversionTotal -= montoInversion;
          mesActual.retorno -= (montoInversion * retornoMensual) / 100;
          mesActual.inversiones.splice(index, 1);
  
          // Actualizamos los meses siguientes si es necesario
          for (let j = i + 1; j < misMeses.length; j++) {
            const mesSiguiente = misMeses[j];
            if (mesSiguiente && mesSiguiente.inversiones) {
              const indexSiguiente = mesSiguiente.inversiones.findIndex(inversion => inversion.id === inversionId);
              if (indexSiguiente !== -1) {
                const tipo = inversion.tipo;
                if (tipo === "Plazo Fijo Cto") {
                  mesSiguiente.inversiones.splice(indexSiguiente, 1);
                  mesSiguiente.inversionTotal -= (montoInversion + mesActual.inversionTotal + mesActual.retorno);
                  mesSiguiente.retorno -= (montoInversion * retornoMensual) / 100;
                } else {
                  mesSiguiente.inversiones.splice(indexSiguiente, 1);
                  mesSiguiente.inversionTotal -= montoInversion;
                  mesSiguiente.retorno -= (montoInversion * retornoMensual) / 100;
                }
              }
            }
          }
          
          // Terminamos el bucle una vez que hemos encontrado y eliminado la inversión
          break;
        }
      }
    }
  };
  




  return {
    misMeses,
    agregarMes,
    eliminarMes,
    agregarInversion,
    borrarInversion,
    borrarInversionPorId,
    limpiarMeses
  };
}
