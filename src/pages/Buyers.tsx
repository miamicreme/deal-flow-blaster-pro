
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Plus, Mail, Edit, Trash2, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Buyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  maxBudget: number;
  preferences: string;
  created_at: string;
}

const Buyers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [buyers, setBuyers] = useState<Buyer[]>([
    // Sample data - will be replaced with Supabase data
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      location: 'Atlanta, GA',
      maxBudget: 300000,
      preferences: 'Single family homes, 3+ bedrooms',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      location: 'Birmingham, AL',
      maxBudget: 250000,
      preferences: 'Investment properties, fix & flip',
      created_at: '2024-01-20'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newBuyer, setNewBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    maxBudget: '',
    preferences: ''
  });

  const handleAddBuyer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const buyer: Buyer = {
      id: Date.now().toString(),
      name: newBuyer.name,
      email: newBuyer.email,
      phone: newBuyer.phone,
      location: newBuyer.location,
      maxBudget: parseInt(newBuyer.maxBudget),
      preferences: newBuyer.preferences,
      created_at: new Date().toISOString()
    };

    setBuyers(prev => [...prev, buyer]);
    setNewBuyer({ name: '', email: '', phone: '', location: '', maxBudget: '', preferences: '' });
    setShowAddForm(false);
    
    toast({
      title: "Buyer Added",
      description: "New buyer has been added to your list.",
    });
  };

  const handleDeleteBuyer = (id: string) => {
    setBuyers(prev => prev.filter(buyer => buyer.id !== id));
    toast({
      title: "Buyer Removed",
      description: "Buyer has been removed from your list.",
    });
  };

  const handleBulkEmail = () => {
    toast({
      title: "Email Blast Sent",
      description: `Email sent to ${buyers.length} buyers in your list.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Buyer Management</h1>
              <p className="text-gray-600 mt-2">Organize your buyer list and send targeted emails</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
              <Button variant="secondary" onClick={handleBulkEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email All ({buyers.length})
              </Button>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Buyer
              </Button>
            </div>
          </div>
        </div>

        {/* Add Buyer Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Buyer</CardTitle>
              <CardDescription>Enter buyer information to add them to your list</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBuyer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newBuyer.name}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newBuyer.email}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newBuyer.phone}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newBuyer.location}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Atlanta, GA"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxBudget">Max Budget</Label>
                  <Input
                    id="maxBudget"
                    type="number"
                    value={newBuyer.maxBudget}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, maxBudget: e.target.value }))}
                    placeholder="300000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="preferences">Preferences</Label>
                  <Input
                    id="preferences"
                    value={newBuyer.preferences}
                    onChange={(e) => setNewBuyer(prev => ({ ...prev, preferences: e.target.value }))}
                    placeholder="Single family homes, 3+ bedrooms"
                  />
                </div>
                
                <div className="md:col-span-2 flex justify-end space-x-3">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Buyer</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Buyers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {buyers.map((buyer) => (
            <Card key={buyer.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{buyer.name}</CardTitle>
                    <CardDescription>{buyer.email}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteBuyer(buyer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span>{buyer.phone}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span>{buyer.location}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Budget:</span>
                    <span>{formatCurrency(buyer.maxBudget)}</span>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-600">Preferences:</span>
                    <p className="text-sm mt-1">{buyer.preferences}</p>
                  </div>
                  
                  <div className="pt-3">
                    <Button size="sm" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {buyers.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buyers yet</h3>
              <p className="text-gray-600 mb-6">Add buyers to your list to start sending targeted deal emails</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Buyer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buyers;
