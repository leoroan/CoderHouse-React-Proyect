import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MainBox from './components/MainBox/MainBox'
import Header from './components/Header/Header'

function App() {

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center vh-100">
        <div className="d-flex flex-column justify-content-center w-100 h-100">
          <div className="cuerpoPpal w-100 h-100">
            <Header />
            <MainBox />
          </div>
        </div>
        <Footer copy="All Rights Reserverd 😂" />
      </div>
    </>
  )
}

export default App
