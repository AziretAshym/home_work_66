import React, { useCallback, useEffect, useState } from 'react';
import axiosAPI from '../../AxiosAPI.ts';
import { IMeal } from '../../types';
import Loader from '../../Components/Ui/Loader/Loader.tsx';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI<>('meal-tracker.json');
      if (response.data) {
        const mealFromApi: IMeal[] = Object.keys(response.data).map(mealKey => ({
          id: mealKey,
          ...response.data[mealKey],
        }));
        setMeals(mealFromApi);
      }
      console.log(response.data);
    }catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const deleteMeal = async (id: string) => {
    try {
      await axiosAPI.delete(`/meal-tracker/${id}.json`);
      setMeals(prevPosts => prevPosts.filter(meal => meal.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <NavLink to="/new-meal" className="btn btn-primary mb-5">Add new meal</NavLink>
      {loading ? <Loader /> : (
        <>
          {meals.map((meal) => (
            <div className="card mb-3">
              <div className="card-header bg-primary-subtle">
                <h3>{meal.time}</h3>
              </div>
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title">{meal.name}</h5>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <h6 className="card-text">Kcal: {meal.calories}</h6>
                  <div className="d-flex flex-column gap-1">
                    <NavLink to={`/meals/${meal.id}/edit`} type="button" className="btn btn-primary">Edit</NavLink>
                    <button type="button" className="btn btn-danger" onClick={() => deleteMeal(meal.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>))}
        </>
      )
      }
    </div>
  );
};

export default Home;