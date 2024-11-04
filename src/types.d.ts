export interface IMealForm {
  time: string;
  name: string;
  calories: number;
}

export interface IMeal extends IMealForm {
  id: string;
}

export interface IMealAPI {
  [id: string]: IMeal;
}
