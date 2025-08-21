import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  CreditCard, 
  HelpCircle, 
  Search,
  DollarSign,
  Tv,
  Clock,
  MessageSquare,
  Shield,
  Zap,
  ChevronDown,
  Menu,
  Home,
  Phone
} from "lucide-react";
import azamLogo from "@/assets/azam-logo.png";

interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

export function Header({ user }: HeaderProps) {
  const [notifications] = useState([
    { id: 1, title: "Payment Successful", message: "Your TZS 25,000 payment has been processed", time: "5 min ago", type: "success" },
    { id: 2, title: "Package Upgrade Available", message: "New Premium Plus package is now available", time: "1 hour ago", type: "info" },
    { id: 3, title: "Service Maintenance", message: "Scheduled maintenance on Jan 25, 2024", time: "2 hours ago", type: "warning" }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/account': return { title: 'Account Overview', subtitle: 'View your account details and status' };
      case '/payment': return { title: 'Payment Center', subtitle: 'Manage payments and billing' };
      case '/service-request': return { title: 'Service Request', subtitle: 'Get help and support' };
      case '/plans': return { title: 'Plan Management', subtitle: 'Change or upgrade your plan' };
      case '/knowledge-base': return { title: 'Knowledge Base', subtitle: 'Help articles and guides' };
      case '/retrack': return { title: 'STB Retrack', subtitle: 'Refresh your set-top box' };
      case '/ledger': return { title: 'Account Ledger', subtitle: 'Transaction history and invoices' };
      case '/add-subscription': return { title: 'Add Subscription', subtitle: 'Subscribe to new packages' };
      case '/offers': return { title: 'Special Offers', subtitle: 'Promotional deals for you' };
      default: return { title: 'Dashboard', subtitle: 'Welcome to your Azam TV portal' };
    }
  };

  const pageInfo = getPageTitle();

  const quickActions = [
    { icon: DollarSign, label: 'Quick Pay', color: 'text-success', bg: 'bg-success/10' },
    { icon: Tv, label: 'Refresh STB', color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Phone, label: 'Call Support', color: 'text-accent', bg: 'bg-accent/10' },
    { icon: MessageSquare, label: 'Live Chat', color: 'text-warning', bg: 'bg-warning/10' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-secondary backdrop-blur-md border-b border-border/50 shadow-lg">
      <div className="container mx-auto px-6">
        {/* Main Header Row */}
        <div className="h-20 flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <img 
                  src={azamLogo} 
                  alt="Azam TV" 
                  className="h-10 w-auto"
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-2xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
                  Azam TV
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Self Care Portal</p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden xl:flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success">Service Active</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-full">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary">Account Secure</span>
              </div>
            </div>
          </div>

          {/* Center - Search & Quick Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts, payments, help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Quick Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2" align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <DropdownMenuItem key={index} className="flex flex-col items-center justify-center h-20 hover:bg-muted/50 cursor-pointer">
                      <div className={`p-3 rounded-full ${action.bg} mb-2`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Enhanced Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-accent/10">
                  <Bell className="h-5 w-5 text-accent" />
                  {notifications.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">You have {notifications.length} unread messages</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'success' ? 'bg-success/10' :
                          notification.type === 'warning' ? 'bg-warning/10' : 'bg-primary/10'
                        }`}>
                          {notification.type === 'success' && <DollarSign className="h-4 w-4 text-success" />}
                          {notification.type === 'warning' && <Clock className="h-4 w-4 text-warning" />}
                          {notification.type === 'info' && <Tv className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-primary">
                    View All Notifications
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            {/* Enhanced User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-auto px-3 rounded-full hover:bg-primary/10">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">Premium Member</p>
                      </div>
                      <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-0" align="end" forceMount>
                  <div className="p-4 bg-gradient-primary text-white">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-white/20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-white/20 text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-bold text-white">{user.name}</p>
                        <p className="text-sm text-white/80">Account ID: AZ123456789</p>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 mt-2">
                          Premium Member
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <DropdownMenuItem className="p-3 hover:bg-primary/5">
                      <User className="mr-3 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-muted-foreground">Update personal information</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-accent/5">
                      <CreditCard className="mr-3 h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium">Payment & Billing</p>
                        <p className="text-xs text-muted-foreground">Manage payment methods</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-muted/50">
                      <Settings className="mr-3 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Account Settings</p>
                        <p className="text-xs text-muted-foreground">Privacy and preferences</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-success/5">
                      <HelpCircle className="mr-3 h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Help & Support</p>
                        <p className="text-xs text-muted-foreground">Get assistance 24/7</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-3 hover:bg-destructive/5 text-destructive">
                      <LogOut className="mr-3 h-5 w-5" />
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs opacity-70">End your current session</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="space-x-3">
                <Button variant="ghost" className="hover:bg-primary/10">Sign In</Button>
                <Button className="bg-gradient-primary hover:opacity-90">Get Started</Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Page Info Bar */}
        <div className="pb-4 border-t border-border/30">
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Home className="h-4 w-4" />
                <span className="text-sm">Dashboard</span>
                <span>/</span>
                <span className="text-sm font-medium text-foreground">{pageInfo.title}</span>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <h2 className="text-xl font-bold text-foreground">{pageInfo.title}</h2>
              <p className="text-sm text-muted-foreground">{pageInfo.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}