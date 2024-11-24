export type Suit = "♠" | "♥" | "♦" | "♣";
export type Value = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7";
export type Card = { suit: Suit; value: Value };
export type Player = "player" | "top" | "left" | "right";

export const CARD_VALUES: Value[] = ["A", "K", "Q", "J", "10", "9", "8", "7"];
export const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];

export const createDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const value of CARD_VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

export const shuffleDeck = (deck: Card[]): Card[] => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

export const dealCards = (deck: Card[]): Record<Player, Card[]> => {
  return {
    player: deck.slice(0, 8),
    right: deck.slice(8, 16),
    top: deck.slice(16, 24),
    left: deck.slice(24, 32),
  };
};

export const getCardValue = (card: Card): number => {
  const valueMap: Record<Value, number> = {
    "A": 11,
    "K": 4,
    "Q": 3,
    "J": 2,
    "10": 10,
    "9": 0,
    "8": 0,
    "7": 0
  };
  return valueMap[card.value];
};

export const isValidPlay = (card: Card, currentSuit: Suit | null, playerCards: Card[]): boolean => {
  if (!currentSuit) return true;
  
  if (card.suit === currentSuit) return true;
  
  return !playerCards.some(c => c.suit === currentSuit);
};