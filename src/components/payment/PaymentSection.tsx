import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  History, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PaymentSection() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const paymentMethods = [
    { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, fee: '1%' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: '2.5%' },
    { id: 'bank', name: 'Bank Transfer', icon: Building2, fee: 'Free' },
  ];

  const recentPayments = [
    { id: 1, date: '2024-08-01', amount: 'TZS 45,000', method: 'M-Pesa', status: 'Completed' },
    { id: 2, date: '2024-07-01', amount: 'TZS 45,000', method: 'Card', status: 'Completed' },
    { id: 3, date: '2024-06-01', amount: 'TZS 45,000', method: 'M-Pesa', status: 'Completed' },
  ];

  const handlePayment = async (method: string) => {
    if (!amount) return;

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Initiated",
        description: `Payment of TZS ${amount} via ${method} has been initiated.`,
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Balance */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Account Balance</CardTitle>
            <CardDescription>Your current account status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
                <p className="text-3xl font-bold text-success">TZS 23,500</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className="text-lg font-semibold">September 15, 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Fee</p>
                <p className="text-lg font-semibold">TZS 45,000</p>
              </div>
              <Badge variant="success" className="w-full justify-center">
                Account Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Make Payment</CardTitle>
            <CardDescription>Pay your subscription using various payment methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount (TZS)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="45000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <Tabs defaultValue="mpesa" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  {paymentMethods.map((method) => (
                    <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                      <method.icon className="h-4 w-4" />
                      {method.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="mpesa" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="mpesa-number">M-Pesa Phone Number</Label>
                      <Input id="mpesa-number" type="tel" placeholder="+255 123 456 789" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Transaction fee: 1% • You will receive a payment prompt on your phone
                    </p>
                    <Button 
                      onClick={() => handlePayment('M-Pesa')} 
                      className="w-full"
                      disabled={loading || !amount}
                    >
                      {loading ? 'Processing...' : 'Pay with M-Pesa'}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="card" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Transaction fee: 2.5% • Secure payment processing
                  </p>
                  <Button 
                    onClick={() => handlePayment('Card')} 
                    className="w-full"
                    disabled={loading || !amount}
                  >
                    {loading ? 'Processing...' : 'Pay with Card'}
                  </Button>
                </TabsContent>

                <TabsContent value="bank" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="bank-account">Bank Account Number</Label>
                      <Input id="bank-account" placeholder="1234567890" />
                    </div>
                    <div>
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input id="bank-name" placeholder="Select your bank" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No transaction fee • Processing time: 1-3 business days
                    </p>
                    <Button 
                      onClick={() => handlePayment('Bank Transfer')} 
                      className="w-full"
                      disabled={loading || !amount}
                    >
                      {loading ? 'Processing...' : 'Pay via Bank Transfer'}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Payment History
            </CardTitle>
            <CardDescription>Your recent payment transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-medium">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.method}</p>
                  <Badge 
                    variant={payment.status === 'Completed' ? 'success' : 'secondary'}
                    className="text-xs"
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}