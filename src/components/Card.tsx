import { cn } from "@/lib/utils";

interface CardProps {
  suit: string;
  value: string;
  faceDown?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Card = ({ suit, value, faceDown = false, onClick, className }: CardProps) => {
  const getSuitColor = () => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-20 h-32 rounded-lg cursor-pointer transition-transform hover:scale-105",
        "bg-white shadow-lg border-2 border-gray-200",
        className
      )}
    >
      {!faceDown ? (
        <div className="w-full h-full flex flex-col justify-between p-2">
          <div className={cn("text-lg font-bold", getSuitColor())}>
            {value}
            <span className="ml-1">{suit}</span>
          </div>
          <div className={cn("text-4xl self-center", getSuitColor())}>{suit}</div>
          <div className={cn("text-lg font-bold rotate-180", getSuitColor())}>
            {value}
            <span className="ml-1">{suit}</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-blue-800 rounded-lg pattern-cross pattern-white pattern-bg-transparent pattern-opacity-20" />
      )}
    </div>
  );
};