import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Headroom from 'react-headroom'

function App() {
  return (
    <div>
    <Headroom>
      <Navbar/>
    </Headroom>
      <div className='flex flex-col w-full h-screen'>       
        <div className='flex-1'>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default App
