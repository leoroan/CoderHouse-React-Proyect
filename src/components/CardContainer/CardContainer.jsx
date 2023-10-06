import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { getMesPorId } from '../mockApi';
import useMisMeses from '../Hooks/useMisMeses';

export default function YourComponent() {
  const { cid } = useParams();
  const [mesActual, setMesActual] = useState(null);
  const [valorMontoInput, setValorMontoInput] = useState('');
  const [cargando, setCargando] = useState(true);
  const [valorRetorno, setValorRetorno] = useState('');
  const [valorPlazo, setValorPlazoInput] = useState('');
  const [inversiones, setInversiones] = useState([]);
  const [inversion, setInversion] = useState(null);
  const { agregarInversion, borrarInversion } = useMisMeses([]);

  const handleChange = (e, setterFunction) => {
    setterFunction(e.target.value);
  };

  const handleErase = (inversion) => {
    setInversion(inversion);
    borrarInversion(cid, inversion)
  };

  /**
   * Agrega una inversión si se cumplen ciertos criterios de validación.
   *
   * @param {Object} inversion - la inversión seleccionada.
   */
  function handleButtonInversionesClick(inversion) {
    const existeInversion = mesActual.inversiones.some((item) => item.id === inversion.id);

    if (!existeInversion && !isNaN(parseFloat(valorMontoInput)) && !isNaN(parseFloat(valorRetorno)) && !(inversion.montoMinimo > parseFloat(valorMontoInput))) {
      const nuevaInversion = {
        id: inversion.id + Math.floor(Math.random() * (9999 - 9 + 1)) + 9,
        montoInversion: parseFloat(valorMontoInput),
        nombre: inversion.nombre,
        retornoMensual: Number(valorRetorno),
        tipo: inversion.tipo,
        mes: mesActual.mes,
        anio: mesActual.anio,
        plazo: (valorPlazo === "" || valorMontoInput === 0) ? inversion.plazo : valorPlazo
      };
      // mesActual.inversiones.push(nuevaInversion);
      agregarInversion(cid, nuevaInversion);
      setValorMontoInput('');
      setValorRetorno('');
      setValorPlazoInput('');
    } else {
      alert('Por favor, ingresa un número válido y/o selecciona un tipo de inversión.');
    }
  }

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
  }, [cid, getMesPorId(cid)]);

  const agregarInversiones = (unArray) => {
    for (const key in unArray) {
      if (unArray.hasOwnProperty(key)) {
        setInversiones((prevInversiones) => [...prevInversiones, unArray[key]]);
      }
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const collectionRef = collection(db, 'inversiones');
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const inversionesData = [];
        querySnapshot.forEach((doc) => {
          inversionesData.push({ id: doc.id, ...doc.data() });
        });
        agregarInversiones(inversionesData);
      })
  }, []);

  return (
    <div className="container text-center">
      <h1> Mis Meses </h1>
      {cargando ? (
        <p>Trayendo la información...</p>
      ) : (
        <h2>{mesActual.nombre + ' ' + mesActual.anio}</h2>
      )}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="modal_ayuda_main" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modal_ayuda_main" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content card bg-info-subtle">
            <div className="modal-header bg-info-subtle">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Muy inteligente!💡</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className='list-group'>
                <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                  <p>1️⃣ Tu primer paso sería ingresar un monto a invertir. Ten en cuenta que para los plazos, el mínimo es de $1000 y para FCI $1500.</p>
                </li>
                <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                  <p>2️⃣ Luego, debes ingresar un porcentaje de retorno, que es lo que la entidad te devuelve por estacionar tu dinero en el plazo que establezcas a continuación.</p>
                </li>
                <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                  <p>3️⃣ No olvides poner la cantidad de meses que vas a realizar esta inversión.</p>
                  <p>💡 Tip: Si lo dejas en blanco, cada producto tiene su valor por defecto.</p>
                </li>
                <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                  <p>4️⃣ ¡Listo! Una vez que hayas completado con los datos, solo debes seleccionar un producto de la lista de la derecha.</p>
                </li>
                <li className='fs-6 list-group-item border border-black border-2 rounded m-2'>
                  <p>5️⃣ Debajo podrás ver las inversiones para el mes actual y borrarlas si así lo deseas.</p>
                </li>
              </ul>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">ok!👍</button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_ayuda_main">
        Ayuda!🏳
      </button>

      <div className="row">
        <div className="col-6">
          <div className="card border-light bg-transparent vh-50">
            {cargando ? (
              <p>Cargando datos...</p>
            ) : (
              mesActual && (
                <div>
                  <h6> Suma total de todas las inversiones realizadas este mes: ${mesActual.inversionTotal.toFixed(2)}</h6>
                  <h6>Retorno total (mensual) de todas las inversiones realizadas este mes: ${mesActual.retorno.toFixed(2)}</h6>

                  {mesActual.inversionTotal > 0 ? (
                    <h4> ¿Te gustaría seguir invirtiendo más este mes?</h4>
                  ) : (
                    <h5>¿Quieres empezar a invertir este mes?</h5>
                  )}

                  <div className="d-grid gap-2 mx-auto m-2">
                    <input
                      className='form-control-card form-control-lg col-6 mx-auto m-1'
                      id='montoInput'
                      type='number'
                      value={valorMontoInput}
                      onChange={(e) => handleChange(e, setValorMontoInput)}
                      placeholder='Monto a invertir'
                    />

                    <input
                      className='form-control-card form-control-lg col-6 mx-auto m-1'
                      id='retornoInput'
                      type='number'
                      value={valorRetorno}
                      onChange={(e) => handleChange(e, setValorRetorno)}
                      placeholder='% retorno actual (mes)'
                    />

                    <input
                      className='form-control-card form-control-lg col-6 mx-auto m-1'
                      id='plazoInput'
                      type='number'
                      value={valorPlazo}
                      onChange={(e) => handleChange(e, setValorPlazoInput)}
                      placeholder='Cantidad en meses'
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="col-6 col-ls-12">
          <div className="row card border-light bg-transparent vh-50">
            <h4>Tipos de productos (inversiones) disponibles</h4>
            {inversiones && inversiones.length > 0 ? (
              <div className="d-grid gap-4 col-6 mx-auto m-3">
                {inversiones
                  .filter((inversion) => inversion.estado === true)
                  .map((inversion, id) => (
                    <button
                      className='btn btn-outline-dark'
                      onClick={() => [handleButtonInversionesClick(inversion)]}
                      key={id}
                    >
                      💰{inversion.nombre.toUpperCase() + " - " + inversion.tipo.toUpperCase()}
                    </button>
                  ))}
              </div>
            ) : (
              <p>Trayendo inversiones...</p>
            )}
          </div>
        </div>
      </div>

      <div >
        <Link to='/'>
          <button className='btn btn-danger m-2'>
            Volver a tus meses
          </button>
        </Link>
      </div>

      <div className='d-flex h-100'>
        {mesActual && mesActual.inversiones.length > 0 ? (
          <div className='card border-light bg-transparent'>
            <h3>Inversiones realizadas este mes:</h3>
            <div className="d-flex flex-row justify-content-center h-auto">
              {mesActual.inversiones.map((inversion, id) => {
                if (inversion.mes === mesActual.mes && inversion.anio === mesActual.anio) {
                  return (
                    <p key={id} className='d-flex align-items-start bg-transparent m-2 p-2 border rounded-pill border-2'>
                      {[inversion.nombre.toUpperCase(), " invertido: ", inversion.montoInversion]}
                      <button
                        type='button'
                        className="btn" data-bs-toggle="button"
                        onClick={() => handleErase(inversion)}

                      >❌</button>
                    </p>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className='card border-danger bg-transparent'>
            <p>No has realizado ninguna inversión aún este mes...</p>
          </div>
        )}
      </div>
    </div>
  );
}
