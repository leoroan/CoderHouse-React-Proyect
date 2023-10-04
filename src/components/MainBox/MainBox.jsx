import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import React, { useState, useEffect } from 'react'

export default (props) => {
  const { misMeses } = props;
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [filtrando, setFiltrando] = useState(false);
  const [mesesFiltrados, setMesesFiltrados] = useState([]);
  const [tiposUnicos, setTiposUnicos] = useState([]);

  const hayInversiones = misMeses ? misMeses.some(mes => mes.inversiones.length > 0) : false;

  const toggleFiltrando = () => {
    setFiltrando(!filtrando);
  };

  useEffect(() => {
    const tipos = misMeses && misMeses.reduce((tiposUnicos, mes) => {
      mes.inversiones.forEach(inversion => {
        if (!tiposUnicos.includes(inversion.tipo)) {
          tiposUnicos.push(inversion.tipo);
        }
      });
      return tiposUnicos;
    }, []);

    // Almacenar los tipos únicos en el estado
    setTiposUnicos(tipos);
  }, [misMeses]);

  useEffect(() => {
    if (filtrando && tipoSeleccionado) {
      const mesesFiltrados = misMeses.filter(mes => {
        return mes.inversiones.some(inversion => inversion.tipo === tipoSeleccionado);
      });
      setMesesFiltrados(mesesFiltrados);
    } else {
      setMesesFiltrados(misMeses);
    }
  }, [tipoSeleccionado, misMeses, filtrando]);

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

            {/* Mostrar el div solo si hay inversiones en al menos un mes */}
            {tiposUnicos && tiposUnicos.length > 0 && (
              <div>
                <button className='btn btn-outline-dark btn-sm m-2 ' onClick={toggleFiltrando}>
                  {filtrando ? 'Mostrar Todos' : 'Filtrar por '}
                </button>

                <select id='select' className='form form-select-sm border-light bg-transparent' onChange={(e) => setTipoSeleccionado(e.target.value)}>
                  <option value="">Todos los tipos</option>
                  {tiposUnicos.map((tipo, index) => (
                    <option key={index} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* /*  A CARD START */}
            <div className="row row-cols-1  justify-content-md-center" id="cardInicial">
              <div className="col-md-auto animate__animated animate__bounce tarjetaPrincipal">
                <div className="card border-light bg-transparent ">
                  <div className="card-body">
                    <h2 className="card-title"> 💸 </h2>
                    <div id="cardMes" className="row justify-content-md-center">

                      {/* Mostrar los elementos (filtrados o todos) */}
                      {filtrando && tipoSeleccionado !== '' ? (
                        mesesFiltrados.length > 0 ? (
                          mesesFiltrados.map((mes, id) => (
                            <Cards key={id} mes={mes} />
                          ))
                        ) : (
                          <p>No hay meses disponibles para el tipo seleccionado.</p>
                        )
                      ) : (
                        misMeses && misMeses.map((mes, id) => (
                          <Cards key={id} mes={mes} />
                        ))
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