import { Delete } from "lucide-react";
import { Button } from "./ui/button";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onSend: () => void;
  disabled?: boolean;
  className?: string;
}

export const Keypad = ({ onKeyPress, onDelete, onSend, disabled, className }: KeypadProps) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <div className={`bg-keypad-bg px-2 py-1 ${className || ''}`}>
      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {keys.flat().map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            disabled={disabled}
            className="aspect-video bg-keypad-button hover:bg-keypad-button-hover active:bg-keypad-button-active active:scale-95 rounded-lg text-sm font-semibold text-foreground transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-1 mt-1">
        <Button
          onClick={onDelete}
          disabled={disabled}
          variant="secondary"
          size="sm"
          className="h-8 text-xs font-semibold rounded-lg"
        >
          <Delete className="w-3 h-3 mr-1" />
          Back
        </Button>
        <Button
          onClick={onSend}
          disabled={disabled}
          variant="default"
          size="sm"
          className="h-8 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-glow shadow-sm"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
