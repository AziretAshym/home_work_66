import './App.css'
import NavBar from './Components/NavBar/NavBar.tsx';
import Home from './Containers/Home/Home.tsx';
import NewMeal from './Containers/NewMeal/NewMeal.tsx';
import { Route, Routes } from 'react-router-dom';
import EditMeal from './Containers/EditMeal/EditMeal.tsx';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-meal" element={<NewMeal />} />
        <Route path="/meals/:idMeal/edit" element={<EditMeal />} />
      </Routes>
    </>
  )
}

export default App
