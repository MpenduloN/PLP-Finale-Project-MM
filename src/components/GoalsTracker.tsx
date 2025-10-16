import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, TrendingUp, PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  category: "savings" | "debt" | "investment";
  deadline: string;
};

const GoalsTracker = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", name: "Emergency Fund", target: 10000, current: 6800, category: "savings", deadline: "2025-12-31" },
    { id: "2", name: "Pay Off Credit Card", target: 5000, current: 3200, category: "debt", deadline: "2025-06-30" },
    { id: "3", name: "Investment Portfolio", target: 15000, current: 4500, category: "investment", deadline: "2025-12-31" },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleAddGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      target: parseFloat(formData.get("target") as string),
      current: parseFloat(formData.get("current") as string) || 0,
      category: formData.get("category") as "savings" | "debt" | "investment",
      deadline: formData.get("deadline") as string,
    };

    setGoals([...goals, newGoal]);
    setShowForm(false);
    toast({
      title: "Goal created",
      description: "Your financial goal has been set successfully.",
    });
    e.currentTarget.reset();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings": return PiggyBank;
      case "debt": return Target;
      case "investment": return TrendingUp;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "savings": return "text-success";
      case "debt": return "text-warning";
      case "investment": return "text-secondary";
      default: return "text-primary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Financial Goals</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>

      {showForm && (
        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Emergency Fund" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Amount</Label>
                  <Input id="target" name="target" type="number" step="0.01" placeholder="10000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current">Current Amount</Label>
                  <Input id="current" name="current" type="number" step="0.01" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select name="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="savings">Savings</option>
                    <option value="debt">Debt Reduction</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input id="deadline" name="deadline" type="date" required />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Goal</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
          const Icon = getCategoryIcon(goal.category);
          const progress = (goal.current / goal.target) * 100;
          const remaining = goal.target - goal.current;

          return (
            <Card key={goal.id} className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <Icon className={`h-5 w-5 ${getCategoryColor(goal.category)}`} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Current</p>
                    <p className="font-bold text-lg">${goal.current.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Target</p>
                    <p className="font-bold text-lg">${goal.target.toFixed(2)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground">Remaining: <span className="font-medium text-foreground">${remaining.toFixed(2)}</span></p>
                  <p className="text-sm text-muted-foreground">Deadline: <span className="font-medium text-foreground">{goal.deadline}</span></p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsTracker;
