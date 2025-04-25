
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from '@/providers/ThemeProvider';

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>
            Customize the appearance of your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Mode</h3>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
