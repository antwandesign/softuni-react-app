import './App.css'

//Header import
import Header from './components/Navigation/Navbar.jsx'

//Pages imports
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import Listing from './pages/Listing.jsx'

//Footer import
// import Footer from './components/Footer/Footer.jsx'

//Router import
import {Routes,Route} from 'react-router-dom'



function App() {


  return (<>

  <Header />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<h2>About</h2>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/listing/:id" element={<Listing/>} />

  </Routes>

  </>
  )
}

export default App
