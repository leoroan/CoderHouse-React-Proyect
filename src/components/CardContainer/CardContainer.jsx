import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom'
import { getMesPorId } from '../mockApi';

export default () => {
  const { cid } = useParams();
  const [mesActual, setMesActual] = useState(null);
  const [valor, setValor] = useState('');
  const [cargando, setCargando] = useState(true);
  const [inversiones, setInversiones] = useState([]);

  const handleChange = (e) => {
    setValor(e.target.value);
  };

  const guardarValor = () => {
    if (mesActual) {
      const nuevoMonto = parseFloat(valor);
      if (!isNaN(nuevoMonto)) {
        mesActual.inversionTotal += nuevoMonto;
        const nuevoRetorno = mesActual.inversionTotal * mesActual.factorRetorno;
        mesActual.retorno = parseFloat(nuevoRetorno.toFixed(2));
        setMesActual({ ...mesActual });
        setValor('');
      } else {
        alert('Por favor, ingresa un número válido.');
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
  }, [cid]);

  const agregarInversiones = (unArray) => {
    for (const key in unArray) {
      if (unArray.hasOwnProperty(key)) {
        // Agrega cada valor al array inversiones usando setInversiones
        setInversiones((prevInversiones) => [...prevInversiones, unArray[key]]);
      }
    }
  };

  useEffect(() => {
    const db = getFirestore();
    // obtener un elemento por ID
    // const queryDoc = doc(db, 'inversiones', "C4GD24AFTnLPTN13z8cw");
    // getDoc(queryDoc)
    //   .then(response => ({ id: response.id, ...response.data() }))
    //   .then(response => console.log(response));

    // obtener la lista de elementos por coleccion
    const collectionRef = collection(db, 'inversiones'); // Referencia a la colección 'inversiones'
    getDocs(collectionRef)
      .then((querySnapshot) => {
        const inversionesData = [];
        querySnapshot.forEach((doc) => {
          // Accede a los datos de cada documento y agrega a un array
          inversionesData.push({ id: doc.id, ...doc.data() });

        });
        agregarInversiones(inversionesData);
      })
  }, [])

  return (
    <div className="container text-center">
      <h1> Mis Meses </h1>
      <div className="row">
        <div className="col-6">
          <div className="card border-light bg-transparent h-100">
            {cargando ? ( // Verificamos si estamos cargando
              <p>Cargando datos...</p>
            ) : (
              mesActual && (
                <div>
                  <h2>{mesActual.nombre + ' ' + mesActual.anio}</h2>
                  <h6>Inversion actual: ${mesActual.inversionTotal}</h6>
                  <h6>Retorno actual: ${mesActual.retorno}</h6>

                  {mesActual.inversionTotal > 0 ? (
                    <h4>Querés invertir más este mes?</h4>
                  ) : (
                    <h5>Querés empezar a invertir este mes??</h5>
                  )}

                  <input
                    className='form-control-card form-control-lg col-6 mx-auto m-4'
                    id='montoInput'
                    type='number'
                    value={valor}
                    onChange={handleChange}
                    placeholder='monto a invertir'
                  />
                </div>
              )
            )}
            <div className="d-grid gap-4 col-6 mx-auto mt-3">
              <button className='btn btn-success' onClick={guardarValor}>
                Invertir
              </button>
              <Link to='/'>
                <button className='btn btn-danger'>
                  Volver
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="row card border-light bg-transparent h-100">
            {/* <!-- AQUI SE GENERAN LAS OPCIONES DE INVERSION --> */}
            <h4>Tipos de productos (inversiones)</h4>
            {inversiones && inversiones.length > 0 ? (
              <div className="d-grid gap-4 col-6 mx-auto mt-5">
                {inversiones.map((inversion, id) => (
                  <button className='btn btn-outline-dark' key={id}>{inversion.nombre.toUpperCase()}</button>
                ))}
              </div>
            ) : (
              <p>Trayendo inversiones...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};