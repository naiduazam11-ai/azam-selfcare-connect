import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Receipt, 
  CreditCard, 
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export function LedgerSection() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  const accountSummary = {
    currentBalance: "TZS 23,500",
    totalPaid: "TZS 315,000",
    totalDue: "TZS 45,000",
    nextDueDate: "2024-09-15"
  };

  const transactions = [
    {
      id: "TXN001234",
      date: "2024-08-15",
      type: "Payment",
      description: "Monthly Subscription - Premium Package",
      amount: "-45,000",
      balance: "23,500",
      method: "M-Pesa",
      status: "Completed"
    },
    {
      id: "TXN001233",
      date: "2024-08-01",
      type: "Payment",
      description: "Monthly Subscription - Premium Package", 
      amount: "-45,000",
      balance: "68,500",
      method: "Card Payment",
      status: "Completed"
    },
    {
      id: "TXN001232",
      date: "2024-07-15",
      type: "Credit",
      description: "Promotional Credit - New Customer Bonus",
      amount: "+15,000",
      balance: "113,500",
      method: "System",
      status: "Applied"
    },
    {
      id: "TXN001231",
      date: "2024-07-01",
      type: "Payment",
      description: "Monthly Subscription - Standard Package",
      amount: "-35,000",
      balance: "98,500", 
      method: "Bank Transfer",
      status: "Completed"
    },
    {
      id: "TXN001230",
      date: "2024-06-15",
      type: "Payment",
      description: "Initial Payment - Standard Package",
      amount: "-35,000",
      balance: "133,500",
      method: "Cash",
      status: "Completed"
    }
  ];

  const invoices = [
    {
      id: "INV-2024-08-001",
      date: "2024-08-01",
      dueDate: "2024-08-15", 
      package: "Premium Package",
      amount: "45,000",
      status: "Paid",
      paidDate: "2024-08-15"
    },
    {
      id: "INV-2024-07-001",
      date: "2024-07-01",
      dueDate: "2024-07-15",
      package: "Premium Package", 
      amount: "45,000",
      status: "Paid",
      paidDate: "2024-07-01"
    },
    {
      id: "INV-2024-06-001", 
      date: "2024-06-01",
      dueDate: "2024-06-15",
      package: "Standard Package",
      amount: "35,000", 
      status: "Paid",
      paidDate: "2024-06-15"
    },
    {
      id: "INV-2024-09-001",
      date: "2024-09-01",
      dueDate: "2024-09-15",
      package: "Premium Package",
      amount: "45,000",
      status: "Pending",
      paidDate: null
    }
  ];

  const paymentHistory = [
    {
      date: "2024-08-15",
      amount: "45,000",
      method: "M-Pesa",
      reference: "MPE12345678",
      status: "Success"
    },
    {
      date: "2024-07-01", 
      amount: "45,000",
      method: "Card Payment",
      reference: "CARD987654321",
      status: "Success"
    },
    {
      date: "2024-06-15",
      amount: "35,000", 
      method: "Bank Transfer",
      reference: "BNK555666777",
      status: "Success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid': 
      case 'success': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    return num >= 0 ? `+${amount}` : amount;
  };

  return (
    <div className="space-y-6">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-success">{accountSummary.currentBalance}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">{accountSummary.totalPaid}</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-bold text-warning">{accountSummary.totalDue}</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className="text-lg font-bold">{accountSummary.nextDueDate}</p>
              </div>
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payments">Payment History</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>Complete record of all account transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'Payment' ? 'bg-destructive/10' : 'bg-success/10'
                      }`}>
                        {transaction.type === 'Payment' ? (
                          <ArrowUpRight className={`h-4 w-4 ${
                            transaction.type === 'Payment' ? 'text-destructive' : 'text-success'
                          }`} />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>{transaction.method}</span>
                          <span>•</span>
                          <span>#{transaction.id}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount.startsWith('-') ? 'text-destructive' : 'text-success'
                      }`}>
                        TZS {formatAmount(transaction.amount)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(transaction.status) as any} className="text-xs">
                          {transaction.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Bal: TZS {transaction.balance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Invoice Details
              </CardTitle>
              <CardDescription>Your billing statements and invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Receipt className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">{invoice.package}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {invoice.date} • Due: {invoice.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">TZS {invoice.amount}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(invoice.status) as any} className="text-xs">
                          {invoice.status}
                        </Badge>
                        {invoice.paidDate && (
                          <span className="text-xs text-muted-foreground">
                            Paid: {invoice.paidDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment History
              </CardTitle>
              <CardDescription>Record of all successful payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">TZS {payment.amount}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{payment.date}</span>
                          <span>•</span>
                          <span>{payment.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusColor(payment.status) as any} className="mb-1">
                        {payment.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        Ref: {payment.reference}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}