import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import { useEffect } from 'react';

export default (props) => {
  const { misMeses } = props;

  function distribuirInversiones(misMeses) {
    const nuevosMeses = [];

    for (let i = 0; i < misMeses.length; i++) {
      const mesActual = misMeses[i];
      const inversionesMesActual = mesActual.inversiones;

      // Verificar si el mes actual tiene inversiones
      if (inversionesMesActual.length > 0) {
        // Itera a través de las inversiones en el mes actual
        for (let j = 0; j < inversionesMesActual.length; j++) {
          const inversionActual = inversionesMesActual[j];
          const plazoInversion = inversionActual.plazo;

          //   // Distribuir la inversión solo si el plazo es mayor a 0
          for (let k = 1; k <= plazoInversion; k++) {

            // Verificar si hay meses siguientes disponibles
            if (i + k < misMeses.length) {
              const mesSiguiente = misMeses[i + k];

              // Verificar si ya existe una inversión con el mismo ID en el mes siguiente
              const existeInversion = mesSiguiente.inversiones.some(inv => inv.id === inversionActual.id);

              if (!existeInversion) {
                mesSiguiente.inversionTotal = Number(mesSiguiente.inversionTotal + inversionActual.montoInversion);
                mesSiguiente.retorno += (inversionActual.montoInversion * inversionActual.retornoMensual) / 100;
                inversionActual.plazo--;
                mesSiguiente.inversiones.push(inversionActual);
              }
            }
          }
        }
      }
    }

    // Después de terminar de procesar todos los meses, agrega los nuevos meses a misMeses
    // misMeses.push(...nuevosMeses);
  }

  useEffect(() => {
  }, [distribuirInversiones(misMeses)]);

  return (
    <div className="d-flex flex-column justify-content-center vh-100">
      <div className="d-flex flex-column  w-100 h-100">
        <div className="cuerpoPpal w-100 h-100">
          <Header />

          <div className="text-center" id="mainBox">

            {/* / MODAL START */}
            <div className="modal fade" id="mesModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div id="modalSpace" className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
            </div>
            {/* / MODAL END */}

            {/* /*  A CARD START */}
            <div className="row row-cols-1  justify-content-md-center" id="cardInicial">
              <div className="col-md-auto animate__animated animate__bounce">
                <div className="card border-light bg-transparent ">
                  <div className="card-body">
                    <h2 className="card-title"> 💸 </h2>
                    <div id="cardMes" className="row justify-content-md-center">

                      {/* <!-- AQUI SE GENERAN LAS CARDS --> */}
                      {misMeses && misMeses.length > 0 ? (
                        // Verifica si misMeses existe y no está vacío antes de mapearlo
                        misMeses.map((mes, id) => (
                          <Cards key={id} mes={mes} />
                        ))
                      ) : (
                        // Muestra un mensaje o componente de carga mientras se obtienen los datos
                        <p>Cargando meses...</p>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /* A CARD END */}
          </div>
        </div>
      </div>

    </div>
  )
}