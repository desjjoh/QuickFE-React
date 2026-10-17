import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FlexBox } from "@/library/components/flex/FlexBox";
import { BlockText } from "@/library/components/text/BlockText";
import styles from "./BrandNavigation.module.scss";

type Props = { hideText?: boolean };

export function BrandNavigation({
  hideText = false,
}: Props): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Link to="/" className={styles.brand__link}>
      <FlexBox gap={2} alignItems="center">
        <img
          alt={t("accessibility.logoAlt")}
          src="/assets/react.svg"
          width={32}
          height={32}
        />
        {!hideText && (
          <BlockText noWrap element="h3">
            {t("app.brand.name")}
          </BlockText>
        )}
      </FlexBox>
    </Link>
  );
}
