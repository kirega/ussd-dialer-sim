interface MessageBubbleProps {
  message: string;
  from: "gateway" | "user";
  timestamp: number;
}

export const MessageBubble = ({ message, from, timestamp }: MessageBubbleProps) => {
  const isUser = from === "user";
  const time = new Date(timestamp).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
        <div 
          className={`px-3 py-2 rounded-xl text-xs whitespace-pre-wrap break-words ${
            isUser 
              ? 'bg-message-user text-foreground rounded-br-sm' 
              : 'bg-message-server text-foreground rounded-bl-sm'
          }`}
        >
          {message}
        </div>
        <span className="text-[9px] text-muted-foreground px-1.5">{time}</span>
      </div>
    </div>
  );
};
