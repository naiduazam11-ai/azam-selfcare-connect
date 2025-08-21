import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Phone, CreditCard, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userData: any) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'identifier' | 'otp' | 'credentials'>('identifier');
  const [otp, setOtp] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    identifier: '',
    identifierType: 'phone',
    password: '',
    username: '',
  });

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier) return;

    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      toast({
        title: "OTP Sent",
        description: `Verification code sent to your ${formData.identifierType}.`,
      });
    }, 1000);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "OTP Verified",
        description: "Please enter your login credentials.",
      });
      setStep('credentials');
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;

    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      onLogin({
        name: "John Doe",
        accountId: "AZ123456",
        avatar: "",
      });
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Azam TV</CardTitle>
          <CardDescription>
            {step === 'identifier' && 'Enter your details to access your account'}
            {step === 'otp' && 'Enter the verification code sent to you'}
            {step === 'credentials' && 'Enter your login credentials'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'identifier' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <Tabs value={formData.identifierType} onValueChange={(value) => setFormData({...formData, identifierType: value})}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    Phone
                  </TabsTrigger>
                  <TabsTrigger value="account" className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    Account ID
                  </TabsTrigger>
                  <TabsTrigger value="smartcard" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Smart Card
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="phone">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+255 123 456 789"
                      value={formData.identifier}
                      onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                      required
                    />
                  </div>
                </TabsContent>
                <TabsContent value="account">
                  <div className="space-y-2">
                    <Label htmlFor="account">Account ID</Label>
                    <Input
                      id="account"
                      type="text"
                      placeholder="AZ123456"
                      value={formData.identifier}
                      onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                      required
                    />
                  </div>
                </TabsContent>
                <TabsContent value="smartcard">
                  <div className="space-y-2">
                    <Label htmlFor="smartcard">Smart Card Number</Label>
                    <Input
                      id="smartcard"
                      type="text"
                      placeholder="1234567890"
                      value={formData.identifier}
                      onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send Verification Code"}
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('identifier')}>
                Back to Identifier
              </Button>
            </form>
          )}

          {step === 'credentials' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}