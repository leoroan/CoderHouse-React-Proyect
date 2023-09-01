import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import useMisMeses from '../Hooks/useMisMeses';


const MainBox = props => {
  const { misMeses } = props;

  

  return (
    /* <!-- MAIN BOX START --> */
    <div className="container text-center" id="mainBox">

      {/* / MODAL START */}
      <div className="modal fade" id="mesModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div id="modalSpace" className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
      </div>
      {/* / MODAL END */}

      {/* /*  A CARD START */}
      <div className="row row-cols-1  justify-content-md-center" id="cardInicial">
        <div className="col-md-auto animate__animated animate__bounce">
          <div className="card border-light bg-transparent tarjetaPrincipal">
            <div className="card-body">
              <h2 className="card-title"> 💸 </h2>
              <div id="cardMes" className="row justify-content-md-center">

                {/* <!-- AQUI SE GENERAN LAS CARDS --> */}
                {/* {meses.map((mes, id,) => (
                  <Cards key={id} mes={mes}/>
                ))} */}
                {/* {meses.map((mes, id,) => (
                  <Cards key={id} mes={mes}/>
                ))} */}
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
    /* <!-- MAIN BOX END --> */
  )
}


export default MainBox