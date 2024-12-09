import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { Input } from '@mlplanner/app/@shadcn/components/ui/input';
import { Label } from '@mlplanner/app/@shadcn/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@mlplanner/app/@shadcn/components/ui/select';

interface MealFormProps {
  newItem: string;
  quantity: string;
  selectedMeal: 'lunch' | 'dinner';
  setNewItem: (value: string) => void;
  setQuantity: (value: string) => void;
  setSelectedMeal: (value: 'lunch' | 'dinner') => void;
  addItem: () => void;
}

export function MealForm({
  newItem,
  quantity,
  selectedMeal,
  setNewItem,
  setQuantity,
  setSelectedMeal,
  addItem,
}: MealFormProps) {
  return (
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
        <Select value={selectedMeal} onValueChange={setSelectedMeal}>
          <SelectTrigger>
            <SelectValue placeholder="Select meal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={addItem} className="w-full">
        Add Item
      </Button>
    </div>
  );
}
