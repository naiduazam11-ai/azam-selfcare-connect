import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  Settings,
  FileText,
  HelpCircle,
  Activity,
  BookOpen,
  RefreshCw,
  UserPlus,
  Tags,
} from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Account Details", url: "/account", icon: FileText },
  { title: "Payment", url: "/payment", icon: CreditCard },
  { title: "Plan Change", url: "/plans", icon: Settings },
  { title: "Service Request", url: "/service-request", icon: HelpCircle },
  { title: "Knowledge Base", url: "/knowledge-base", icon: BookOpen },
  { title: "Retrack", url: "/retrack", icon: RefreshCw },
  { title: "Ledger", url: "/ledger", icon: Activity },
  { title: "Add Subscription", url: "/add-subscription", icon: UserPlus },
  { title: "Promo Offers", url: "/offers", icon: Tags },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.url}
                to={item.url}
                className={({ isActive: navIsActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    navIsActive || isActive(item.url)
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}