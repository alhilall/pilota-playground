import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { GameControls } from "@/components/GameControls";
import { ScoreBoard } from "@/components/ScoreBoard";
import { createDeck, shuffleDeck, dealCards, type Card as CardType, type Player, type Suit } from "@/utils/gameLogic";
import { toast } from "sonner";

const Index = () => {
  const [ourScore, setOurScore] = useState(0);
  const [theirScore, setTheirScore] = useState(0);
  const [playerCards, setPlayerCards] = useState<CardType[]>([]);
  const [currentTrick, setCurrentTrick] = useState<Record<Player, CardType | null>>({
    player: null,
    right: null,
    top: null,
    left: null
  });
  const [currentSuit, setCurrentSuit] = useState<Suit | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const deck = shuffleDeck(createDeck());
    const hands = dealCards(deck);
    setPlayerCards(hands.player);
    console.log("New game started with hands:", hands);
  };

  const handleCardPlay = (card: CardType) => {
    if (!isPlayerTurn) {
      toast.error("ليس دورك!");
      return;
    }

    if (currentSuit && card.suit !== currentSuit && playerCards.some(c => c.suit === currentSuit)) {
      toast.error("يجب عليك لعب نفس النوع!");
      return;
    }

    setPlayerCards(prev => prev.filter(c => c !== card));
    setCurrentTrick(prev => ({ ...prev, player: card }));
    setCurrentSuit(prev => prev || card.suit);
    setIsPlayerTurn(false);
    
    console.log("Player played card:", card);
  };

  return (
    <div className="min-h-screen bg-wood-pattern">
      <div className="container mx-auto p-4">
        <div className="relative w-full h-[calc(100vh-2rem)] max-h-[800px] bg-table rounded-3xl shadow-2xl p-4 sm:p-8">
          {/* الخصم العلوي */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`top-${i}`} 
                suit="" 
                value="" 
                faceDown 
                className="-rotate-180" 
                isPlayable={false}
              />
            ))}
          </div>

          {/* الخصم الأيسر */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`left-${i}`} 
                suit="" 
                value="" 
                faceDown 
                className="-rotate-90" 
                isPlayable={false}
              />
            ))}
          </div>

          {/* الخصم الأيمن */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`right-${i}`} 
                suit="" 
                value="" 
                faceDown 
                className="rotate-90" 
                isPlayable={false}
              />
            ))}
          </div>

          {/* منطقة اللعب الوسطى */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-gold opacity-30" />
          
          {/* البطاقات المطروحة */}
          {Object.entries(currentTrick).map(([player, card]) => {
            if (!card) return null;
            const positions = {
              player: "bottom-1/3 left-1/2",
              top: "top-1/3 left-1/2",
              left: "top-1/2 left-1/3",
              right: "top-1/2 right-1/3"
            };
            return (
              <div key={player} className={`absolute ${positions[player as Player]} -translate-x-1/2 -translate-y-1/2`}>
                <Card suit={card.suit} value={card.value} isPlayable={false} />
              </div>
            );
          })}

          {/* بطاقات اللاعب */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
            {playerCards.map((card, i) => (
              <Card 
                key={`player-${i}`} 
                suit={card.suit} 
                value={card.value}
                onClick={() => handleCardPlay(card)}
                className="hover:animate-card-float"
                isPlayable={isPlayerTurn}
              />
            ))}
          </div>

          {/* لوحة النتائج */}
          <ScoreBoard 
            ourScore={ourScore} 
            theirScore={theirScore} 
            className="absolute top-4 right-4"
          />
        </div>

        {/* أزرار التحكم */}
        <GameControls
          onSun={() => {
            console.log("صن");
            toast.success("تم إعلان صن!");
          }}
          onHakem={() => {
            console.log("حكم");
            toast.success("تم إعلان حكم!");
          }}
          onAshkal={() => {
            console.log("اشكل");
            toast.success("تم إعلان اشكل!");
          }}
          onPass={() => {
            console.log("بس");
            toast.success("تم التمرير!");
          }}
          disabled={!isPlayerTurn}
        />
      </div>
    </div>
  );
};

export default Index;