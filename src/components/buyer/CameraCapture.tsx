
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
}

const CameraCapture = ({ onCapture, onCancel }: CameraCaptureProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      throw new Error('Camera access denied');
    }
  };

  const captureBusinessCard = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'business-card.jpg', { type: 'image/jpeg' });
            onCapture(file);
          }
        }, 'image/jpeg', 0.8);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());
        setIsScanning(false);
      }
    }
  };

  const handleCancel = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
    onCancel();
  };

  if (!isScanning) {
    return (
      <Button onClick={startCamera} className="w-full h-12" size="lg">
        <Camera className="h-5 w-5 mr-2" />
        Use Camera
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white"></div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={captureBusinessCard} className="flex-1" size="lg">
          <Camera className="h-4 w-4 mr-2" />
          Capture Card
        </Button>
        <Button variant="outline" onClick={handleCancel} size="lg">
          Cancel
        </Button>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
