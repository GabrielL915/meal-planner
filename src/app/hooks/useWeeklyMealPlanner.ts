import { useState } from 'react';
import type { Ingredient, MealItem } from '@mlplanner/app/types/interfaces';

export default function useWeeklyMealPlanner() {
  const [items, setItems] = useState<MealItem[]>([]);
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: '1', name: '', quantity: '' }]);
  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [editingItem, setEditingItem] = useState<MealItem | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: '', quantity: '' }]);
  };

  const updateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(
      ingredients.map(ing => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const addItem = () => {
    if (dishName.trim() && ingredients.some(ing => ing.name.trim() && ing.quantity.trim())) {
      setItems([
        ...items,
        {
          id: Math.random().toString(36).substr(2, 9),
          dishName,
          ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
          meal: selectedMeal,
          day: selectedDay,
        },
      ]);
      setDishName('');
      setIngredients([{ id: '1', name: '', quantity: '' }]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEditing = (item: MealItem) => {
    setEditingItem(item);
    setDishName(item.dishName);
    setIngredients(item.ingredients);
    setSelectedMeal(item.meal);
    setSelectedDay(item.day);
  };

  const saveEdit = () => {
    if (editingItem && dishName.trim() && ingredients.some(ing => ing.name.trim() && ing.quantity.trim())) {
      setItems(
        items.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                dishName,
                ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
                meal: selectedMeal,
                day: selectedDay,
              }
            : item
        )
      );
      setEditingItem(null);
      setDishName('');
      setIngredients([{ id: '1', name: '', quantity: '' }]);
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setDishName('');
    setIngredients([{ id: '1', name: '', quantity: '' }]);
  };

  return {
    items,
    dishName,
    setDishName,
    ingredients,
    setIngredients,
    selectedMeal,
    setSelectedMeal,
    selectedDay,
    setSelectedDay,
    editingItem,
    setEditingItem,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addItem,
    removeItem,
    startEditing,
    saveEdit,
    cancelEdit,
  };
}
