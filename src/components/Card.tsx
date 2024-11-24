import { cn } from "@/lib/utils";

interface CardProps {
  suit: string;
  value: string;
  faceDown?: boolean;
  onClick?: () => void;
  className?: string;
  isPlayable?: boolean;
}

export const Card = ({ suit, value, faceDown = false, onClick, className, isPlayable = true }: CardProps) => {
  const getSuitColor = () => {
    return suit === "♥" || suit === "♦" ? "text-red-600" : "text-black";
  };

  return (
    <div
      onClick={isPlayable ? onClick : undefined}
      className={cn(
        "relative w-16 h-24 sm:w-20 sm:h-32 rounded-lg transition-all duration-300",
        "shadow-lg border-2 border-gray-200",
        isPlayable && !faceDown && "hover:-translate-y-4 cursor-pointer",
        !isPlayable && "opacity-70",
        className
      )}
    >
      {!faceDown ? (
        <div className="w-full h-full flex flex-col justify-between p-2 bg-white rounded-lg">
          <div className={cn("text-sm sm:text-lg font-bold", getSuitColor())}>
            {value}
            <span className="ml-1">{suit}</span>
          </div>
          <div className={cn("text-2xl sm:text-4xl self-center", getSuitColor())}>{suit}</div>
          <div className={cn("text-sm sm:text-lg font-bold rotate-180", getSuitColor())}>
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