import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainBox from './components/MainBox/MainBox'
import useMisMeses from './components/Hooks/useMisMeses'
import About from './components/About/About'
import News from './components/News/News'
import Contact from './components/Contact/Contact'
import CardContainer from './components/CardContainer/CardContainer'



export default function App() {
  const { misMeses, agregarMes } = useMisMeses([]);

  class Mes {
    constructor(id, mes, nombreMes, anio) {
      this.id = id;
      this.mes = mes;
      this.nombre = nombreMes;
      this.anio = anio;
      this.inversion = 0;
      this.retorno = 0;
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
      const mes = fechaActual.getMonth() + 1;
      const nombreMes = nombresMeses[mes - 1];
      const id = i;
      let unMes = new Mes(id, mes, nombreMes, fechaActual.getFullYear());
      // let unMes = { id, mes, nombreMes, anio: fechaActual.getFullYear() };
      handleAgregarMes(unMes);
      fechaActual.setMonth(fechaActual.getMonth() + 1);
    }
  };

  useEffect(() => {
    cargarMeses();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainBox misMeses={misMeses} />} />
          <Route path='/About' element={<About />} />
          <Route path='/News' element={<News />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Card/:cid' element={<CardContainer misMeses={misMeses} />} />
        </Routes>
        <Footer copy="All Rights Reserverd 😂" />
      </BrowserRouter>
    </>
  )
}

