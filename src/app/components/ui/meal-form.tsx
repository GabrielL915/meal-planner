import { Button } from "@mlplanner/app/@shadcn/components/ui/button";
import { Input } from "@mlplanner/app/@shadcn/components/ui/input";
import { Label } from "@mlplanner/app/@shadcn/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@mlplanner/app/@shadcn/components/ui/select";
import { Plus, Trash2 } from 'lucide-react'

interface Ingredient {
    id: string
    name: string
    quantity: string
}

interface MealFormProps {
    dishName: string
    ingredients: Ingredient[]
    selectedMeal: 'lunch' | 'dinner'
    selectedDay: string
    onDishNameChange: (value: string) => void
    onIngredientChange: (id: string, field: 'name' | 'quantity', value: string) => void
    onAddIngredient: () => void
    onRemoveIngredient: (id: string) => void
    onMealChange: (value: 'lunch' | 'dinner') => void
    onDayChange: (value: string) => void
}

export function MealForm({
    dishName,
    ingredients,
    selectedMeal,
    selectedDay,
    onDishNameChange,
    onIngredientChange,
    onAddIngredient,
    onRemoveIngredient,
    onMealChange,
    onDayChange
}: MealFormProps) {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']

    return (
        <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="dishName">Nome do Prato</Label>
                    <Input
                        id="dishName"
                        placeholder="Digite o nome do prato..."
                        value={dishName}
                        onChange={(e) => onDishNameChange(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label>Ingredientes</Label>
                    {ingredients.map((ing, index) => (
                        <div key={ing.id} className="flex gap-2">
                            <Input
                                placeholder="Nome do ingrediente"
                                value={ing.name}
                                onChange={(e) => onIngredientChange(ing.id, 'name', e.target.value)}
                            />
                            <Input
                                placeholder="Quantidade"
                                value={ing.quantity}
                                onChange={(e) => onIngredientChange(ing.id, 'quantity', e.target.value)}
                            />
                            {index > 0 && (
                                <Button variant="ghost" size="icon" onClick={() => onRemoveIngredient(ing.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="outline" onClick={onAddIngredient}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Ingrediente
                    </Button>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="meal">Refeição</Label>
                    <Select value={selectedMeal} onValueChange={onMealChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione a refeição" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="almoço">Almoço</SelectItem>
                            <SelectItem value="jantar">Jantar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="day">Dia</Label>
                    <Select value={selectedDay} onValueChange={onDayChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o dia" />
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
        </div>
    )
}
