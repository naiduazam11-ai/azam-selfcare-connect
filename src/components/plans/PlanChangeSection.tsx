import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Crown, 
  Tv, 
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PlanChangeSection() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [changeType, setChangeType] = useState<"immediate" | "scheduled">("immediate");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currentPlan = {
    id: "premium",
    name: "Premium Package",
    price: "TZS 45,000",
    channels: 120,
    features: ["HD Channels", "Sports Pack", "Movie Pack", "International Channels"]
  };

  const availablePlans = [
    {
      id: "basic",
      name: "Basic Package",
      price: "TZS 25,000",
      channels: 60,
      features: ["Local Channels", "News Channels", "Basic Entertainment"],
      popular: false,
      savings: "Save TZS 20,000/month"
    },
    {
      id: "standard",
      name: "Standard Package", 
      price: "TZS 35,000",
      channels: 90,
      features: ["Basic Package", "Sports Channels", "Documentary Channels"],
      popular: true,
      savings: "Save TZS 10,000/month"
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "TZS 45,000", 
      channels: 120,
      features: ["Standard Package", "HD Channels", "Movie Pack", "International"],
      popular: false,
      current: true
    },
    {
      id: "ultimate",
      name: "Ultimate Package",
      price: "TZS 65,000",
      channels: 180,
      features: ["Premium Package", "4K Channels", "Premium Sports", "Exclusive Content"],
      popular: false,
      upgrade: "Additional TZS 20,000/month"
    }
  ];

  const planHistory = [
    {
      date: "2024-01-15",
      from: "Standard Package",
      to: "Premium Package",
      reason: "Upgrade",
      amount: "TZS 10,000"
    },
    {
      date: "2023-08-20",
      from: "Basic Package", 
      to: "Standard Package",
      reason: "Upgrade",
      amount: "TZS 10,000"
    }
  ];

  const handlePlanChange = async () => {
    if (!selectedPlan) {
      toast({
        title: "No Plan Selected",
        description: "Please select a plan to continue.",
        variant: "destructive"
      });
      return;
    }

    const plan = availablePlans.find(p => p.id === selectedPlan);
    if (!plan) return;

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Plan Change Requested",
        description: `Your plan change to ${plan.name} has been ${changeType === "immediate" ? "processed" : "scheduled"}.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Info */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{currentPlan.name}</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Your current subscription plan
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
              Current Plan
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Monthly Fee</p>
              <p className="text-2xl font-bold">{currentPlan.price}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Channels</p>
              <p className="text-2xl font-bold">{currentPlan.channels}+</p>
            </div>
            <div>
              <p className="text-sm font-medium">Next Billing</p>
              <p className="text-lg font-semibold">Sept 15, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="change-plan" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="change-plan">Change Plan</TabsTrigger>
          <TabsTrigger value="history">Plan History</TabsTrigger>
        </TabsList>

        <TabsContent value="change-plan" className="space-y-6">
          {/* Plan Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Select a new plan that fits your viewing needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePlans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <Label
                        htmlFor={plan.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedPlan === plan.id 
                            ? "border-primary bg-primary/5" 
                            : "border-border hover:border-primary/50"
                        } ${plan.current ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <div className="flex items-start space-x-3">
                          <RadioGroupItem 
                            value={plan.id} 
                            id={plan.id}
                            disabled={plan.current}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{plan.name}</h3>
                              {plan.popular && (
                                <Badge variant="warning" className="text-xs">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                              {plan.current && (
                                <Badge variant="secondary" className="text-xs">
                                  Current
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">{plan.price}</span>
                                <span className="text-sm text-muted-foreground">
                                  {plan.channels}+ channels
                                </span>
                              </div>
                              {(plan.savings || plan.upgrade) && (
                                <p className={`text-sm font-medium ${
                                  plan.savings ? "text-success" : "text-warning"
                                }`}>
                                  {plan.savings || plan.upgrade}
                                </p>
                              )}
                              <ul className="space-y-1">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm">
                                    <Check className="h-3 w-3 text-success" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
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

          {/* Change Options */}
          {selectedPlan && (
            <Card>
              <CardHeader>
                <CardTitle>Plan Change Options</CardTitle>
                <CardDescription>Choose when to apply the plan change</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={changeType} onValueChange={(value: any) => setChangeType(value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Immediate Change</p>
                          <p className="text-sm text-muted-foreground">
                            Apply changes now (prorated billing)
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <Label htmlFor="scheduled" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <p className="font-medium">Next Billing Cycle</p>
                          <p className="text-sm text-muted-foreground">
                            Apply changes on September 15, 2024
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">Important Notes:</p>
                    <ul className="mt-2 space-y-1 text-muted-foreground">
                      <li>• Plan changes require sufficient account balance</li>
                      <li>• Downgrades take effect at next billing cycle</li>
                      <li>• Upgrades can be applied immediately</li>
                    </ul>
                  </div>
                </div>

                <Button onClick={handlePlanChange} disabled={loading} className="w-full">
                  {loading ? "Processing..." : `Confirm Plan Change`}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan Change History</CardTitle>
              <CardDescription>Your previous plan changes and upgrades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planHistory.map((change, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Tv className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{change.from} → {change.to}</p>
                        <p className="text-sm text-muted-foreground">{change.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={change.reason === 'Upgrade' ? 'success' : 'secondary'}>
                        {change.reason}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{change.amount}</p>
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