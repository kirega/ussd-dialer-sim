import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";

interface Message {
  from: "gateway" | "user";
  message: string;
  timestamp: number;
}

interface DisplayAreaProps {
  messages: Message[];
}

export const DisplayArea = ({ messages }: DisplayAreaProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--border)) transparent' }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
          <p>USSD session display</p>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <MessageBubble 
            key={idx} 
            message={msg.message} 
            from={msg.from}
            timestamp={msg.timestamp}
          />
        ))
      )}
    </div>
  );
};
