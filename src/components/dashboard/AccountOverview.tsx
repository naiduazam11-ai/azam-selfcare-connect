import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Calendar, 
  Tv, 
  Signal, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

export function AccountOverview() {
  const accountData = {
    accountId: "AZ123456",
    customerName: "John Doe",
    phoneNumber: "+255 123 456 789",
    smartCardNumber: "9876543210",
    currentPlan: "Premium Package",
    planPrice: "TZS 45,000",
    balanceRemaining: "TZS 23,500",
    expiryDate: "2024-09-15",
    status: "Active",
    signalStrength: 85,
    stbStatus: "Online",
    lastPayment: "2024-08-01",
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'expired': return 'destructive';
      case 'suspended': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Account Status Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{accountData.customerName}</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Account ID: {accountData.accountId}
              </CardDescription>
            </div>
            <Badge 
              variant={getStatusColor(accountData.status) as any}
              className="bg-white/20 text-white border-white/20"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              {accountData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Current Plan</p>
              <p className="text-lg font-semibold">{accountData.currentPlan}</p>
              <p className="text-sm text-primary-foreground/80">{accountData.planPrice}/month</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Balance Remaining</p>
              <p className="text-lg font-semibold text-success-foreground">{accountData.balanceRemaining}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Expires On</p>
              <p className="text-lg font-semibold">{accountData.expiryDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Card</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountData.smartCardNumber}</div>
            <p className="text-xs text-muted-foreground">Active Device</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">STB Status</CardTitle>
            <Tv className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{accountData.stbStatus}</div>
            <p className="text-xs text-muted-foreground">Set-Top Box</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signal Strength</CardTitle>
            <Signal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountData.signalStrength}%</div>
            <Progress value={accountData.signalStrength} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountData.lastPayment}</div>
            <p className="text-xs text-muted-foreground">Payment Date</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your account with these quick actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-auto flex-col space-y-2 py-4">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Make Payment</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 py-4">
              <Tv className="h-6 w-6" />
              <span className="text-sm">Refresh STB</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 py-4">
              <AlertCircle className="h-6 w-6" />
              <span className="text-sm">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col space-y-2 py-4">
              <Clock className="h-6 w-6" />
              <span className="text-sm">View History</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Name</p>
                <p className="text-base font-semibold">{accountData.customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                <p className="text-base font-semibold">{accountData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <Badge variant={getStatusColor(accountData.status) as any}>
                  {accountData.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Smart Card Number</p>
                <p className="text-base font-semibold">{accountData.smartCardNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Package</p>
                <p className="text-base font-semibold">{accountData.currentPlan}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Fee</p>
                <p className="text-base font-semibold">{accountData.planPrice}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}