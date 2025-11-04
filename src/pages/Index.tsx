import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { StatusBar } from "@/components/StatusBar";
import { DisplayArea } from "@/components/DisplayArea";
import { Keypad } from "@/components/Keypad";
import { StartScreen } from "@/components/StartScreen";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  from: "gateway" | "user";
  message: string;
  timestamp: number;
}

interface SessionState {
  sessionId: string;
  phoneNumber: string;
  serviceCode: string;
  text: string;
  history: Message[];
  persistent: boolean;
  isActive: boolean;
}

const ENDPOINT = "https://qa-payment.spironet.com/union/ug/ussd/callback";
const NETWORK_CODE = "64101";

const Index = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<SessionState>({
    sessionId: "XYZ00002",
    phoneNumber: "751722779",
    serviceCode: "",
    text: "",
    history: [],
    persistent: true,
    isActive: false,
  });
  const [currentInput, setCurrentInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (text: string) => {
    setIsLoading(true);
    try {
      const formData = new URLSearchParams({
        phoneNumber: session.phoneNumber,
        serviceCode: session.serviceCode,
        text: text,
        sessionId: session.sessionId,
        networkCode: NETWORK_CODE,
      });

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      
      // Parse response (CON/END format or JSON)
      let message = responseText;
      let isContinuation = true;

      if (responseText.startsWith("CON ")) {
        message = responseText.substring(4);
        isContinuation = true;
      } else if (responseText.startsWith("END ")) {
        message = responseText.substring(4);
        isContinuation = false;
      } else {
        try {
          const json = JSON.parse(responseText);
          message = json.message || responseText;
          isContinuation = json.type !== "END";
        } catch {
          // Keep raw text if not JSON
        }
      }

      // Add gateway response to history
      const newHistory = [
        ...session.history,
        {
          from: "gateway" as const,
          message: message,
          timestamp: Date.now(),
        },
      ];

      setSession((prev) => ({
        ...prev,
        history: newHistory,
        isActive: isContinuation,
      }));

      if (!isContinuation) {
        toast({
          title: "Session Ended",
          description: "The USSD session has been completed.",
        });
      }

      setCurrentInput("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to USSD gateway. Please try again.",
      });
      
      setSession((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            from: "gateway" as const,
            message: `Error: ${error instanceof Error ? error.message : "Network failure"}`,
            timestamp: Date.now(),
          },
        ],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async (serviceCode: string) => {
    setSession((prev) => ({
      ...prev,
      serviceCode,
      isActive: true,
      text: "",
      history: [],
    }));
    await sendRequest("");
  };

  const handleKeyPress = (key: string) => {
    setCurrentInput((prev) => prev + key);
  };

  const handleDelete = () => {
    if (currentInput) {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (session.text) {
      // Remove last segment from text chain
      const segments = session.text.split("*");
      const newText = segments.slice(0, -1).join("*");
      setSession((prev) => ({ ...prev, text: newText }));
      
      // Remove last user message from history
      const newHistory = [...session.history];
      for (let i = newHistory.length - 1; i >= 0; i--) {
        if (newHistory[i].from === "user") {
          newHistory.splice(i, 1);
          break;
        }
      }
      setSession((prev) => ({ ...prev, history: newHistory }));
    }
  };

  const handleSend = async () => {
    if (!currentInput.trim() || isLoading) return;

    const userInput = currentInput.trim();
    
    // Update text chain
    const newText = session.text === "" ? userInput : `${session.text}*${userInput}`;
    
    // Add user message to history
    const newHistory = [
      ...session.history,
      {
        from: "user" as const,
        message: userInput,
        timestamp: Date.now(),
      },
    ];

    setSession((prev) => ({
      ...prev,
      text: newText,
      history: newHistory,
    }));

    await sendRequest(newText);
  };

  const handleClearSession = () => {
    setSession({
      sessionId: "XYZ00002",
      phoneNumber: "751722779",
      serviceCode: "",
      text: "",
      history: [],
      persistent: true,
      isActive: false,
    });
    setCurrentInput("");
    toast({
      title: "Session Cleared",
      description: "USSD session has been reset.",
    });
  };

  if (!session.isActive) {
    return (
      <PhoneFrame>
        <StatusBar />
        <StartScreen onStart={handleStart} />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <StatusBar />
      
      {/* Header with clear button */}
      <div className="px-4 py-3 bg-keypad-bg border-b border-border flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Service Code</p>
          <p className="text-sm font-mono text-foreground">{session.serviceCode}</p>
        </div>
        <Button
          onClick={handleClearSession}
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-xs"
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          Clear
        </Button>
      </div>

      {/* Display area */}
      <DisplayArea messages={session.history} />

      {/* Current input display */}
      {currentInput && (
        <div className="px-4 py-2 bg-keypad-bg/50 border-t border-border">
          <p className="text-xs text-muted-foreground mb-1">Current input:</p>
          <p className="text-lg font-mono text-primary">{currentInput}</p>
        </div>
      )}

      {/* Keypad */}
      <Keypad
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onSend={handleSend}
        disabled={isLoading || !session.isActive}
      />
    </PhoneFrame>
  );
};

export default Index;
