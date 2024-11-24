import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  ourScore: number;
  theirScore: number;
  className?: string;
}

export const ScoreBoard = ({ ourScore, theirScore, className }: ScoreBoardProps) => {
  return (
    <div className={cn("bg-wood text-white p-4 rounded-lg shadow-lg", className)}>
      <div className="text-xl font-bold mb-2 text-gold">النتيجة</div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>لنا:</span>
          <span className="font-bold">{ourScore}</span>
        </div>
        <div className="flex justify-between">
          <span>لهم:</span>
          <span className="font-bold">{theirScore}</span>
        </div>
      </div>
    </div>
  );
};