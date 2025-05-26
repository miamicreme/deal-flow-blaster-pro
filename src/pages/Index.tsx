
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Mail, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Deal Blaster
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate platform for real estate wholesalers to create professional deal landing pages, manage buyer lists, and blast targeted emails to close more deals faster.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Scale Your Wholesale Business
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Home className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Deal Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Create and manage your property deals with detailed information, photos, and financial data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <CardTitle>Buyer Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Build and organize your buyer list with preferences, budgets, and contact information.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Email Blasting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Send targeted email campaigns to your buyer list with professional deal presentations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-red-600" />
                <CardTitle>Landing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Generate professional landing pages for each deal to share with potential buyers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Wholesale Business?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of successful wholesalers who use Deal Blaster to streamline their operations and close more deals.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={() => navigate('/dashboard')}
          >
            Start Building Your Deal Pipeline
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
