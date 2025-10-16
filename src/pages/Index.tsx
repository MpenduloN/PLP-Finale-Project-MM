import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import TransactionList from "@/components/TransactionList";
import GoalsTracker from "@/components/GoalsTracker";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Home, Receipt, Target, MessageSquare } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "transactions" | "goals" | "assistant">("dashboard");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FinWell
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "transactions" ? "default" : "ghost"}
              onClick={() => setActiveTab("transactions")}
              className="flex items-center gap-2"
            >
              <Receipt className="h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "goals" ? "default" : "ghost"}
              onClick={() => setActiveTab("goals")}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Goals
            </Button>
            <Button
              variant={activeTab === "assistant" ? "default" : "ghost"}
              onClick={() => setActiveTab("assistant")}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "transactions" && <TransactionList />}
          {activeTab === "goals" && <GoalsTracker />}
          {activeTab === "assistant" && <AIAssistant />}
        </div>
      </main>
    </div>
  );
};

export default Index;
