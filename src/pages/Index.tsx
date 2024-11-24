import { useState, useEffect } from "react";
import { GameControls } from "@/components/GameControls";
import { ScoreBoard } from "@/components/ScoreBoard";
import { OpponentHand } from "@/components/OpponentHand";
import { PlayArea } from "@/components/PlayArea";
import { PlayerHand } from "@/components/PlayerHand";
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
    
    setTimeout(() => {
      simulateComputerPlay();
    }, 1000);
    
    console.log("Player played card:", card);
  };

  const simulateComputerPlay = () => {
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
          <OpponentHand position="top" />
          <OpponentHand position="left" />
          <OpponentHand position="right" />
          
          <PlayArea currentTrick={currentTrick} />
          
          <PlayerHand 
            cards={playerCards}
            onCardPlay={handleCardPlay}
            isPlayerTurn={isPlayerTurn}
          />

          <ScoreBoard 
            ourScore={ourScore} 
            theirScore={theirScore} 
            className="absolute top-4 right-4"
          />
        </div>

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