
import { ArrowLeft, Sun, Moon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import MobileLayout from '@/components/MobileLayout';

const Settings = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      description: 'Always use light theme',
      icon: Sun
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Always use dark theme',
      icon: Moon
    },
    {
      value: 'auto',
      label: 'Auto',
      description: 'Follow day/night cycle (6 AM - 6 PM light)',
      icon: Clock
    }
  ];

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your Deal Blaster experience
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preferences</CardTitle>
            <CardDescription>
              Choose how the app should look
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <div 
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    theme === option.value 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setTheme(option.value as any)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-5 w-5 ${
                      theme === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {option.description}
                      </div>
                    </div>
                    {theme === option.value && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Version</span>
                <span>2.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Build</span>
                <span>Mobile-First</span>
              </div>
              <div className="flex justify-between">
                <span>Features</span>
                <span>AI-Powered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default Settings;
