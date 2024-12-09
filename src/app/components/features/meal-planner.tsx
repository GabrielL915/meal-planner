"use client"

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { Input } from '@mlplanner/app/@shadcn/components/ui/input';
import { Label } from '@mlplanner/app/@shadcn/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@mlplanner/app/@shadcn/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/@shadcn/components/ui/card';

interface MealItem {
  id: string
  name: string
  quantity: string
  meal: 'lunch' | 'dinner'
}

export default function MealPlanner() {
  const [items, setItems] = useState<MealItem[]>([])
  const [newItem, setNewItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selectedMeal, setSelectedMeal] = useState<'lunch' | 'dinner'>('lunch')

  const addItem = () => {
    if (newItem.trim() && quantity.trim()) {
      setItems([
        ...items,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: newItem,
          quantity: quantity,
          meal: selectedMeal,
        },
      ])
      setNewItem('')
      setQuantity('')
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Meal Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item">Item</Label>
                <Input
                  id="item"
                  placeholder="Add new item..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Enter quantity..."
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meal">Meal</Label>
                <Select value={selectedMeal} onValueChange={(value: 'lunch' | 'dinner') => setSelectedMeal(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addItem} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Lunch Items</h3>
            <div className="space-y-2">
              {items
                .filter((item) => item.meal === 'lunch')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-2 text-muted-foreground">({item.quantity})</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Dinner Items</h3>
            <div className="space-y-2">
              {items
                .filter((item) => item.meal === 'dinner')
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-2 text-muted-foreground">({item.quantity})</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Total Items: {items.length}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
