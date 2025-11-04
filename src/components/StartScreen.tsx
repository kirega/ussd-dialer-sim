import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Phone } from "lucide-react";

interface StartScreenProps {
  onStart: (serviceCode: string) => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const [serviceCode, setServiceCode] = useState("*384*272758#");

  const handleStart = () => {
    if (serviceCode.trim()) {
      onStart(serviceCode.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 space-y-8">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
        <Phone className="w-10 h-10 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">USSD Simulator</h1>
        <p className="text-sm text-muted-foreground">Enter service code to start</p>
      </div>

      <div className="w-full space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground px-1">Service Code</label>
          <Input
            type="text"
            value={serviceCode}
            onChange={(e) => setServiceCode(e.target.value)}
            placeholder="*384*272758#"
            className="text-center text-lg font-mono h-12 bg-input border-border"
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />
        </div>

        <Button
          onClick={handleStart}
          disabled={!serviceCode.trim()}
          size="lg"
          className="w-full h-14 text-base font-semibold rounded-xl bg-primary hover:bg-primary-glow shadow-lg"
        >
          Start Session
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center space-y-1 pt-4">
        <p>Session ID: XYZ00002</p>
        <p>Phone: 751722779</p>
      </div>
    </div>
  );
};
