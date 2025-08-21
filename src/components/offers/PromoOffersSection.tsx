import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gift, 
  Star, 
  Clock, 
  Percent,
  Crown,
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PromoOffersSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const activeOffers = [
    {
      id: "PREMIUM50",
      title: "50% Off Premium Package",
      description: "Get 50% discount on Premium Package for the first 3 months",
      discount: "50% OFF",
      validUntil: "2024-09-30",
      terms: "Valid for new Premium subscriptions only. Auto-renews at regular price.",
      category: "upgrade",
      eligible: true,
      savings: "TZS 67,500"
    },
    {
      id: "LOYAL2024", 
      title: "Loyalty Bonus - 2 Months Free",
      description: "As a valued customer, enjoy 2 months of free service",
      discount: "2 Months Free",
      validUntil: "2024-12-31",
      terms: "Available to customers with 12+ months of continuous service.",
      category: "loyalty",
      eligible: true,
      savings: "TZS 90,000"
    },
    {
      id: "SPORTS2024",
      title: "Free Sports Pack Upgrade", 
      description: "Add premium sports channels to your package at no extra cost",
      discount: "Free Upgrade",
      validUntil: "2024-10-15",
      terms: "Available for Standard and Premium package holders.",
      category: "addon",
      eligible: false,
      savings: "TZS 15,000",
      reason: "Requires Standard or Premium package"
    }
  ];

  const upcomingOffers = [
    {
      id: "BLACK2024",
      title: "Black Friday Special",
      description: "Massive discounts on all packages - Coming Soon!",
      discount: "Up to 60% OFF",
      startDate: "2024-11-25",
      category: "seasonal",
      estimatedSavings: "Up to TZS 120,000"
    },
    {
      id: "NEW2025", 
      title: "New Year Mega Deal",
      description: "Start the new year with our biggest savings",
      discount: "3 Months Free",
      startDate: "2025-01-01", 
      category: "seasonal",
      estimatedSavings: "TZS 135,000"
    }
  ];

  const claimedOffers = [
    {
      id: "WELCOME2024",
      title: "Welcome Package Discount",
      description: "15% off first month subscription",
      claimedDate: "2024-06-15",
      savings: "TZS 6,750",
      status: "Used"
    },
    {
      id: "REFER2024",
      title: "Referral Bonus",
      description: "Bonus credit for referring a friend", 
      claimedDate: "2024-07-20",
      savings: "TZS 10,000",
      status: "Applied"
    }
  ];

  const handleClaimOffer = async (offerId: string) => {
    setLoading(offerId);
    
    setTimeout(() => {
      setLoading(null);
      const offer = activeOffers.find(o => o.id === offerId);
      toast({
        title: "Offer Claimed Successfully!",
        description: `${offer?.title} has been applied to your account.`,
      });
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'upgrade': return <Crown className="h-4 w-4" />;
      case 'loyalty': return <Star className="h-4 w-4" />;
      case 'addon': return <Gift className="h-4 w-4" />;
      case 'seasonal': return <Calendar className="h-4 w-4" />;
      default: return <Percent className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'upgrade': return 'warning';
      case 'loyalty': return 'success'; 
      case 'addon': return 'secondary';
      case 'seasonal': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Featured Offer */}
      <Card className="bg-gradient-hero text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Gift className="h-8 w-8" />
                Special Offers for You!
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Exclusive deals and promotions based on your account
              </CardDescription>
            </div>
            <Badge className="bg-white/20 text-white border-white/20 text-lg px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              VIP Customer
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            As a valued Premium customer, you have access to exclusive offers and early access to new promotions!
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Offers</TabsTrigger>
          <TabsTrigger value="upcoming">Coming Soon</TabsTrigger>
          <TabsTrigger value="history">Offer History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {activeOffers.map((offer) => (
              <Card key={offer.id} className={`${!offer.eligible ? 'opacity-75' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{offer.title}</h3>
                        <Badge variant={getCategoryColor(offer.category) as any} className="text-xs">
                          {getCategoryIcon(offer.category)}
                          <span className="ml-1 capitalize">{offer.category}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Until {offer.validUntil}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{offer.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Your Savings</p>
                          <p className="text-2xl font-bold text-success">{offer.savings}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Discount</p>
                          <p className="text-2xl font-bold text-primary">{offer.discount}</p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground border-l-2 border-muted pl-3">
                        {offer.terms}
                      </p>
                      
                      {!offer.eligible && (
                        <div className="flex items-center gap-2 mt-3 p-2 bg-warning/10 rounded text-warning text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {offer.reason}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6">
                      <Button 
                        onClick={() => handleClaimOffer(offer.id)}
                        disabled={!offer.eligible || loading === offer.id}
                        variant={offer.eligible ? "default" : "secondary"}
                        className="whitespace-nowrap"
                      >
                        {loading === offer.id ? (
                          "Claiming..."
                        ) : offer.eligible ? (
                          "Claim Offer"
                        ) : (
                          "Not Eligible"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingOffers.map((offer) => (
              <Card key={offer.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{offer.title}</h3>
                        <Badge variant={getCategoryColor(offer.category) as any} className="text-xs">
                          {getCategoryIcon(offer.category)}
                          <span className="ml-1 capitalize">{offer.category}</span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          Starts {offer.startDate}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{offer.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Estimated Savings</p>
                          <p className="text-2xl font-bold text-success">{offer.estimatedSavings}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Discount</p>
                          <p className="text-2xl font-bold text-primary">{offer.discount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <Button variant="outline" disabled>
                        <Clock className="h-4 w-4 mr-2" />
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Previously Claimed Offers
              </CardTitle>
              <CardDescription>Your offer redemption history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimedOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">{offer.title}</p>
                        <p className="text-sm text-muted-foreground">{offer.description}</p>
                        <p className="text-xs text-muted-foreground">Claimed on {offer.claimedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-success">{offer.savings}</p>
                      <Badge variant="success" className="text-xs">
                        {offer.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Newsletter Signup */}
      <Card className="bg-muted">
        <CardContent className="p-6">
          <div className="text-center">
            <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Never Miss an Offer!</h3>
            <p className="text-muted-foreground mb-4">
              Get notified about new promotions and exclusive deals via SMS or email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>Enable Notifications</Button>
              <Button variant="outline">Manage Preferences</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}