
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from '@/providers/ThemeProvider';
import { Badge } from '@/components/ui/badge';

const ThemeSettings = () => {
  const { theme, themeColor, setTheme, setThemeColor } = useTheme();

  const colors = [
    { name: 'blue', light: 'bg-theme-blue-light', dark: 'bg-theme-blue-dark' },
    { name: 'red', light: 'bg-theme-red-light', dark: 'bg-theme-red-dark' },
    { name: 'purple', light: 'bg-theme-purple-light', dark: 'bg-theme-purple-dark' },
    { name: 'green', light: 'bg-theme-green-light', dark: 'bg-theme-green-dark' },
  ];

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

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Theme Colors</h3>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <Button
                  key={color.name}
                  variant="outline"
                  onClick={() => setThemeColor(color.name as any)}
                  className={`relative ${
                    themeColor === color.name ? 'ring-2 ring-offset-2' : ''
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${theme === 'light' ? color.light : color.dark}`} />
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2"
                    style={{ display: themeColor === color.name ? 'block' : 'none' }}
                  >
                    ✓
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSettings;
