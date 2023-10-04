import Cards from '../Cards/Cards';
import Header from '../Header/Header';

export default (props) => {
  const { misMeses } = props;

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
              <div className="col-md-auto animate__animated animate__bounce tarjetaPrincipal">
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