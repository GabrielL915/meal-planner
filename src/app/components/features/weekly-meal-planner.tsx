'use-client'

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/@shadcn/components/ui/card';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@mlplanner/app/@shadcn/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogFooter } from '@mlplanner/app/@shadcn/components/ui/dialog';
import { MealCard } from '../ui/meal-card';
import { MealForm } from '../ui/meal-form';

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
  
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  
  export default function WeeklyMealPlanner() {
    const [items, setItems] = useState<MealItem[]>([])
    const [dishName, setDishName] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ id: '1', name: '', quantity: '' }])
    const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch')
    const [selectedDay, setSelectedDay] = useState('Segunda')
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
            <CardTitle className="text-2xl font-bold text-center">Planejador de Refeições Semanal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col space-y-4">
              <MealForm
                dishName={dishName}
                ingredients={ingredients}
                selectedMeal={selectedMeal}
                selectedDay={selectedDay}
                onDishNameChange={setDishName}
                onIngredientChange={updateIngredient}
                onAddIngredient={addIngredient}
                onRemoveIngredient={removeIngredient}
                onMealChange={setSelectedMeal}
                onDayChange={setSelectedDay}
              />
              <Button onClick={editingItem ? saveEdit : addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {editingItem ? 'Salvar Alterações' : 'Adicionar Refeição'}
              </Button>
              {editingItem && (
                <Button onClick={cancelEdit} variant="outline" className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  Cancelar Edição
                </Button>
              )}
            </div>
  
            <Tabs defaultValue="Segunda" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                {daysOfWeek.map((day) => (
                  <TabsTrigger key={day} value={day} className="text-xs sm:text-sm">
                    {day.slice(0, 3)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {daysOfWeek.map((day) => (
                <TabsContent key={day} value={day} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Almoço</h3>
                    <div className="space-y-2">
                      {items
                        .filter((item) => item.day === day && item.meal === 'lunch')
                        .map((item) => (
                          <MealCard
                            key={item.id}
                            id={item.id}
                            dishName={item.dishName}
                            ingredients={item.ingredients}
                            onEdit={() => startEditing(item)}
                            onDelete={() => removeItem(item.id)}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Jantar</h3>
                    <div className="space-y-2">
                      {items
                        .filter((item) => item.day === day && item.meal === 'dinner')
                        .map((item) => (
                          <MealCard
                            key={item.id}
                            id={item.id}
                            dishName={item.dishName}
                            ingredients={item.ingredients}
                            onEdit={() => startEditing(item)}
                            onDelete={() => removeItem(item.id)}
                          />
                        ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Total de Refeições: {items.length}
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }