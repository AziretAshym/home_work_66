import React, { useCallback, useEffect, useState } from 'react';
import axiosAPI from '../../AxiosAPI.ts';
import { IMeal } from '../../types';
import Loader from '../../Components/Ui/Loader/Loader.tsx';
import { NavLink } from 'react-router-dom';
import Calories from '../../Components/Calories/Calories.tsx';
import ButtonLoader from '../../Components/Ui/ButtonLoader/ButtonLoader.tsx';


interface Props {
  isLoading?: boolean;
}

const Home: React.FC<Props> = ({isLoading = false}) => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI<>('meal-tracker.json');
      if (response.data) {
        const mealFromApi: IMeal[] = Object.keys(response.data).map(mealKey => ({
          id: mealKey,
          ...response.data[mealKey],
        }));
        setMeals(mealFromApi.reverse());
      }
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
    setLoadingDeleteId(id);
    try {
      await axiosAPI.delete(`/meal-tracker/${id}.json`);
      setMeals(prevPosts => prevPosts.filter(meal => meal.id !== id));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <NavLink to="/new-meal" className="btn btn-primary mb-5">Add new meal</NavLink>
        <Calories meals={meals}/>
      </div>
      {loading ? <Loader /> : (
        <>

          {meals.length > 0 ? meals.map((meal) => (
            <div key={meal.id} className="card mb-3">
              <div className="card-header bg-primary-subtle">
                <h3>{meal.time}</h3>
              </div>
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title">{meal.name}</h5>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <h6 className="card-text">Kcal: {meal.calories}</h6>
                  <div className="d-flex flex-column gap-1">
                    <NavLink to={`/meals/${meal.id}/edit`} type="button" className="btn btn-primary">Edit</NavLink>
                    <button disabled={isLoading} type="button" className="btn btn-danger" onClick={() => deleteMeal(meal.id)}>
                      <span className="me-2">Delete</span>
                      {loadingDeleteId === meal.id ? <ButtonLoader /> : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>))
            :
            <h1>No meals</h1>
          }

        </>
      )
      }
    </div>
  );
};

export default Home;