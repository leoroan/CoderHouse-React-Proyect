import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainBox from './components/MainBox/MainBox'
import About from './components/About/About'
import News from './components/News/News'
import Contact from './components/Contact/Contact'
import CardContainer from './components/CardContainer/CardContainer'
import { getMeses } from './components/mockApi';

export default function App() {
  const [misMeses, setMisMeses] = useState([]);

  useEffect(() => {
    getMeses().then((data) => {
      setMisMeses(data);
    });
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
          <Route path='/Card/:cid' element={<CardContainer />} />
        </Routes>
        <Footer copy="All Rights Reserverd 😂" />
      </BrowserRouter>
    </>
  )
}

