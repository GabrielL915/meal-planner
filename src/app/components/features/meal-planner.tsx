"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/@shadcn/components/ui/card';
import { useMealPlanner } from '@mlplanner/app/hooks/useMealPlanner';
import { MealForm } from '@mlplanner/app/components/ui/meal-form';
import { MealList } from '@mlplanner/app/components/ui/meal-list';

export default function MealPlanner() {
  const {
    items,
    newItem,
    quantity,
    selectedMeal,
    setNewItem,
    setQuantity,
    setSelectedMeal,
    addItem,
    removeItem,
  } = useMealPlanner();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Meal Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MealForm
            newItem={newItem}
            quantity={quantity}
            selectedMeal={selectedMeal}
            setNewItem={setNewItem}
            setQuantity={setQuantity}
            setSelectedMeal={setSelectedMeal}
            addItem={addItem}
          />
          <MealList items={items} mealType="lunch" removeItem={removeItem} />
          <MealList items={items} mealType="dinner" removeItem={removeItem} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Total Items: {items.length}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
