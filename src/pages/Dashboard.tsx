import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { PaymentSection } from "@/components/payment/PaymentSection";
import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { Routes, Route } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<AccountOverview />} />
            <Route path="/account" element={<AccountOverview />} />
            <Route path="/payment" element={<PaymentSection />} />
            <Route path="/service-request" element={<ServiceRequestForm />} />
            <Route path="/plans" element={<div>Plan Change - Coming Soon</div>} />
            <Route path="/knowledge-base" element={<div>Knowledge Base - Coming Soon</div>} />
            <Route path="/retrack" element={<div>Retrack - Coming Soon</div>} />
            <Route path="/ledger" element={<div>Ledger - Coming Soon</div>} />
            <Route path="/add-subscription" element={<div>Add Subscription - Coming Soon</div>} />
            <Route path="/offers" element={<div>Promo Offers - Coming Soon</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}