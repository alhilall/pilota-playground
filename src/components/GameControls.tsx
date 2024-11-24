import { Button } from "@/components/ui/button";

interface GameControlsProps {
  onSun: () => void;
  onHakem: () => void;
  onAshkal: () => void;
  onPass: () => void;
  disabled?: boolean;
}

export const GameControls = ({ onSun, onHakem, onAshkal, onPass, disabled }: GameControlsProps) => {
  return (
    <div className="flex gap-4 justify-center p-4">
      <Button 
        onClick={onSun} 
        disabled={disabled}
        className="bg-actionRed hover:bg-red-700 text-white"
      >
        صن
      </Button>
      <Button 
        onClick={onHakem} 
        disabled={disabled}
        className="bg-actionRed hover:bg-red-700 text-white"
      >
        حكم
      </Button>
      <Button 
        onClick={onAshkal} 
        disabled={disabled}
        className="bg-actionRed hover:bg-red-700 text-white"
      >
        اشكل
      </Button>
      <Button 
        onClick={onPass} 
        disabled={disabled}
        className="bg-actionRed hover:bg-red-700 text-white"
      >
        بس
      </Button>
    </div>
  );
};