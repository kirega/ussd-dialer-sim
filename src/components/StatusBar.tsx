import { Battery, Signal, Wifi } from "lucide-react";

export const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="bg-status-bar px-6 pt-3 pb-2 flex items-center justify-between text-xs text-foreground/80">
      <div className="flex items-center gap-1">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
      </div>
      <div className="font-medium">{currentTime}</div>
      <div className="flex items-center gap-1">
        <Battery className="w-4 h-4" />
        <span className="text-[10px]">98%</span>
      </div>
    </div>
  );
};
