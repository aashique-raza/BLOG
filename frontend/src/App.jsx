
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Header from './components/Header'
import FooterCom from './components/Footer'
import Dashboard from './pages/Dashboard'

function App() {
  

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
