import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

type ChartProps = {
  type: "bar" | "pie";
};

const FinancialChart = ({ type }: ChartProps) => {
  const barData = [
    { month: "Aug", income: 7200, expenses: 4100 },
    { month: "Sep", income: 7800, expenses: 3900 },
    { month: "Oct", income: 8100, expenses: 4500 },
    { month: "Nov", income: 7500, expenses: 4200 },
    { month: "Dec", income: 8300, expenses: 4800 },
    { month: "Jan", income: 8500, expenses: 4320 },
  ];

  const pieData = [
    { name: "Food & Dining", value: 1200, color: "hsl(var(--primary))" },
    { name: "Transportation", value: 800, color: "hsl(var(--secondary))" },
    { name: "Utilities", value: 500, color: "hsl(var(--success))" },
    { name: "Entertainment", value: 600, color: "hsl(var(--warning))" },
    { name: "Shopping", value: 920, color: "hsl(var(--accent))" },
    { name: "Other", value: 300, color: "hsl(var(--muted))" },
  ];

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
          />
          <Legend />
          <Bar dataKey="income" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expenses" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.5rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default FinancialChart;
