import { useState } from "react";
import { Card } from "@/components/Card";
import { GameControls } from "@/components/GameControls";
import { ScoreBoard } from "@/components/ScoreBoard";

const Index = () => {
  const [ourScore, setOurScore] = useState(0);
  const [theirScore, setTheirScore] = useState(0);
  
  // نموذج للبطاقات - سيتم تحديثه لاحقاً مع منطق اللعبة الكامل
  const playerCards = [
    { suit: "♠", value: "A" },
    { suit: "♥", value: "K" },
    { suit: "♦", value: "Q" },
    { suit: "♣", value: "J" },
    { suit: "♠", value: "10" },
    { suit: "♥", value: "9" },
    { suit: "♦", value: "8" },
    { suit: "♣", value: "7" },
  ];

  return (
    <div className="min-h-screen bg-wood-pattern">
      <div className="container mx-auto p-4">
        <div className="relative w-full h-[800px] bg-table rounded-3xl shadow-2xl p-8">
          {/* الخصم العلوي */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card key={`top-${i}`} suit="" value="" faceDown className="-rotate-180" />
            ))}
          </div>

          {/* الخصم الأيسر */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card key={`left-${i}`} suit="" value="" faceDown className="-rotate-90" />
            ))}
          </div>

          {/* الخصم الأيمن */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {Array(8).fill(null).map((_, i) => (
              <Card key={`right-${i}`} suit="" value="" faceDown className="rotate-90" />
            ))}
          </div>

          {/* بطاقات اللاعب */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {playerCards.map((card, i) => (
              <Card 
                key={`player-${i}`} 
                suit={card.suit} 
                value={card.value}
                className="hover:animate-card-float"
              />
            ))}
          </div>

          {/* منطقة اللعب الوسطى */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-gold opacity-30" />

          {/* لوحة النتائج */}
          <ScoreBoard 
            ourScore={ourScore} 
            theirScore={theirScore} 
            className="absolute top-4 right-4"
          />
        </div>

        {/* أزرار التحكم */}
        <GameControls
          onSun={() => console.log("صن")}
          onHakem={() => console.log("حكم")}
          onAshkal={() => console.log("اشكل")}
          onPass={() => console.log("بس")}
        />
      </div>
    </div>
  );
};

export default Index;