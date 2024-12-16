import WeeklyMealPlanner from "./page/weekly-meal-planner";
import ErrorBoundary from "./utils/errors/error-boundary";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background py-8">
      <ErrorBoundary>
        <WeeklyMealPlanner />
      </ErrorBoundary>
    </main>
  );
}