import React, { useState } from 'react';
import axiosAPI from '../../AxiosAPI.ts';
import { IMealForm } from '../../types';
import MealForm from '../../Components/MealForm/MealForm.tsx';
import Loader from '../../Components/Ui/Loader/Loader.tsx';

const NewMeal = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const submitForm = async (post: IMealForm) => {
    try {
      setLoading(true);
      await axiosAPI.post("meal-tracker.json", { ...post });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loader /> : <MealForm submitForm={submitForm} />}
    </>
  );
};

export default NewMeal;