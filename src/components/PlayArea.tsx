import { Card } from "@/components/Card";
import { type Card as CardType, type Player } from "@/utils/gameLogic";

interface PlayAreaProps {
  currentTrick: Record<Player, CardType | null>;
}

export const PlayArea = ({ currentTrick }: PlayAreaProps) => {
  const positions: Record<Player, string> = {
    player: "bottom-1/3 left-1/2",
    top: "top-1/3 left-1/2",
    left: "top-1/2 left-1/3",
    right: "top-1/2 right-1/3"
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-gold opacity-30" />
      {Object.entries(currentTrick).map(([player, card]) => {
        if (!card) return null;
        return (
          <div key={player} className={`absolute ${positions[player as Player]} -translate-x-1/2 -translate-y-1/2`}>
            <Card suit={card.suit} value={card.value} isPlayable={false} />
          </div>
        );
      })}
    </>
  );
};