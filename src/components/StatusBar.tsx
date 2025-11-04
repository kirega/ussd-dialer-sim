import { Battery, Signal, Wifi } from "lucide-react";

export const StatusBar = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="bg-status-bar px-4 pt-2 pb-1.5 flex items-center justify-between text-[10px] text-foreground/80">
      <div className="flex items-center gap-1">
        <Signal className="w-2.5 h-2.5" />
        <Wifi className="w-2.5 h-2.5" />
      </div>
      <div className="font-medium">{currentTime}</div>
      <div className="flex items-center gap-1">
        <Battery className="w-3.5 h-3.5" />
        <span className="text-[9px]">98%</span>
      </div>
    </div>
  );
};
