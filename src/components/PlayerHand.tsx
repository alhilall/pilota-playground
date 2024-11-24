import { Card } from "@/components/Card";
import { type Card as CardType } from "@/utils/gameLogic";

interface PlayerHandProps {
  cards: CardType[];
  onCardPlay: (card: CardType) => void;
  isPlayerTurn: boolean;
}

export const PlayerHand = ({ cards, onCardPlay, isPlayerTurn }: PlayerHandProps) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
      {cards.map((card, i) => (
        <Card 
          key={`player-${i}`}
          suit={card.suit}
          value={card.value}
          onClick={() => onCardPlay(card)}
          className="hover:animate-card-float"
          isPlayable={isPlayerTurn}
        />
      ))}
    </div>
  );
};