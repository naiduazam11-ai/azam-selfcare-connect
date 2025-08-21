import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  RefreshCw, 
  Tv, 
  CheckCircle, 
  AlertTriangle, 
  Signal,
  Clock,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RetrackSection() {
  const [retracking, setRetracking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastRetrack, setLastRetrack] = useState("2024-08-10 14:30");
  const { toast } = useToast();

  const stbStatus = {
    smartCardNumber: "9876543210",
    status: "Online",
    signalStrength: 85,
    lastSeen: "2024-08-20 18:45",
    softwareVersion: "v2.1.4",
    uptime: "7 days, 12 hours"
  };

  const retrackHistory = [
    {
      date: "2024-08-10 14:30",
      reason: "Manual Refresh",
      status: "Success",
      duration: "2m 15s"
    },
    {
      date: "2024-08-05 09:15", 
      reason: "Signal Issues",
      status: "Success",
      duration: "1m 45s"
    },
    {
      date: "2024-07-28 16:22",
      reason: "Channel Update",
      status: "Success", 
      duration: "2m 30s"
    }
  ];

  const handleRetrack = async () => {
    setRetracking(true);
    setProgress(0);

    const steps = [
      { message: "Connecting to STB...", progress: 20 },
      { message: "Refreshing authorization...", progress: 40 },
      { message: "Updating channel list...", progress: 60 },
      { message: "Syncing subscription data...", progress: 80 },
      { message: "Finalizing refresh...", progress: 100 }
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(steps[i].progress);
      
      if (i === steps.length - 1) {
        setLastRetrack(new Date().toISOString().slice(0, 16).replace('T', ' '));
        toast({
          title: "STB Refresh Complete",
          description: "Your Set-Top Box has been successfully refreshed.",
        });
      }
    }

    setRetracking(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online': return 'success';
      case 'offline': return 'destructive';
      case 'partial': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* STB Status Card */}
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Tv className="h-8 w-8" />
                Set-Top Box Status
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Smart Card: {stbStatus.smartCardNumber}
              </CardDescription>
            </div>
            <Badge 
              variant={getStatusColor(stbStatus.status) as any}
              className="bg-white/20 text-white border-white/20"
            >
              <Activity className="h-4 w-4 mr-1" />
              {stbStatus.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Signal Strength</p>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">{stbStatus.signalStrength}%</p>
                  <Progress 
                    value={stbStatus.signalStrength} 
                    className="bg-white/20"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Last Seen</p>
                <p className="text-lg font-semibold">{stbStatus.lastSeen}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Software Version</p>
                <p className="text-lg font-semibold">{stbStatus.softwareVersion}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-lg font-semibold">{stbStatus.uptime}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Refresh</p>
                <p className="text-lg font-semibold">{lastRetrack}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retrack Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <RefreshCw className="h-6 w-6" />
              STB Refresh (Retrack)
            </CardTitle>
            <CardDescription>
              Refresh your Set-Top Box to resolve viewing issues and update channel authorization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">When to use STB Refresh:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Channels showing "No Signal" or black screen</li>
                  <li>• After making a payment that's not reflecting</li>
                  <li>• When some channels are not accessible</li>
                  <li>• STB showing outdated subscription information</li>
                </ul>
              </div>

              {retracking && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-sm font-medium">Refreshing STB...</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    This process may take up to 3 minutes. Please do not turn off your STB.
                  </p>
                </div>
              )}

              <Button 
                onClick={handleRetrack} 
                disabled={retracking}
                className="w-full"
                size="lg"
              >
                {retracking ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing STB...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh STB Now
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Diagnostics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Diagnostics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Signal className="h-4 w-4" />
                  <span className="text-sm">Signal Quality</span>
                </div>
                <Badge variant="success" className="text-xs">
                  Excellent
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Connection</span>
                </div>
                <Badge variant="success" className="text-xs">
                  Active
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Authorization</span>
                </div>
                <Badge variant="success" className="text-xs">
                  Valid
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Tv className="h-4 w-4" />
                  <span className="text-sm">STB Health</span>
                </div>
                <Badge variant="success" className="text-xs">
                  Good
                </Badge>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground text-center">
                All systems operational
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refresh History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Refresh History
          </CardTitle>
          <CardDescription>Recent STB refresh activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {retrackHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {entry.status === 'Success' ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{entry.reason}</p>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={entry.status === 'Success' ? 'success' : 'warning'} className="mb-1">
                    {entry.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{entry.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}