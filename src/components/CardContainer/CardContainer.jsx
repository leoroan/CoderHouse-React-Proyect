import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { useParams, Link } from 'react-router-dom'
import { getMesPorId } from '../mockApi';

export default () => {
  const { cid } = useParams();
  const [mesActual, setMesActual] = useState(null);
  const [valor, setValor] = useState('');
  const [cargando, setCargando] = useState(true);

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

  useEffect(() => {
    const db = getFirestore();
    // obtener un elemento por ID
    const queryDoc = doc(db, 'inversiones', "C4GD24AFTnLPTN13z8cw");
    getDoc(queryDoc)
      .then(response => ({ id: response.id, ...response.data() }))
      .then(response => console.log(response));

    // obtener la lista de elementos por coleccion
    // const collectionRef = collection(db, 'inversiones'); // Referencia a la colección 'inversiones'
    // getDocs(collectionRef)
    //   .then((querySnapshot) => {
    //     const inversionesData = [];
    //     querySnapshot.forEach((doc) => {
    //       // Accede a los datos de cada documento y agrega a un array
    //       inversionesData.push({ id: doc.id, ...doc.data() });
    //     });
    //     console.log(inversionesData); // Aquí tienes todos los datos de la colección 'inversiones'
    //   })



  }, [])

  return (
    <div>
      <h1> Mis Meses </h1>
      {cargando ? ( // Verificamos si estamos cargando
        <p>Cargando datos...</p>
      ) : (
        mesActual && (
          <div>
            <h2>{mesActual.nombre + ' ' + mesActual.anio}</h2>
            <h6>Inversion actual: ${mesActual.inversionTotal}</h6>
            <h6>Retorno actual: ${mesActual.retorno}</h6>

            {mesActual.inversionTotal > 0 ? (
              <p>Querés invertir más este mes?</p>
            ) : (
              <p>Querés empezar a invertir este mes??</p>
            )}

            <input
              className='form-control-card col-2 mx-auto'
              id='montoInput'
              type='number'
              value={valor}
              onChange={handleChange}
              placeholder='Ingresa un monto a invertir'
            />
          </div>
        )
      )}
      <button className='btn btn-outline-light btn-sm' onClick={guardarValor}>
        Invertir
      </button>
      <Link to='/'>
        <button className='btn btn-outline-dark btn-sm'>Volver</button>
      </Link>
    </div>
  );
};