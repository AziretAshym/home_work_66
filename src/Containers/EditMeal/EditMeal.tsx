import React, { useCallback, useEffect, useState } from 'react';
import { IMeal, IMealAPI, IMealForm } from '../../types';
import { useParams } from 'react-router-dom';
import axiosAPI from '../../AxiosAPI.ts';
import Loader from '../../Components/Ui/Loader/Loader.tsx';
import MealForm from '../../Components/MealForm/MealForm.tsx';

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeal>();
  const params = useParams<{idMeal: string}>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOneMeal = useCallback(async (id:string) => {
    try {
      setLoading(true);
      const response = await axiosAPI<IMealAPI>(`/meal-tracker/${id}.json`);
      if (response.data) {
        setMeal(response.data)
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.idMeal) {
      void fetchOneMeal(params.idMeal);
    }
  }, [params.idMeal, fetchOneMeal]);


  const submitForm = async (meal: IMealForm) => {
    try {
      setLoading(true);
      if (params.idMeal) {
        await axiosAPI.put(`meal-tracker/${params.idMeal}.json`, { ...meal });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {meal ? (
            <>
              <MealForm mealToEdit={meal} submitForm={submitForm} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default EditMeal;