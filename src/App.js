import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import MovieList from './components/MovieList';
import MovieUpdate from './components/MovieUpdate';
import Cart from './components/Cart';
import PaymentGateway from './components/PaymentGateway';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path='/' element={<MovieList/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/updatemovie' element={<MovieUpdate/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/checkout' element={<PaymentGateway/>}></Route>
        <Route path='/register' element={<SignUp/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
