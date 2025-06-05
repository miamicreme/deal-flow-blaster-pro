
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image, X } from 'lucide-react';

interface PropertyData {
  images: File[];
}

interface PropertyImagesProps {
  formData: PropertyData;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PropertyImages = ({ formData, onImageUpload }: PropertyImagesProps) => {
  const removeImage = (index: number) => {
    // This would need to be passed as a prop or handled differently
    // For now, just showing the UI structure
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-2">
          <Image className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <CardTitle className="text-xl">Property Images</CardTitle>
        <p className="text-sm text-muted-foreground">
          Add photos to showcase the property
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
          <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium mb-2">Upload property images</p>
          <p className="text-xs text-muted-foreground mb-3">
            PNG, JPG up to 10MB each
          </p>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={onImageUpload}
            className="hidden"
            id="images"
          />
          <Button 
            type="button" 
            variant="outline"
            onClick={() => document.getElementById('images')?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>

        {formData.images.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-center">
              {formData.images.length} image{formData.images.length !== 1 ? 's' : ''} selected
            </p>
            <div className="grid grid-cols-2 gap-2">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-xs p-2 text-center">
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center text-xs text-muted-foreground">
          Tip: Add multiple angles including exterior, interior, and any areas needing repair
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyImages;
