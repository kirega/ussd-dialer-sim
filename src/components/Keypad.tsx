import { Delete } from "lucide-react";
import { Button } from "./ui/button";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onSend: () => void;
  disabled?: boolean;
}

export const Keypad = ({ onKeyPress, onDelete, onSend, disabled }: KeypadProps) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <div className="bg-keypad-bg px-4 py-1 space-y-1 h-50">
      {/* Keypad grid */}
      <div className="grid grid-cols-3 gap-1">
        {keys.flat().map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            disabled={disabled}
            className="aspect-square bg-keypad-button hover:bg-keypad-button-hover active:bg-keypad-button-active active:scale-95 rounded-xl text-lg font-semibold text-foreground transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {key}
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={onDelete}
          disabled={disabled}
          variant="secondary"
          size="lg"
          className="h-12 text-sm font-semibold rounded-xl"
        >
          <Delete className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button
          onClick={onSend}
          disabled={disabled}
          variant="default"
          size="lg"
          className="h-12 text-sm font-semibold rounded-xl bg-primary hover:bg-primary-glow shadow-lg"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
