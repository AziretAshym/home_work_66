import React, { useEffect, useState } from 'react';
import { IMealForm } from '../../types';

interface Props {
  mealToEdit?: IMealForm;
  submitForm: (meal: IMealForm) => void;
}

const initialForm = {
  time: "",
  name: "",
  calories: 0
};

const MealForm: React.FC<Props> = ({mealToEdit, submitForm}) => {
  const [meal, setMeal] = useState<IMealForm>({...initialForm})

  useEffect(() => {
    if (mealToEdit) {
      setMeal((prevState) => ({
        ...prevState,
        ...mealToEdit,
      }));
    }
  }, [mealToEdit]);

  const onChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setMeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitForm({ ...meal });

    if (!mealToEdit) {
      setMeal({ ...initialForm });
    }
  };

  return (
    <div className="container">
      <form className="w-50" onSubmit={onFormSubmit}>
        <select
          className="form-select mb-4"
          name="time"
          value={meal.time || ""}
          onChange={onChangeField}
          required
        >
          <option value="" disabled>Choose meal time</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <input
          type="text"
          className="form-control mb-4"
          name="name"
          placeholder="Enter name of meal"
          value={meal.name}
          onChange={onChangeField}
          required
        />


        <div className="input-group input-group-sm mb-3">
          <input
            type="number"
            className="form-control"
            name="calories"
            placeholder="Calories"
            value={meal.calories}
            onChange={onChangeField}
            required
          />
          <span className="input-group-text" id="inputGroup-sizing-sm">kcal</span>
        </div>

        <button type="submit" className="btn btn-primary">Save</button>


      </form>
    </div>
);
};

export default MealForm;