import { Button } from '@mlplanner/app/@shadcn/components/ui/button';
import { Trash2 } from 'lucide-react';
import { MealItem } from '@mlplanner/app/hooks/useMealPlanner';

interface MealListProps {
  items: MealItem[];
  mealType: 'lunch' | 'dinner';
  removeItem: (id: string) => void;
}

export function MealList({ items, mealType, removeItem }: MealListProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{mealType === 'lunch' ? 'Lunch Items' : 'Dinner Items'}</h3>
      <div className="space-y-2">
        {items
          .filter((item) => item.meal === mealType)
          .map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
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
  );
}
