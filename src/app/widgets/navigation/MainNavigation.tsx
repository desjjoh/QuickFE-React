import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FlexBox } from "@/library/components/flex/FlexBox";
import { BlockText } from "@/library/components/text/BlockText";
import type { iRoute } from "@/app/config/navigation";
import styles from "./MainNavigation.module.scss";

type Props = { routes: readonly iRoute[] };

export function MainNavigation({ routes }: Props): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <FlexBox alignItems="center" gap={3} alignSelf="stretch">
      <nav className={styles.app__nav} aria-label={t("accessibility.primaryNavigation")}>
        <ul className={styles.nav__list}>
          {routes.map((route, index) => (
            <li key={index} className={styles.nav__item}>
              <NavLink to={route.to} className={({ isActive }) => [styles.nav__link, isActive && styles["is-active"]].filter(Boolean).join(" ")}>
                <BlockText noWrap element="h6">{t(route.label)}</BlockText>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </FlexBox>
  );
}
