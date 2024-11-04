import './App.css'
import NavBar from './Components/NavBar/NavBar.tsx';
import Home from './Containers/Home/Home.tsx';
import AddMeal_EditMeal from './Containers/AddMeal_EditMeal/AddMeal_EditMeal.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-meal" element={<AddMeal_EditMeal />} />
        <Route path="/meals/:idMeal/edit" element={<AddMeal_EditMeal />} />
      </Routes>
    </>
  )
}

export default App
