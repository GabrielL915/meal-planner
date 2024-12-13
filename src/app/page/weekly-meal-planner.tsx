"use client"

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/_components/ui/card';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@mlplanner/app/_components/ui/tabs';
import MealForm from '@mlplanner/app/_components/features/form/meal-form';
import MealSection from '@mlplanner/app/_components/features/meal-section';
import type { Ingredient, MealItem } from '@mlplanner/app/util/interfaces';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function WeeklyMealPlanner() {
  const [items, setItems] = useState<MealItem[]>([])
  const [dishName, setDishName] = useState('')
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: '1', name: '', quantity: '' }])
  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch')
  const [selectedDay, setSelectedDay] = useState('Monday')
  const [editingItem, setEditingItem] = useState<MealItem | null>(null)

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now().toString(), name: '', quantity: '' }])
  }

  const updateIngredient = (id: string, field: 'name' | 'quantity', value: string) => {
    setIngredients(ingredients.map(ing =>
      ing.id === id ? { ...ing, [field]: value } : ing
    ))
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const addItem = () => {
    if (dishName.trim() && ingredients.some(ing => ing.name.trim() && ing.quantity.trim())) {
      setItems([
        ...items,
        {
          id: Math.random().toString(36).substr(2, 9),
          dishName: dishName,
          ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
          meal: selectedMeal,
          day: selectedDay,
        },
      ])
      setDishName('')
      setIngredients([{ id: '1', name: '', quantity: '' }])
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const startEditing = (item: MealItem) => {
    setEditingItem(item)
    setDishName(item.dishName)
    setIngredients(item.ingredients)
    setSelectedMeal(item.meal)
    setSelectedDay(item.day)
  }

  const saveEdit = () => {
    if (editingItem && dishName.trim() && ingredients.some(ing => ing.name.trim() && ing.quantity.trim())) {
      setItems(items.map(item =>
        item.id === editingItem.id
          ? {
            ...item,
            dishName: dishName,
            ingredients: ingredients.filter(ing => ing.name.trim() && ing.quantity.trim()),
            meal: selectedMeal,
            day: selectedDay,
          }
          : item
      ))
      setEditingItem(null)
      setDishName('')
      setIngredients([{ id: '1', name: '', quantity: '' }])
    }
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setDishName('')
    setIngredients([{ id: '1', name: '', quantity: '' }])
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Weekly Meal Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MealForm
            dishName={dishName}
            setDishName={setDishName}
            ingredients={ingredients}
            updateIngredient={updateIngredient}
            removeIngredient={removeIngredient}
            addIngredient={addIngredient}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            daysOfWeek={daysOfWeek}
            editingItem={editingItem}
            saveEdit={saveEdit}
            addItem={addItem}
            cancelEdit={cancelEdit}
          />
          {/* DAY OF WEEK and MEAL */}
          <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              {daysOfWeek.map((day) => (
                <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* END DAYS OF WEEK AND MEALS */}
            {daysOfWeek.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <MealSection
                  mealType="lunch"
                  day={day}
                  items={items}
                  dishName={dishName}
                  setDishName={setDishName}
                  ingredients={ingredients}
                  updateIngredient={updateIngredient}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  removeItem={removeItem}
                />
                <MealSection
                  mealType="dinner"
                  day={day}
                  items={items}
                  dishName={dishName}
                  setDishName={setDishName}
                  ingredients={ingredients}
                  updateIngredient={updateIngredient}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
                  startEditing={startEditing}
                  saveEdit={saveEdit}
                  removeItem={removeItem}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Total Meals: {items.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}