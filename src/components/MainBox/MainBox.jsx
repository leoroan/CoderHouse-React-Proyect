import React, { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';

const MainBox = props => {
  const [meses, setMeses] = useState([]);

  // Primer useEffect: Carga inicial de datos
  useEffect(() => {
    fetch('https://64e7a73ab0fd9648b79039ff.mockapi.io/cuentas/mes')
      .then(response => response.json())
      .then(data => {
        setMeses(data);
      })
      .catch(error => {
        console.error('Error fetching investment data:', error);
      });
  }, []);

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
                {meses.map(mes => (
                  <Cards mes={mes}/>
                ))}

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