import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainBox from './components/MainBox/MainBox'
import Header from './components/Header/Header'
import useMisMeses from './components/Hooks/useMisMeses';
import { useEffect } from 'react';

export default function App() {
  const { misMeses, agregarMes } = useMisMeses([]);

  class Mes {
    constructor(mes, nombreMes, anio) {
      this.mes = mes;
      this.nombre = nombreMes;
      this.anio = anio;
    }
  }

  const handleAgregarMes = (unMes) => {
    if (unMes) {
      agregarMes(unMes);
    }
  };

  const cargarMeses = () => {
    const nombresMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    const fechaActual = new Date();
    for (let i = 0; i < 12; i++) {
      const mes = fechaActual.getMonth() + 1; // Sumamos 1 para obtener el mes correcto (0 = enero)
      const nombreMes = nombresMeses[mes - 1];
      let unMes = new Mes(mes, nombreMes, fechaActual.getFullYear())
      handleAgregarMes(unMes);
      fechaActual.setMonth(fechaActual.getMonth() + 1); // Avanzamos al siguiente mes
    }
  };

  useEffect(() => {
    cargarMeses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center vh-100">
        <div className="d-flex flex-column justify-content-center w-100 h-100">
          <div className="cuerpoPpal w-100 h-100">
            <Header />              
            <MainBox misMeses={misMeses} />
          </div>
        </div>
        <Footer copy="All Rights Reserverd 😂" />
      </div>
    </>
  )
}

