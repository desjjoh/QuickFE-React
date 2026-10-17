import { Moon, Sun } from "lucide-react";

import { IconButton } from "@/library/components/button/IconButton";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useStore";
import { selectIsDark, selectNextMode, toggleMode } from "@/shared/stores/theme";

export function ThemeToggle(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);
  const nextMode = useAppSelector(selectNextMode);
  const icon = isDark ? Sun : Moon;
  const label = `Switch to ${nextMode} mode`;

  return (
    <IconButton
      icon={icon}
      tone="neutral"
      variant="ghost"
      label={label}
      onClick={() => dispatch(toggleMode())}
    />
  );
}
