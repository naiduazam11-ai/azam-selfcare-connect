import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Phone, 
  Tv, 
  Signal, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  FileText,
  Settings,
  Headphones,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Shield,
  Star
} from "lucide-react";

export function AccountOverview() {
  // Enhanced mock data
  const accountData = {
    customerName: "John Doe",
    accountId: "AZ123456789",
    phoneNumber: "+255 789 123 456",
    currentPlan: "Premium HD Package",
    balance: "TZS 25,500",
    expiryDate: "2024-12-15",
    status: "Active",
    smartCardNumber: "SC789456123",
    stbStatus: "Online",
    signalStrength: 92,
    lastPayment: "2024-01-15",
    contractStartDate: "2023-06-01",
    address: "Plot 123, Msimbazi Street, Dar es Salaam",
    email: "johndoe@email.com",
    monthsRemaining: 11,
    dataUsage: 65,
    activeChannels: 156,
    totalChannels: 200,
    connectionUptime: "99.8%"
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'suspended': return 'warning';
      case 'inactive': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Section */}
      <div className="relative bg-gradient-hero rounded-3xl p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-3">Welcome back, {accountData.customerName.split(' ')[0]}!</h1>
              <p className="text-white/80 text-xl">Your Azam TV experience dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white/60 text-sm">Account Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-lg">{accountData.status}</span>
                </div>
              </div>
              <Avatar className="h-20 w-20 border-4 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                  {accountData.customerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-sm">Account ID</p>
                <User className="h-5 w-5 text-white/40" />
              </div>
              <p className="font-bold text-xl">{accountData.accountId}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-sm">Current Plan</p>
                <Star className="h-5 w-5 text-white/40" />
              </div>
              <p className="font-bold text-xl">{accountData.currentPlan}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-sm">Balance</p>
                <DollarSign className="h-5 w-5 text-white/40" />
              </div>
              <p className="font-bold text-3xl">{accountData.balance}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/60 text-sm">Valid Until</p>
                <Calendar className="h-5 w-5 text-white/40" />
              </div>
              <p className="font-bold text-xl">{new Date(accountData.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-10 w-24 h-24 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-primary group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Smart Card</p>
                <p className="text-2xl font-bold text-foreground">{accountData.smartCardNumber}</p>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <p className="text-xs text-success font-medium">Active Device</p>
                </div>
              </div>
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-accent group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Channels</p>
                <p className="text-2xl font-bold text-foreground">{accountData.activeChannels}/{accountData.totalChannels}</p>
                <div className="flex items-center space-x-1">
                  <Globe className="h-3 w-3 text-accent" />
                  <p className="text-xs text-accent font-medium">Premium Access</p>
                </div>
              </div>
              <div className="p-4 bg-accent/10 rounded-2xl group-hover:bg-accent/20 transition-colors">
                <Tv className="h-8 w-8 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-success group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Signal Quality</p>
                <p className="text-2xl font-bold text-foreground">{accountData.signalStrength}%</p>
                <Progress value={accountData.signalStrength} className="h-2 bg-muted" />
              </div>
              <div className="p-4 bg-success/10 rounded-2xl group-hover:bg-success/20 transition-colors">
                <Signal className="h-8 w-8 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-warning group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold text-foreground">{accountData.connectionUptime}</p>
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-success" />
                  <p className="text-xs text-success font-medium">Excellent</p>
                </div>
              </div>
              <div className="p-4 bg-warning/10 rounded-2xl group-hover:bg-warning/20 transition-colors">
                <Activity className="h-8 w-8 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="bg-gradient-secondary border-0 shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-2xl">
                <Zap className="mr-3 h-7 w-7 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Access your most used services instantly
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Button 
              variant="outline" 
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-primary/25 hover:shadow-lg transition-all duration-300 group"
            >
              <DollarSign className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-sm font-semibold">Make Payment</span>
                <p className="text-xs opacity-70">Pay bills instantly</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-accent/25 hover:shadow-lg transition-all duration-300 group"
            >
              <TrendingUp className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-sm font-semibold">Upgrade Plan</span>
                <p className="text-xs opacity-70">Get more channels</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-success hover:text-success-foreground hover:border-success hover:shadow-success/25 hover:shadow-lg transition-all duration-300 group"
            >
              <Headphones className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-sm font-semibold">Get Support</span>
                <p className="text-xs opacity-70">24/7 assistance</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-warning hover:text-warning-foreground hover:border-warning hover:shadow-warning/25 hover:shadow-lg transition-all duration-300 group"
            >
              <FileText className="h-10 w-10 group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <span className="text-sm font-semibold">View Bills</span>
                <p className="text-xs opacity-70">Payment history</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <User className="mr-3 h-6 w-6 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Your account and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                <span className="text-sm font-bold text-foreground">{accountData.customerName}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
                <span className="text-sm font-bold text-foreground">{accountData.phoneNumber}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                <span className="text-sm font-bold text-foreground">{accountData.email}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Contract Start</span>
                <span className="text-sm font-bold text-foreground">{new Date(accountData.contractStartDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm font-medium text-muted-foreground mb-2">Service Address</p>
              <p className="text-sm font-bold text-foreground">{accountData.address}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center text-xl">
              <Activity className="mr-3 h-6 w-6 text-accent" />
              Service Overview
            </CardTitle>
            <CardDescription>Current package and service status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center p-4 bg-accent/5 rounded-xl border border-accent/20">
                <span className="text-sm font-medium text-muted-foreground">Current Package</span>
                <Badge variant="success" className="font-bold text-sm px-3 py-1">{accountData.currentPlan}</Badge>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary/5 rounded-xl border border-primary/20">
                <span className="text-sm font-medium text-muted-foreground">Account Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <Badge variant={getStatusColor(accountData.status)} className="font-bold text-sm px-3 py-1">
                    {accountData.status}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">Smart Card No.</span>
                <span className="text-sm font-bold text-foreground font-mono">{accountData.smartCardNumber}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors">
                <span className="text-sm font-medium text-muted-foreground">STB Device</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-bold text-foreground">{accountData.stbStatus}</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-primary rounded-2xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Package Expires On</p>
                  <p className="font-bold text-2xl">{new Date(accountData.expiryDate).toLocaleDateString()}</p>
                  <p className="text-white/60 text-xs mt-1">{accountData.monthsRemaining} months remaining</p>
                </div>
                <Clock className="h-10 w-10 text-white/60" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}