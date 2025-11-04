import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Phone } from "lucide-react";

interface StartScreenProps {
  onStart: (serviceCode: string) => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  const [serviceCode, setServiceCode] = useState("*274*6#");

  const handleStart = () => {
    if (serviceCode.trim()) {
      onStart(serviceCode.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Phone className="w-8 h-8 text-primary" />
      </div>
      
      <div className="text-center space-y-1.5">
        <h1 className="text-xl font-bold text-foreground">USSD Simulator</h1>
        <p className="text-xs text-muted-foreground">Enter service code to start</p>
      </div>

      <div className="w-full space-y-3">
        <div className="space-y-1.5">
          <label className="text-[10px] text-muted-foreground px-1">Service Code</label>
          <Input
            type="text"
            value={serviceCode}
            onChange={(e) => setServiceCode(e.target.value)}
            placeholder="*274*6#"
            className="text-center text-base font-mono h-10 bg-input border-border"
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          />
        </div>

        <Button
          onClick={handleStart}
          disabled={!serviceCode.trim()}
          size="lg"
          className="w-full h-12 text-sm font-semibold rounded-xl bg-primary hover:bg-primary-glow shadow-lg"
        >
          Start Session
        </Button>
      </div>

      <div className="text-[10px] text-muted-foreground text-center space-y-0.5 pt-3">
        <p>Session ID: XYZ00002</p>
        <p>Phone: 751722779</p>
      </div>
    </div>
  );
};
