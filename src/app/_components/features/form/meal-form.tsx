import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@mlplanner/app/_components/ui/button';
import { Input } from '@mlplanner/app/_components/ui/input';
import { Label } from '@mlplanner/app/_components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@mlplanner/app/_components/ui/select';
import { Trash2 } from 'lucide-react';
import { Ingredient } from '@mlplanner/app/util/interfaces';

interface MealFormProps {
    dishName: string;
    setDishName: (value: string) => void;
    ingredients: Ingredient[];
    updateIngredient: (id: string, field: 'name' | 'quantity', value: string) => void;
    removeIngredient: (id: string) => void;
    addIngredient: () => void;
    selectedMeal: 'lunch' | 'dinner';
    setSelectedMeal: (value: 'lunch' | 'dinner') => void;
    selectedDay: string;
    setSelectedDay: (value: string) => void;
    daysOfWeek: string[];
    editingItem: any;
    saveEdit: () => void;
    addItem: () => void;
    cancelEdit: () => void;
}

export default function MealForm({
    dishName,
    setDishName,
    ingredients,
    updateIngredient,
    removeIngredient,
    addIngredient,
    selectedMeal,
    setSelectedMeal,
    selectedDay,
    setSelectedDay,
    daysOfWeek,
    editingItem,
    saveEdit,
    addItem,
    cancelEdit,
}: MealFormProps) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="dishName">Dish Name</Label>
                    <Input
                        id="dishName"
                        placeholder="Enter dish name..."
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
                <div className="grid gap-2">
                    <Label htmlFor="day">Day</Label>
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                            {daysOfWeek.map((day) => (
                                <SelectItem key={day} value={day}>
                                    {day}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button onClick={editingItem ? saveEdit : addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {editingItem ? 'Save Changes' : 'Add Meal'}
            </Button>
            {editingItem && (
                <Button onClick={cancelEdit} variant="outline" className="w-full">
                    <X className="mr-2 h-4 w-4" />
                    Cancel Edit
                </Button>
            )}
        </div>
    )
}