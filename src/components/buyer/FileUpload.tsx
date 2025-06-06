
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
      <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
      <p className="text-sm font-medium mb-2">Upload business card image</p>
      <p className="text-xs text-muted-foreground mb-3">
        PNG, JPG up to 10MB
      </p>
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <Button 
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="w-full"
      >
        Choose File
      </Button>
    </div>
  );
};

export default FileUpload;
