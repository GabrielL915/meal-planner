"use client"

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/@shadcn/components/ui/card';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@mlplanner/app/@shadcn/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@mlplanner/app/@shadcn/components/ui/dialog';
import { Input } from '@mlplanner/app/@shadcn/components/ui/input';
import { Label } from '@mlplanner/app/@shadcn/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@mlplanner/app/@shadcn/components/ui/select';
import { Trash2, Edit2 } from 'lucide-react';
import MealForm from './form/meal-form';

interface Ingredient {
  id: string
  name: string
  quantity: string
}

interface MealItem {
  id: string
  dishName: string
  ingredients: Ingredient[]
  meal: 'lunch' | 'dinner'
  day: string
}

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
          {/* FORM */}
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
          {/* END FORM */}
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
            {/* START OF LUNCH DIALOOG */}
            {daysOfWeek.map((day) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Lunch</h3>
                  <div className="space-y-2">
                    {items
                      .filter((item) => item.day === day && item.meal === 'lunch')
                      .map((item) => (
                        <Card key={item.id}>
                          <CardHeader>
                            <CardTitle>{item.dishName}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside">
                              {item.ingredients.map((ing, index) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  {ing.name} - {ing.quantity}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          {/*EDIT FORM */}
                          <CardFooter className="flex justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => startEditing(item)}>
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Meal</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-dish-name">Dish Name</Label>
                                    <Input
                                      id="edit-dish-name"
                                      value={dishName}
                                      onChange={(e) => setDishName(e.target.value)}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Ingredients</Label>
                                    {ingredients.map((ing, index) => (
                                      <div key={ing.id} className="flex gap-2">
                                        <Input
                                          placeholder="Ingredient name"
                                          value={ing.name}
                                          onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                                        />
                                        <Input
                                          placeholder="Quantity"
                                          value={ing.quantity}
                                          onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)}
                                        />
                                        {index > 0 && (
                                          <Button variant="ghost" size="icon" onClick={() => removeIngredient(ing.id)}>
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        )}
                                      </div>
                                    ))}
                                    <Button variant="outline" onClick={addIngredient}>
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Ingredient
                                    </Button>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={saveEdit}>Save changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            {/* END OF EDIT*/}
                            {/* DELETE BUTTOM */}
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            {/* END OF DELETE BUTTON */}
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
                {/* END OF LUNCH */}
                {/* START OF DINNER */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Dinner</h3>
                  <div className="space-y-2">
                    {items
                      .filter((item) => item.day === day && item.meal === 'dinner')
                      .map((item) => (
                        <Card key={item.id}>
                          <CardHeader>
                            <CardTitle>{item.dishName}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="list-disc list-inside">
                              {item.ingredients.map((ing, index) => (
                                <li key={index} className="text-sm text-muted-foreground">
                                  {ing.name} - {ing.quantity}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                          <CardFooter className="flex justify-end space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => startEditing(item)}>
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Meal</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-dish-name">Dish Name</Label>
                                    <Input
                                      id="edit-dish-name"
                                      value={dishName}
                                      onChange={(e) => setDishName(e.target.value)}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Ingredients</Label>
                                    {ingredients.map((ing, index) => (
                                      <div key={ing.id} className="flex gap-2">
                                        <Input
                                          placeholder="Ingredient name"
                                          value={ing.name}
                                          onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                                        />
                                        <Input
                                          placeholder="Quantity"
                                          value={ing.quantity}
                                          onChange={(e) => updateIngredient(ing.id, 'quantity', e.target.value)}
                                        />
                                        {index > 0 && (
                                          <Button variant="ghost" size="icon" onClick={() => removeIngredient(ing.id)}>
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        )}
                                      </div>
                                    ))}
                                    <Button variant="outline" onClick={addIngredient}>
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add Ingredient
                                    </Button>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={saveEdit}>Save changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
        {/* TOTAL MEALS */}
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Total Meals: {items.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}