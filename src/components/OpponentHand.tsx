import { Card } from "@/components/Card";

interface OpponentHandProps {
  position: 'top' | 'left' | 'right';
  cardCount?: number;
}

export const OpponentHand = ({ position, cardCount = 8 }: OpponentHandProps) => {
  const positionStyles = {
    top: "top-4 left-1/2 -translate-x-1/2 flex -space-x-4 reverse -rotate-180",
    left: "left-4 top-1/2 -translate-y-1/2 flex -space-x-12 transform -rotate-90",
    right: "right-4 top-1/2 -translate-y-1/2 flex -space-x-12 transform rotate-90"
  };

  const cardRotation = {
    top: "",
    left: "rotate-90",
    right: "-rotate-90"
  };

  return (
    <div className={`absolute ${positionStyles[position]}`}>
      {Array(cardCount).fill(null).map((_, i) => (
        <Card 
          key={`${position}-${i}`}
          suit=""
          value=""
          faceDown
          isPlayable={false}
          size="small"
          className={`transform ${cardRotation[position]}`}
        />
      ))}
    </div>
  );
};