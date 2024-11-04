import './App.css';
import Home from './Containers/Home/Home.tsx';
import AddMeal_EditMeal from './Containers/AddMeal_EditMeal/AddMeal_EditMeal.tsx';
import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout.tsx';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-meal" element={<AddMeal_EditMeal />} />
          <Route path="/meals/:idMeal/edit" element={<AddMeal_EditMeal />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
