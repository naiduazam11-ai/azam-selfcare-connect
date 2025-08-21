import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  HelpCircle, 
  Tv, 
  Signal, 
  CreditCard,
  Settings,
  Play,
  Volume2,
  Wifi,
  RefreshCw
} from "lucide-react";

export function KnowledgeBaseSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { 
      id: "troubleshooting", 
      name: "Troubleshooting", 
      icon: Settings, 
      color: "text-destructive",
      count: 15 
    },
    { 
      id: "setup", 
      name: "Setup & Installation", 
      icon: Tv, 
      color: "text-primary",
      count: 8 
    },
    { 
      id: "billing", 
      name: "Billing & Payment", 
      icon: CreditCard, 
      color: "text-success",
      count: 12 
    },
    { 
      id: "technical", 
      name: "Technical Issues", 
      icon: Signal, 
      color: "text-warning",
      count: 20 
    }
  ];

  const popularArticles = [
    {
      id: 1,
      title: "No Signal on STB - Quick Fix",
      category: "Troubleshooting",
      views: 2450,
      helpful: 95,
      content: "Step-by-step guide to resolve signal issues on your Set-Top Box."
    },
    {
      id: 2,
      title: "How to Reset Your Smart Card",
      category: "Setup & Installation", 
      views: 1890,
      helpful: 92,
      content: "Complete instructions for smart card reset and reactivation."
    },
    {
      id: 3,
      title: "Payment Not Reflecting - What to Do",
      category: "Billing & Payment",
      views: 1650,
      helpful: 89,
      content: "Solutions when your payment doesn't appear in your account."
    }
  ];

  const troubleshootingGuides = [
    {
      category: "Signal Issues",
      icon: Signal,
      items: [
        {
          problem: "No signal detected",
          solution: [
            "Check all cable connections are secure",
            "Verify dish alignment isn't blocked by objects", 
            "Try the Retrack option in your account",
            "Contact support if issue persists"
          ]
        },
        {
          problem: "Weak signal strength",
          solution: [
            "Clean the dish surface from dust/debris",
            "Check for loose coaxial connections",
            "Ensure weather conditions aren't affecting reception",
            "Schedule a technician visit if needed"
          ]
        }
      ]
    },
    {
      category: "Audio/Video Problems", 
      icon: Volume2,
      items: [
        {
          problem: "No sound on channels",
          solution: [
            "Check TV volume and mute settings",
            "Verify audio cables are connected properly",
            "Try changing audio output settings on STB",
            "Restart the Set-Top Box"
          ]
        },
        {
          problem: "Picture freezing/pixelation",
          solution: [
            "Check signal strength (should be above 70%)",
            "Restart your STB by unplugging for 30 seconds",
            "Verify all connections are tight",
            "Update STB software if available"
          ]
        }
      ]
    },
    {
      category: "Remote Control Issues",
      icon: Play,
      items: [
        {
          problem: "Remote not responding",
          solution: [
            "Replace remote batteries with fresh ones",
            "Point remote directly at STB (no obstructions)",
            "Check if remote LED blinks when pressing buttons",
            "Re-pair remote with STB if needed"
          ]
        },
        {
          problem: "Some buttons not working",
          solution: [
            "Clean remote with soft cloth and isopropyl alcohol",
            "Check for stuck buttons",
            "Try using mobile app as alternative remote",
            "Request replacement remote if buttons are damaged"
          ]
        }
      ]
    }
  ];

  const quickFixes = [
    {
      title: "STB Reboot",
      description: "Restart your Set-Top Box",
      steps: ["Unplug power cable", "Wait 30 seconds", "Plug back in", "Wait for startup"]
    },
    {
      title: "Signal Check", 
      description: "Verify signal strength",
      steps: ["Press Menu on remote", "Go to Settings", "Select Signal Info", "Check strength > 70%"]
    },
    {
      title: "Channel Refresh",
      description: "Update channel list",
      steps: ["Press Menu", "Go to Installation", "Select Channel Scan", "Wait for completion"]
    }
  ];

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <category.icon className={`h-6 w-6 ${category.color}`} />
                <div className="flex-1">
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="popular" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="popular">Popular Articles</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="quick-fixes">Quick Fixes</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{article.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{article.content}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{article.views} views</span>
                        <span>{article.helpful}% helpful</span>
                      </div>
                    </div>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-6">
          {troubleshootingGuides.map((guide, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <guide.icon className="h-5 w-5" />
                  {guide.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {guide.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.problem}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal list-inside space-y-2">
                          {item.solution.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="quick-fixes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickFixes.map((fix, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    {fix.title}
                  </CardTitle>
                  <CardDescription>{fix.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {fix.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center gap-3 text-sm">
                        <span className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-bold">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contact Support */}
      <Card className="bg-muted">
        <CardContent className="p-6">
          <div className="text-center">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Still Need Help?</h3>
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>Create Service Request</Button>
              <Button variant="outline">Live Chat</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}