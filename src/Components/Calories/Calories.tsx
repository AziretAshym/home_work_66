import React, { useMemo } from "react";
import { IMeal } from "../../types";

interface CaloriesProps {
  meals: IMeal[];
}

const Calories: React.FC<CaloriesProps> = ({ meals }) => {
  const totalCalories = useMemo(() => {
    return meals.reduce((acc, meal) => acc + Number(meal.calories), 0);
  }, [meals]);

  return (
    <p className="fs-4">
      Total Calories: <strong>{totalCalories} kcal</strong>
    </p>
  );
};

export default Calories;
