"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/_components/ui/card';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@mlplanner/app/_components/ui/tabs';
import MealForm from '@mlplanner/app/_components/features/form/meal-form';
import MealSection from '@mlplanner/app/_components/features/meal-section';
import { DaysOfWeek } from '@mlplanner/app/types/days-of-week.enum';
import useWeeklyMealPlanner from '@mlplanner/app/hooks/useWeeklyMealPlanner';

const daysOfWeek = Object.values(DaysOfWeek);

export default function WeeklyMealPlanner() {
  const {
    items,
    dishName,
    setDishName,
    ingredients,
    selectedMeal,
    setSelectedMeal,
    selectedDay,
    setSelectedDay,
    editingItem,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addItem,
    removeItem,
    startEditing,
    saveEdit,
    cancelEdit,
  } = useWeeklyMealPlanner();

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
          <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              {daysOfWeek.map((day) => (
                <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
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