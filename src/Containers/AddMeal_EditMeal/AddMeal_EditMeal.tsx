import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosAPI from '../../AxiosAPI.ts';
import { IMeal, IMealAPI, IMealForm } from '../../types';
import MealForm from '../../Components/MealForm/MealForm.tsx';
import { toast } from 'react-toastify';

const AddMeal_EditMeal = () => {
  const [meal, setMeal] = useState<IMeal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams<{ idMeal: string }>();

  const fetchMeal = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await axiosAPI.get<IMealAPI>(`/meal-tracker/${id}.json`);
      if (response.data) {
        setMeal(response.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.idMeal) {
      void fetchMeal(params.idMeal);
    } else {
      setMeal(null);
    }
  }, [params.idMeal, fetchMeal]);

  const submitForm = async (mealData: IMealForm) => {
    try {
      setLoading(true);
      if (params.idMeal) {
        await axiosAPI.put(`/meal-tracker/${params.idMeal}.json`, mealData);
        toast.success("Meal edited!");
      } else {
        await axiosAPI.post("meal-tracker.json", mealData);
        toast.success("Meal added!");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <MealForm
        mealToEdit={meal || undefined}
        submitForm={submitForm}
        isLoading={loading}
      />
    </div>
  );
};

export default AddMeal_EditMeal;
