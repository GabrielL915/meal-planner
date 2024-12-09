import { useState } from 'react';

export interface MealItem {
  id: string;
  name: string;
  quantity: string;
  meal: 'lunch' | 'dinner';
}

export function useMealPlanner() {
  const [items, setItems] = useState<MealItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch');

  const addItem = () => {
    if (newItem.trim() && quantity.trim()) {
      setItems((prevItems) => [
        ...prevItems,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: newItem,
          quantity,
          meal: selectedMeal,
        },
      ]);
      setNewItem('');
      setQuantity('');
    }
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return {
    items,
    newItem,
    quantity,
    selectedMeal,
    setNewItem,
    setQuantity,
    setSelectedMeal,
    addItem,
    removeItem,
  };
}
