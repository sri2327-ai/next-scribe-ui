
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme } from '@/providers/ThemeProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 animate-entrance">
      <Card className="border-none shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Palette className="h-6 w-6 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription className="text-base">
            Customize the appearance of your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-label">Theme Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className={`flex flex-col items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${theme === 'light' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-transparent hover:border-muted-foreground/30 hover:bg-accent/50'}`}
                onClick={() => setTheme('light')}
              >
                <div className="w-full h-32 bg-[#f8fafc] rounded-md shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-1/3 h-full bg-blue-50 border-r"></div>
                  <div className="w-2/3 p-2">
                    <div className="h-3 w-1/2 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-2 w-1/3 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">Light</span>
                  </div>
                  {theme === 'light' && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
              
              <div 
                className={`flex flex-col items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${theme === 'dark' 
                    ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                    : 'border-transparent hover:border-muted-foreground/30 hover:bg-accent/50'}`}
                onClick={() => setTheme('dark')}
              >
                <div className="w-full h-32 bg-[#1e293b] rounded-md shadow-md flex items-center justify-center overflow-hidden">
                  <div className="w-1/3 h-full bg-slate-800 border-r border-slate-700"></div>
                  <div className="w-2/3 p-2">
                    <div className="h-3 w-1/2 bg-slate-700 rounded mb-2"></div>
                    <div className="h-2 w-3/4 bg-slate-800 rounded mb-2"></div>
                    <div className="h-2 w-1/3 bg-slate-800 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-indigo-400" />
                    <span className="font-medium">Dark</span>
                  </div>
                  {theme === 'dark' && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-label">Text Size</h3>
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" className="rounded-md">
                A<span className="text-xs">A</span>
              </Button>
              <Button variant="default" size="sm" className="rounded-md">
                A<span className="text-base">A</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-md">
                A<span className="text-lg">A</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Changes the text size throughout the application.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
