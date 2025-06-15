import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Upload, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DealAnalyzer from '@/components/DealAnalyzer';

const CreateDeal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    price: '',
    arv: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    yearBuilt: '',
    lotSize: '',
    propertyType: 'Single Family',
    images: [] as File[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Integrate with Supabase to save deal
      console.log('Deal data:', formData);
      
      toast({
        title: "Deal Created Successfully!",
        description: "Your deal has been saved and is ready for promotion.",
      });
      
      navigate('/deals');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Deal</h1>
          <p className="text-gray-600 mt-2">Add property details and run comprehensive analysis</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="analysis">Deal Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Property Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Property Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the property features, condition, and investment opportunity..."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Financial & Property Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Financial & Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Asking Price</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="250000"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="arv">ARV (After Repair Value)</Label>
                        <Input
                          id="arv"
                          name="arv"
                          type="number"
                          value={formData.arv}
                          onChange={handleInputChange}
                          placeholder="350000"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bedrooms">Bedrooms</Label>
                        <Input
                          id="bedrooms"
                          name="bedrooms"
                          type="number"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                          placeholder="3"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bathrooms">Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          name="bathrooms"
                          type="number"
                          step="0.5"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                          placeholder="2"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sqft">Square Feet</Label>
                        <Input
                          id="sqft"
                          name="sqft"
                          type="number"
                          value={formData.sqft}
                          onChange={handleInputChange}
                          placeholder="1500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="yearBuilt">Year Built</Label>
                        <Input
                          id="yearBuilt"
                          name="yearBuilt"
                          type="number"
                          value={formData.yearBuilt}
                          onChange={handleInputChange}
                          placeholder="1985"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="lotSize">Lot Size (acres)</Label>
                      <Input
                        id="lotSize"
                        name="lotSize"
                        type="number"
                        step="0.01"
                        value={formData.lotSize}
                        onChange={handleInputChange}
                        placeholder="0.25"
                      />
                    </div>
                    
                    {/* Image Upload */}
                    <div>
                      <Label htmlFor="images">Property Images</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600 mb-2">Click to upload property images</p>
                        <Input
                          id="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('images')?.click()}
                        >
                          Choose Files
                        </Button>
                        {formData.images.length > 0 && (
                          <p className="text-sm text-green-600 mt-2">
                            {formData.images.length} file(s) selected
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6 flex justify-between">
                <div className="flex space-x-4">
                  <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Deal
                  </Button>
                </div>
                <Button 
                  type="button" 
                  onClick={() => setActiveTab('analysis')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Analyze Deal
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="analysis">
            <DealAnalyzer 
              propertyData={{
                price: parseFloat(formData.price) || 0,
                sqft: parseFloat(formData.sqft) || 0,
                bedrooms: parseFloat(formData.bedrooms) || 0,
                bathrooms: parseFloat(formData.bathrooms) || 0
              }}
              onAnalysisComplete={(analysis) => {
                toast({
                  title: "Analysis Complete",
                  description: `Deal score: ${analysis.dealScore}/100 - ${analysis.recommendation}`,
                });
              }}
            />
            <div className="mt-6 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('details')}
              >
                Back to Details
              </Button>
              <Button onClick={handleSubmit}>
                Create Deal with Analysis
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreateDeal;
