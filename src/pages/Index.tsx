import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import { GameControls } from "@/components/GameControls";
import { ScoreBoard } from "@/components/ScoreBoard";
import { 
  createDeck, 
  shuffleDeck, 
  dealCards, 
  SUITS,
  CARD_VALUES,
  type Card as CardType, 
  type Player, 
  type Suit 
} from "@/utils/gameLogic";
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
    console.log("Game initialized");
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
    
    // محاكاة لعب الكمبيوتر
    setTimeout(() => {
      simulateComputerPlay();
    }, 1000);
    
    console.log("Player played card:", card);
  };

  const simulateComputerPlay = () => {
    // محاكاة بسيطة للعب الكمبيوتر
    const computerPlayers: Player[] = ['right', 'top', 'left'];
    computerPlayers.forEach((player, index) => {
      setTimeout(() => {
        const randomCard: CardType = {
          suit: SUITS[Math.floor(Math.random() * SUITS.length)],
          value: CARD_VALUES[Math.floor(Math.random() * CARD_VALUES.length)]
        };
        setCurrentTrick(prev => ({ ...prev, [player]: randomCard }));
        console.log(`Computer ${player} played:`, randomCard);
        
        if (player === 'left') {
          // بعد انتهاء دور جميع اللاعبين
          setTimeout(() => {
            setCurrentTrick({
              player: null,
              right: null,
              top: null,
              left: null
            });
            setCurrentSuit(null);
            setIsPlayerTurn(true);
          }, 1000);
        }
      }, (index + 1) * 1000);
    });
  };

  return (
    <div className="min-h-screen bg-wood-pattern">
      <div className="container mx-auto p-4">
        <div className="relative w-full h-[calc(100vh-2rem)] max-h-[800px] bg-table rounded-3xl shadow-2xl p-4 sm:p-8">
          {/* الخصم العلوي */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex -space-x-4 reverse">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`top-${i}`} 
                suit="" 
                value="" 
                faceDown 
                className="-rotate-180" 
                isPlayable={false}
                size="small"
              />
            ))}
          </div>

          {/* الخصم الأيسر - تم تحديثه ليكون أفقي ومتداخل */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex -space-x-12 transform -rotate-90">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`left-${i}`} 
                suit="" 
                value="" 
                faceDown 
                isPlayable={false}
                size="small"
                className="transform rotate-90"
              />
            ))}
          </div>

          {/* الخصم الأيمن - تم تحديثه ليكون أفقي ومتداخل */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex -space-x-12 transform rotate-90">
            {Array(8).fill(null).map((_, i) => (
              <Card 
                key={`right-${i}`} 
                suit="" 
                value="" 
                faceDown 
                isPlayable={false}
                size="small"
                className="transform -rotate-90"
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
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
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
