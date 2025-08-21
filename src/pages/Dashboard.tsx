import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { LoginForm } from "@/components/auth/LoginForm";
import { AccountOverview } from "@/components/dashboard/AccountOverview";
import { PaymentSection } from "@/components/payment/PaymentSection";
import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";
import { PlanChangeSection } from "@/components/plans/PlanChangeSection";
import { KnowledgeBaseSection } from "@/components/knowledge/KnowledgeBaseSection";
import { RetrackSection } from "@/components/retrack/RetrackSection";
import { LedgerSection } from "@/components/ledger/LedgerSection";
import { AddSubscriptionSection } from "@/components/subscription/AddSubscriptionSection";
import { PromoOffersSection } from "@/components/offers/PromoOffersSection";

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
            <Route path="/plans" element={<PlanChangeSection />} />
            <Route path="/knowledge-base" element={<KnowledgeBaseSection />} />
            <Route path="/retrack" element={<RetrackSection />} />
            <Route path="/ledger" element={<LedgerSection />} />
            <Route path="/add-subscription" element={<AddSubscriptionSection />} />
            <Route path="/offers" element={<PromoOffersSection />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}