import { Plus } from 'lucide-react';
import { Button } from '@mlplanner/app/_components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/_components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@mlplanner/app/_components/ui/dialog';
import { Input } from '@mlplanner/app/_components/ui/input';
import { Label } from '@mlplanner/app/_components/ui/label';
import { Trash2, Edit2 } from 'lucide-react';
import type { Ingredient, MealItem } from '@mlplanner/app/types/interfaces';

interface MealSectionProps {
    mealType: 'lunch' | 'dinner';
    day: string;
    items: MealItem[];
    dishName: string;
    setDishName: (value: string) => void;
    ingredients: Ingredient[];
    updateIngredient: (id: string, field: 'name' | 'quantity', value: string) => void;
    addIngredient: () => void;
    removeIngredient: (id: string) => void;
    startEditing: (item: MealItem) => void;
    saveEdit: () => void;
    removeItem: (id: string) => void;
}

export default function MealSection({
    mealType,
    day,
    items,
    dishName,
    setDishName,
    ingredients,
    updateIngredient,
    addIngredient,
    removeIngredient,
    startEditing,
    saveEdit,
    removeItem,
}: MealSectionProps) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold">{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
            <div className="space-y-2">
                {items
                    .filter((item) => item.day === day && item.meal === mealType)
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
    );
}