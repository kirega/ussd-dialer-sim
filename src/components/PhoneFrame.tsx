import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative w-full max-w-[340px] aspect-[9/19.5] bg-phone-frame rounded-[2.5rem] shadow-2xl border-[12px] border-phone-frame overflow-hidden">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-phone-frame rounded-b-2xl z-10 flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-phone-screen/50 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-phone-screen/50 rounded-full"></div>
        </div>
        
        {/* Phone screen */}
        <div className="absolute inset-0 bg-phone-screen rounded-[1.75rem] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
