import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Wrench,
  Tv,
  CreditCard,
  HelpCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ServiceRequestForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    priority: 'medium',
    description: '',
    smartCardNumber: '',
  });

  const categories = [
    { value: 'technical', label: 'Technical Issues', icon: Wrench },
    { value: 'billing', label: 'Billing & Payment', icon: CreditCard },
    { value: 'hardware', label: 'Hardware Problems', icon: Tv },
    { value: 'general', label: 'General Inquiry', icon: HelpCircle },
  ];

  const subcategories = {
    technical: ['Signal Issues', 'Channel Problems', 'Audio/Video Quality', 'Connection Issues'],
    billing: ['Payment Failed', 'Billing Dispute', 'Invoice Query', 'Refund Request'],
    hardware: ['STB Not Working', 'Remote Control Issues', 'Smart Card Problems', 'Cable Issues'],
    general: ['Account Information', 'Service Information', 'Feedback', 'Other'],
  };

  const recentTickets = [
    {
      id: 'SR001234',
      category: 'Technical Issues',
      description: 'Signal reception problems',
      status: 'In Progress',
      createdDate: '2024-08-15',
      priority: 'High'
    },
    {
      id: 'SR001235',
      category: 'Billing & Payment',
      description: 'Payment not reflected',
      status: 'Resolved',
      createdDate: '2024-08-10',
      priority: 'Medium'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.subcategory || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate ticket creation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Service Request Created",
        description: "Your ticket SR001236 has been created successfully.",
      });
      setFormData({
        category: '',
        subcategory: '',
        priority: 'medium',
        description: '',
        smartCardNumber: '',
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in progress': return <Clock className="h-4 w-4 text-warning" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
      default: return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Request Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Create Service Request</CardTitle>
            <CardDescription>
              Submit a service request for any issues or inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({...formData, category: value, subcategory: ''})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="h-4 w-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subcategory">Subcategory *</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) => setFormData({...formData, subcategory: value})}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map((subcat) => (
                        <SelectItem key={subcat} value={subcat}>
                          {subcat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({...formData, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="smartcard">Smart Card Number</Label>
                  <Input
                    id="smartcard"
                    placeholder="Enter smart card number (if applicable)"
                    value={formData.smartCardNumber}
                    onChange={(e) => setFormData({...formData, smartCardNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your issue or inquiry in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={5}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Creating Request..." : "Submit Service Request"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Help & Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Help</CardTitle>
            <CardDescription>Common solutions and guidelines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Signal Issues?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Try the Retrack option first to refresh your STB connection.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Payment Problems?</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Check your payment history and try making a new payment.
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">Response Time</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  High priority: 4 hours<br />
                  Medium priority: 24 hours<br />
                  Low priority: 72 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Service Requests
          </CardTitle>
          <CardDescription>Track your service requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(ticket.status)}
                  <div>
                    <p className="font-medium">#{ticket.id}</p>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex gap-2">
                    <Badge variant={getPriorityColor(ticket.priority) as any} className="text-xs">
                      {ticket.priority}
                    </Badge>
                    <Badge variant={ticket.status === 'Resolved' ? 'success' : 'secondary'} className="text-xs">
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{ticket.createdDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}