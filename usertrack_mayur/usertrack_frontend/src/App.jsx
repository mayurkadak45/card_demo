import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Outlet, Router } from 'react-router-dom'
import AppRouter from './Routes'

function App() {
  

  return (
    <>
      <Navbar/>
      <AppRouter/>
      <Outlet/>
    </>
  )
}

export default App
