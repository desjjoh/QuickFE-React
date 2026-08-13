import { createContext, useContext } from "react";

import type { CardContextValue } from "./Card";

export const CardContext = createContext<CardContextValue | null>(null);

export function useCardContext(): CardContextValue {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("[CardBody] must be used inside <BaseCard>.");
  }

  return context;
}
