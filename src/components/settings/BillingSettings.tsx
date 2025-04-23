
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CreditCard, Loader2 } from "lucide-react";

const BillingSettings = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleConnect = () => {
    if (!apiKey) {
      toast.error("Please enter a Stripe API key");
      return;
    }

    setIsConnecting(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      toast.success("Successfully connected to Stripe");
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiKey('');
    toast.success("Disconnected from Stripe");
  };

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">Billing Settings</h3>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Stripe Integration
          </CardTitle>
          <CardDescription>
            Connect your Stripe account to process payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Stripe API Key</Label>
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)}
                  type="password"
                  placeholder="sk_test_..."
                />
                <p className="text-xs text-muted-foreground">
                  You can find your API keys in the Stripe dashboard under Developers &gt; API keys
                </p>
              </div>
              
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isConnecting ? 'Connecting...' : 'Connect to Stripe'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-md">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Stripe Connected</p>
                  <p className="text-sm">Your practice is ready to accept payments</p>
                </div>
              </div>
              
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
          <CardDescription>
            Configure payment options for your practice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 text-muted-foreground">
            <p>Payment settings will be available after connecting to Stripe.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
