import Cards from '../Cards/Cards';
import Header from '../Header/Header';
import React, { useState, useEffect } from 'react'

export default (props) => {
  const { misMeses } = props;
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [filtrando, setFiltrando] = useState(false);
  const [mesesFiltrados, setMesesFiltrados] = useState([]);
  const [tiposUnicos, setTiposUnicos] = useState([]);

  const toggleFiltrando = () => {
    setFiltrando(!filtrando);
  };
  const resetearMisMeses = () => {
    window.location.reload();
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

          {/* <!-- Modal --> */}
          <div className="modal fade" id="modal_ayuda_main" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal_ayuda_main" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content card bg-info-subtle">
                <div className="modal-header bg-info-subtle">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Leé con atención!</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <ul className='list-group'>
                    <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                      <p>En esta página principal vas a poder visualizar, en los meses provistos, la información de cada uno. 👀🗓️</p>
                    </li>
                    <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                      <p>Haciendo "click" en "VER MÁS", vas a ingresar a ese mes seleccionado. 🔍📅</p>
                    </li>
                    <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                      <p>Una vez que realizaste una inversión, la misma va a ser marcada desde esta vista para que la puedas identificar. 💼👁️</p>
                    </li>
                    <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                      <p>Tenes un filtro a disposición para que puedas buscar por tipo de inversión realizada entre los meses en los cuales invertiste! 🧐🔍💰</p>
                    </li>
                    <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                      <p>No olvides presionar en el carrito "🛒" para poder ir a ver el resumen de tus inversiones! 😉</p>
                      <p>TIP! aparece cuando invertis almenos una vez 😮😋  </p>
                    </li>
                  </ul>
                </div>
                <div className="modal-footer">
                  <ul><li className='fs-6'>Future update: generacion dinámica de nuevos meses...</li></ul>
                  <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Dale!👌</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Button trigger modal --> */}
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_ayuda_main">
            Ayuda!🏳
          </button>

          <Header />
          <div className="text-center" id="mainBox">
            <div className="modal fade" id="mesModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div id="modalSpace" className="modal-dialog modal-dialog-centered modal-dialog-scrollable"></div>
            </div>
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
                <button className='btn btn-danger btn-sm m-2 ' onClick={resetearMisMeses}>
                  Restablecer "misMeses"
                </button>
              </div>
            )}
            <div className="row row-cols-1  justify-content-md-center" id="cardInicial">
              <div className="col-md-auto animate__animated animate__bounce tarjetaPrincipal">
                <div className="card border-light bg-transparent ">
                  <div className="card-body">
                    <h2 className="card-title"> 💸 </h2>
                    <div id="cardMes" className="row justify-content-md-center">
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
          </div>
        </div >
      </div >
    </div >
  )
}