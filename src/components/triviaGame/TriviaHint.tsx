import { ReactNode } from "react";

type TriviaHintProps = {
  label: string;
  cost: number;
  revealed: boolean;
  onReveal: () => void;
  children: ReactNode;
};

export const TriviaHint = ({
  label,
  cost,
  revealed,
  onReveal,
  children,
}: TriviaHintProps) => {
  if (!revealed) {
    return (
      <button
        type="button"
        className="trivia-game-hint-button"
        onClick={onReveal}
      >
        Reveal {label} (−{cost} pts)
      </button>
    );
  }
  return (
    <div className="trivia-game-hint" data-testid={`hint-${label}`}>
      <span className="trivia-game-hint-label">{label}:</span> {children}
    </div>
  );
};
