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
  Phone,
  X
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-50 w-full bg-gradient-secondary backdrop-blur-md border-b border-border/50 shadow-lg">
      {/* Main Header Row */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="h-16 sm:h-18 md:h-20 flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="p-1.5 sm:p-2 bg-white rounded-lg sm:rounded-xl shadow-sm flex-shrink-0">
                <img 
                  src={azamLogo} 
                  alt="Azam TV" 
                  className="h-6 w-auto sm:h-8 md:h-10"
                />
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent truncate">
                  Azam TV
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium truncate">Self Care Portal</p>
              </div>
            </div>

            {/* Status Indicators - Hidden on mobile */}
            <div className="hidden lg:flex xl:flex items-center space-x-3 2xl:space-x-4">
              <div className="flex items-center space-x-2 px-2 xl:px-3 py-1.5 xl:py-2 bg-success/10 rounded-full">
                <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-success whitespace-nowrap">Service Active</span>
              </div>
              <div className="flex items-center space-x-2 px-2 xl:px-3 py-1.5 xl:py-2 bg-primary/10 rounded-full">
                <Shield className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium text-primary whitespace-nowrap">Account Secure</span>
              </div>
            </div>
          </div>

          {/* Center - Search (Hidden on mobile, shown on tablet+) */}
          <div className="hidden md:flex items-center flex-1 max-w-md lg:max-w-lg xl:max-w-xl mx-4 lg:mx-6 xl:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts, payments, help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Quick Actions Dropdown - Hidden on small screens */}
            <div className="hidden sm:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
                    <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
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
            </div>

            {/* Enhanced Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-accent/10">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  {notifications.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-6 sm:w-6 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 sm:w-80 p-0" align="end">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-sm text-muted-foreground">You have {notifications.length} unread messages</p>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full flex-shrink-0 ${
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
                  <Button variant="ghost" className="relative h-10 sm:h-12 w-auto px-2 sm:px-3 rounded-full hover:bg-primary/10">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-primary/20">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block text-left min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">Premium Member</p>
                      </div>
                      <ChevronDown className="hidden lg:block h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72 p-0" align="end" forceMount>
                  <div className="p-4 bg-gradient-primary text-white">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 border-2 border-white/20 flex-shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-white/20 text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-lg font-bold text-white truncate">{user.name}</p>
                        <p className="text-sm text-white/80 truncate">Account ID: AZ123456789</p>
                        <Badge variant="secondary" className="bg-white/20 text-white border-0 mt-2">
                          Premium Member
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <DropdownMenuItem className="p-3 hover:bg-primary/5">
                      <User className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-muted-foreground">Update personal information</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-accent/5">
                      <CreditCard className="mr-3 h-5 w-5 text-accent flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">Payment & Billing</p>
                        <p className="text-xs text-muted-foreground">Manage payment methods</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-muted/50">
                      <Settings className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">Account Settings</p>
                        <p className="text-xs text-muted-foreground">Privacy and preferences</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 hover:bg-success/5">
                      <HelpCircle className="mr-3 h-5 w-5 text-success flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">Help & Support</p>
                        <p className="text-xs text-muted-foreground">Get assistance 24/7</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-3 hover:bg-destructive/5 text-destructive">
                      <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs opacity-70">End your current session</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2 sm:space-x-3">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-primary/10">Sign In</Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">Get Started</Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Page Info Bar */}
        <div className="hidden sm:block pb-3 md:pb-4 border-t border-border/30">
          <div className="flex items-center justify-between pt-3 md:pt-4">
            <div className="flex items-center space-x-3 md:space-x-4 min-w-0">
              <div className="flex items-center space-x-2 text-muted-foreground min-w-0">
                <Home className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">Dashboard</span>
                <span>/</span>
                <span className="text-xs md:text-sm font-medium text-foreground truncate">{pageInfo.title}</span>
              </div>
            </div>
            <div className="hidden lg:block text-right min-w-0">
              <h2 className="text-lg xl:text-xl font-bold text-foreground truncate">{pageInfo.title}</h2>
              <p className="text-sm text-muted-foreground truncate">{pageInfo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg z-40">
            <div className="p-4 space-y-4">
              {/* Mobile Status Indicators */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-success">Service Active</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-full">
                  <Shield className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-primary">Account Secure</span>
                </div>
              </div>

              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <Button key={index} variant="outline" className="h-16 flex flex-col items-center justify-center space-y-2">
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                    <span className="text-xs font-medium">{action.label}</span>
                  </Button>
                ))}
              </div>

              {/* Mobile Page Info */}
              <div className="pt-4 border-t border-border/30">
                <h2 className="text-lg font-bold text-foreground">{pageInfo.title}</h2>
                <p className="text-sm text-muted-foreground">{pageInfo.subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}