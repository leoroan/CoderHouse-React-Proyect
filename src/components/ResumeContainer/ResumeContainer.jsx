import React, { useEffect, useState } from 'react';
import useMisMeses from '../Hooks/useMisMeses';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default (props) => {
  const { misMeses } = props;
  const { limpiarMeses, borrarInversionPorId } = useMisMeses([]);
  const [mesesConInversiones, setMesesConInversiones] = useState([]);
  const [id, setId] = useState('');
  const [dataForm, setDataForm] = useState({
    name: "", phone: "", email: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "", phone: "", email: ""
  });

  const handleErase = (id) => {
    borrarInversionPorId(id);
    const mesesConInversiones = misMeses.filter((mes) => mes.inversiones && mes.inversiones.length > 0);
    setMesesConInversiones(mesesConInversiones);
  };

  const borrarTodasLasInversiones = () => {
    limpiarMeses();
    setMesesConInversiones([]);
    alert("todo borrado");
  };

  const handleOnChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const errors = {
      name: "",
      phone: "",
      email: ""
    };
    let isValid = true;

    if (dataForm.name.trim() === "") {
      errors.name = "Por favor, ingrese su nombre.";
      isValid = false;
    }

    if (dataForm.phone.trim() === "") {
      errors.phone = "Por favor, ingrese su teléfono.";
      isValid = false;
    }

    if (dataForm.email.trim() === "") {
      errors.email = "Por favor, ingrese su correo electrónico.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  const handleAddResume = async (evt) => {
    evt.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const resumen = {}
      resumen.buyer = dataForm;
      resumen.items = mesesConInversiones.map(mes => {
        return { id: mes.id, nombre: mes.nombre, anio: mes.anio, invertido: mes.inversionTotal, retorno: mes.retorno }
      })
      // resume.total = inversionTotal();
      const queryDB = getFirestore();
      const resumeCollection = collection(queryDB, 'resumes');
      addDoc(resumeCollection, resumen)
        .then(({ id }) => setId(id))
        .catch(error => console.log(error))
        .finally(() => {
          setDataForm({
            name: "", phone: "", email: ""
          })
        })
    } else {
      console.log('Formulario no válido. No se enviará el resumen.');
    }
    limpiarMeses();
    setMesesConInversiones([]);
    alert('Gracias por operar con nosotros!')
  }

  useEffect(() => {
    const mesesConInversiones = misMeses && misMeses.filter((mes) => mes.inversiones && mes.inversiones.length > 0);
    setMesesConInversiones(mesesConInversiones);
  }, [misMeses]);

  return (
    <>
      {id !== '' && <h3> Cálculo de inversion generada bajo el id: {id}</h3>}
      {<div>
        <h1>Meses con inversiones:</h1>
        {mesesConInversiones && mesesConInversiones.length > 0 ? (
          <div>
            <button className='btn btn-outline-danger btn-sm m-2' onClick={borrarTodasLasInversiones}>Borrar todas las inversiones</button>
            <ul className="list-group m-4">
              {mesesConInversiones.map((mes, index) => (
                <li key={index}>
                  <p>Mes: {mes.nombre} AÑO: {mes.anio}</p>
                  <ul>
                    {mes.inversiones.map((inversion, inversionIndex) => (
                      <li className="list-group-item bg-transparent" key={inversion.id}>{inversion.nombre}, ID:{inversion.id.slice(0, 3) + "..." + inversion.id.slice(-4)} - INVERTIDO: ${inversion.montoInversion}
                        <button
                          className='btn btn-outline-danger mx-3'
                          type='badge bg-primary rounded-pill'
                          data-bs-toggle="button"
                          onClick={() => handleErase(inversion.id)}
                        >❌</button>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div className="input-group mb-3">
              <form onSubmit={handleAddResume}>
                <input className='form-control m-1' type="text" name='name' placeholder='ingrese su nombre' value={dataForm.name} onChange={handleOnChange} />
                <input className='form-control m-1' type="phone" name='phone' placeholder='ingrese su telefono' value={dataForm.phone} onChange={handleOnChange} />
                <input className='form-control m-1' type="email" name='email' placeholder='ingrese su email' value={dataForm.email} onChange={handleOnChange} />
                <button
                  className="btn btn-success btn-sm"
                >
                  Terminar inversiones
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <p>No hay meses con inversiones disponibles</p>
            <Link className='btn btn-outline-success' to='/'> Volvé así calculás! 😉 </Link>
          </div>
        )}

      </div>}
    </>
  );
};
