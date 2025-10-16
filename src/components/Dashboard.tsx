import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Wallet, Target, ExternalLink } from "lucide-react";
import FinancialChart from "./FinancialChart";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Balance",
      value: "R24,580.00",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
      description: "Across all accounts"
    },
    {
      title: "Monthly Income",
      value: "R8,500.00",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      description: "This month"
    },
    {
      title: "Monthly Expenses",
      value: "R4,320.00",
      change: "-3.1%",
      trend: "down",
      icon: TrendingDown,
      description: "This month"
    },
    {
      title: "Savings Progress",
      value: "68%",
      change: "+5%",
      trend: "up",
      icon: Target,
      description: "Of monthly goal"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-card">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-white/90 text-lg">Here's your financial overview for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${
                  stat.trend === "up" ? "bg-success/10" : "bg-secondary/10"
                }`}>
                  <Icon className={`h-4 w-4 ${
                    stat.trend === "up" ? "text-success" : "text-secondary"
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <span className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-secondary"
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Last 6 months comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialChart type="bar" />
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Spending Categories</CardTitle>
            <CardDescription>This month's breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialChart type="pie" />
          </CardContent>
        </Card>
      </div>

      {/* Credit Score Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Check Your Credit Score</CardTitle>
          <CardDescription>Monitor your credit health and get personalized tips to improve your score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => window.open('https://www.transunion.co.za/', '_blank')}
              className="gap-2"
            >
              TransUnion <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => window.open('https://www.experian.co.za/', '_blank')}
              variant="outline"
              className="gap-2"
            >
              Experian <ExternalLink className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => window.open('https://www.compuscan.co.za/', '_blank')}
              variant="outline"
              className="gap-2"
            >
              Compuscan <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
