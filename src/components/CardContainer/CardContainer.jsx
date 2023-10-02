import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom';
import { getMesPorId } from '../mockApi';

export default function YourComponent() {
  const { cid } = useParams();
  const [mesActual, setMesActual] = useState(null);
  const [valorMontoInput, setValorMontoInput] = useState('');
  const [valorRetorno, setValorRetorno] = useState('');
  const [cargando, setCargando] = useState(true);
  const [inversiones, setInversiones] = useState([]);

  const handleChangeValorMontoInput = (e) => {
    setValorMontoInput(e.target.value);
  };

  const handleChangeValorRetorno = (e) => {
    setValorRetorno(e.target.value);
  };

  function handleButtonInversionesClick(inversion) {
    const existeInversion = mesActual.inversiones.some((item) => item.id === inversion.id);

    if (!existeInversion && !isNaN(parseFloat(valorMontoInput)) && !isNaN(parseFloat(valorRetorno)) && !(inversion.montoMinimo > parseFloat(valorMontoInput))) {
      const nuevaInversion = {
        id: inversion.id + Math.floor(Math.random() * (9999 - 9 + 1)) + 9,
        montoInversion: parseFloat(valorMontoInput),
        nombre: inversion.nombre,
        retornoMensual: valorRetorno,
        tipo: inversion.tipo,
        mes: mesActual.mes,
        anio: mesActual.anio,
        plazo: inversion.plazo
      };
      mesActual.inversiones.push(nuevaInversion);
      console.log('Inversión agregada');
    } else {
      console.log('La inversión ya existe en el arreglo o no ingresó un monto válido o no ingresó % retorno');
    }
  }

  const eraseInv = (inversion) => {
    if (mesActual && mesActual.inversiones) {
      const index = mesActual.inversiones.indexOf(inversion);
      if (index !== -1) {
        mesActual.inversiones.splice(index, 1); // Borra la inversión
        mesActual.inversionTotal -= inversion.montoInversion;
        mesActual.retorno -= (inversion.montoInversion * inversion.retornoMensual) / 100;
        setMesActual({ ...mesActual });
        // Si el arreglo de inversiones está vacío, establece inversionTotal en 0
        // if (mesActual.inversiones.length === 0) {
        //   mesActual.inversionTotal = 0;
        //   mesActual.retorno = 0;
        // }
      }
    }
  };

  const guardarValor = () => {
    if (mesActual) {
      const nuevoMonto = parseFloat(valorMontoInput);
      if (!isNaN(nuevoMonto)) {
        let retornoAcumulado = 0;
        let totAcumulado = 0;
        for (const inv of mesActual.inversiones) {
          totAcumulado += inv.montoInversion;
          retornoAcumulado += (inv.montoInversion * inv.retornoMensual) / 100;
        }
        mesActual.inversionTotal = totAcumulado;
        mesActual.retorno = parseFloat(retornoAcumulado.toFixed(2));
        setMesActual({ ...mesActual });
        setValorMontoInput('');
        setValorRetorno('');
      } else {
        alert('Por favor, ingresa un número válido y/o selecciona un tipo de inversión.');
      }
    }
  };

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
                      onChange={handleChangeValorMontoInput}
                      placeholder='Monto a invertir'
                    />

                    <input
                      className='form-control-card form-control-lg col-6 mx-auto m-1'
                      id='retornoInput'
                      type='number'
                      value={valorRetorno}
                      onChange={handleChangeValorRetorno}
                      placeholder='% retorno actual (mes)'
                    />

                    <input
                      className='form-control-card form-control-lg col-6 mx-auto m-1'
                      id='plazoInput'
                      type='number'
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
                {inversiones.map((inversion, id) => (
                  <button
                    className='btn btn-outline-dark'
                    onClick={() => [handleButtonInversionesClick(inversion), guardarValor()]}
                    key={id}
                  >
                    {inversion.nombre.toUpperCase() + " - " + inversion.tipo.toUpperCase()}
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
              {/* {mesActual.inversiones.map((inversion, index) => (
                <button className='d-inline-flex p-2 card border-light bg-transparent' onClick={() => eraseInv(inversion)} key={index}>
                  {[inversion.nombre.toUpperCase(), " invertido: ", inversion.montoInversion]} ❌
                </button>
              ))} */}
              {mesActual.inversiones.map((inversion, id) => {
                if (inversion.mes === mesActual.mes && inversion.anio === mesActual.anio) {
                  return (
                    <p key={id} className='d-flex align-items-start bg-transparent m-2 p-2 border rounded-pill border-2'>
                      {[inversion.nombre.toUpperCase(), " invertido: ", inversion.montoInversion]}
                      <button
                        type='button'
                        className="btn" data-bs-toggle="button"
                        onClick={() => eraseInv(inversion)}
                        
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
