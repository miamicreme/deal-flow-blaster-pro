
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Users, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDeals: 0,
    activeDeals: 0,
    totalBuyers: 0,
    emailsSent: 0
  });

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Deal Blaster</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Your real estate wholesale command center</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <Home className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.totalDeals}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Deals</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Home className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats.activeDeals}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Deals</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{stats.totalBuyers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Buyers</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <Mail className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{stats.emailsSent}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Emails Sent</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/add-property')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5" />
                Add New Property
              </CardTitle>
              <CardDescription>
                Create a deal with AI analysis and validation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/deals')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5" />
                View All Deals
              </CardTitle>
              <CardDescription>
                Manage your property portfolio
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/buyers')}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Manage Buyers
              </CardTitle>
              <CardDescription>
                Organize your buyer list and send emails
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
