export interface Ingredient {
    id: string;
    name: string;
    quantity: string;
}

export interface MealItem {
    id: string;
    dishName: string;
    ingredients: Ingredient[];
    meal: 'lunch' | 'dinner';
    day: string;
}
  