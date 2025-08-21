import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  UserPlus, 
  Tv, 
  Crown, 
  Check,
  Star,
  Gift
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddSubscriptionSection() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    location: "",
    smartCardNumber: ""
  });

  const packages = [
    {
      id: "basic",
      name: "Basic Package",
      price: "TZS 25,000",
      channels: "60+",
      features: [
        "Local Channels",
        "News & Current Affairs", 
        "Basic Entertainment",
        "Educational Content"
      ],
      popular: false,
      discount: null
    },
    {
      id: "standard", 
      name: "Standard Package",
      price: "TZS 35,000",
      channels: "90+",
      features: [
        "All Basic Channels",
        "Sports Channels",
        "Documentary Channels", 
        "Music Channels",
        "Kids Content"
      ],
      popular: true,
      discount: "Save 15% for first 3 months"
    },
    {
      id: "premium",
      name: "Premium Package", 
      price: "TZS 45,000",
      channels: "120+",
      features: [
        "All Standard Channels",
        "HD Channels",
        "Movie Channels",
        "International Channels",
        "Premium Sports"
      ],
      popular: false,
      discount: "Free installation"
    },
    {
      id: "ultimate",
      name: "Ultimate Package",
      price: "TZS 65,000", 
      channels: "180+",
      features: [
        "All Premium Channels",
        "4K Ultra HD Channels",
        "Exclusive Sports Content",
        "Premium Movie Collection",
        "International Premium"
      ],
      popular: false,
      discount: "3 months free trial"
    }
  ];

  const newCustomerBenefits = [
    "Free STB installation and setup",
    "Free smart card activation", 
    "30-day money back guarantee",
    "24/7 customer support",
    "Mobile app access included"
  ];

  const handleAddSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !formData.customerName || !formData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select a package.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Subscription Added Successfully!",
        description: `${formData.customerName}'s subscription has been created. Installation will be scheduled within 24 hours.`,
      });
      
      // Reset form
      setFormData({
        customerName: "",
        phoneNumber: "",
        location: "",
        smartCardNumber: ""
      });
      setSelectedPackage("");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* New Customer Benefits */}
      <Card className="bg-gradient-secondary">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-primary" />
            New Customer Benefits
          </CardTitle>
          <CardDescription>
            Special offers and benefits for new Azam TV subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newCustomerBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                <Check className="h-4 w-4 text-success flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Customer Information
            </CardTitle>
            <CardDescription>Enter the new customer's details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSubscription} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  placeholder="Enter full name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+255 123 456 789"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Installation Address</Label>
                <Input
                  id="location"
                  placeholder="Enter installation address"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smartCard">Smart Card Number (Optional)</Label>
                <Input
                  id="smartCard"
                  placeholder="If customer already has smart card"
                  value={formData.smartCardNumber}
                  onChange={(e) => setFormData({...formData, smartCardNumber: e.target.value})}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading || !selectedPackage}
                className="w-full"
              >
                {loading ? "Creating Subscription..." : "Add Subscription"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tv className="h-5 w-5" />
              Select Package
            </CardTitle>
            <CardDescription>Choose the best package for the new customer</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
              <div className="grid gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="relative">
                    <Label
                      htmlFor={pkg.id}
                      className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPackage === pkg.id 
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem 
                          value={pkg.id} 
                          id={pkg.id}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{pkg.name}</h3>
                            {pkg.popular && (
                              <Badge className="bg-warning text-warning-foreground">
                                <Crown className="h-3 w-3 mr-1" />
                                Most Popular
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                                <span className="text-sm text-muted-foreground">/month</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{pkg.channels} channels</p>
                            </div>
                            
                            {pkg.discount && (
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-warning" />
                                <span className="text-sm font-medium text-success">
                                  {pkg.discount}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {pkg.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Check className="h-3 w-3 text-success flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Installation Process */}
      <Card>
        <CardHeader>
          <CardTitle>Installation Process</CardTitle>
          <CardDescription>What happens after subscription creation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">
                1
              </div>
              <h4 className="font-medium">Subscription Created</h4>
              <p className="text-sm text-muted-foreground">Customer account is set up</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">
                2
              </div>
              <h4 className="font-medium">Installation Scheduled</h4>
              <p className="text-sm text-muted-foreground">Technician visit arranged</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mx-auto">
                3
              </div>
              <h4 className="font-medium">Equipment Setup</h4>
              <p className="text-sm text-muted-foreground">STB and dish installation</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success text-success-foreground rounded-full flex items-center justify-center font-bold mx-auto">
                4
              </div>
              <h4 className="font-medium">Service Activated</h4>
              <p className="text-sm text-muted-foreground">Customer can start viewing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}