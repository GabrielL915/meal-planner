import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@mlplanner/app/@shadcn/components/ui/card';
import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { DialogTrigger } from '@mlplanner/app/@shadcn/components/ui/dialog';
import { Trash2, Edit2 } from 'lucide-react';

interface Ingredient {
    id: string
    name: string
    quantity: string
}

interface MealCardProps {
    id: string
    dishName: string
    ingredients: Ingredient[]
    onEdit: () => void
    onDelete: () => void
}

export function MealCard({ id, dishName, ingredients, onEdit, onDelete }: MealCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{dishName}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside">
                    {ingredients.map((ing, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                            {ing.name} - {ing.quantity}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={onEdit}>
                        <Edit2 className="h-4 w-4" />
                    </Button>
                </DialogTrigger>
                <Button variant="ghost" size="icon" onClick={onDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}