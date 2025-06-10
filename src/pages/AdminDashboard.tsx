
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  Mail, 
  Settings,
  LogOut,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useDeals } from '@/hooks/useDeals';
import { useBuyers } from '@/hooks/useBuyers';

const AdminDashboard = () => {
  const { isAdmin, adminUser, loading, adminLogout } = useAdmin();
  const { deals } = useDeals();
  const { buyers } = useBuyers();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  const statsCards = [
    {
      title: 'Total Deals',
      value: deals.length,
      description: 'Properties in system',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Total Buyers',
      value: buyers.length,
      description: 'Registered buyers',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Active Markets',
      value: '3',
      description: 'Scraping locations',
      icon: Globe,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      description: 'Deal to buyer ratio',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Markets',
      description: 'Configure scraping locations and schedules',
      icon: Globe,
      action: () => navigate('/admin/markets')
    },
    {
      title: 'View Analytics',
      description: 'Performance metrics and reports',
      icon: BarChart3,
      action: () => navigate('/admin/analytics')
    },
    {
      title: 'Email Campaigns',
      description: 'Manage bulk email campaigns',
      icon: Mail,
      action: () => navigate('/admin/campaigns')
    },
    {
      title: 'System Settings',
      description: 'API keys and configurations',
      icon: Settings,
      action: () => navigate('/admin/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  OfferRocket Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {adminUser?.full_name || adminUser?.email}
                </p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <action.icon className="h-5 w-5" />
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest system activity and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New deal imported</p>
                  <p className="text-xs text-gray-500">123 Main St - 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New buyer registered</p>
                  <p className="text-xs text-gray-500">john.doe@email.com - 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Email campaign sent</p>
                  <p className="text-xs text-gray-500">Weekly deals update - 1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
