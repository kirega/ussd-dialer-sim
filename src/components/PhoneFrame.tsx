import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="relative w-full max-w-[400px] aspect-[9/19.5] bg-phone-frame rounded-[3rem] shadow-2xl border-[14px] border-phone-frame overflow-hidden">
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-phone-frame rounded-b-3xl z-10 flex items-center justify-center gap-2">
          <div className="w-14 h-1.5 bg-phone-screen/50 rounded-full"></div>
          <div className="w-3 h-3 bg-phone-screen/50 rounded-full"></div>
        </div>
        
        {/* Phone screen */}
        <div className="absolute inset-0 bg-phone-screen rounded-[2rem] overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};
