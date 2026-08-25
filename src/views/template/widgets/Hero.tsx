import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { BlockText } from "@/library/components/text/BlockText";
import { InlineText } from "@/library/components/text/InlineText";
import { Button } from "@/library/components/button/Button";
import { FlexBox } from "@/library/components/flex/FlexBox";

import styles from "../styles/App.module.scss";

const reactLogo = "/assets/react.svg";
const viteLogo = "/assets/vite.svg";
const heroImg = "/assets/hero.png";

type Props = {
  className?: string;
};

export function Hero({ className }: Props): React.JSX.Element {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <section className={[styles.center, className].filter(Boolean).join(" ")}>
      <FlexBox direction="column" gap={6} alignItems="center">
        <div className={styles.hero}>
          <img
            src={heroImg}
            className={styles.base}
            width="170"
            height="179"
            alt=""
          />
          <img
            src={reactLogo}
            className={styles.framework}
            alt={t("template.hero.reactLogoAlt")}
          />
          <img
            src={viteLogo}
            className={styles.vite}
            alt={t("template.hero.viteLogoAlt")}
          />
        </div>

        <FlexBox direction="column" gap={1} alignItems="center">
          <BlockText element="h1">{t("template.hero.heading")}</BlockText>
          <BlockText>
            <Trans
              i18nKey="template.hero.instruction"
              components={{
                file: <InlineText element="code" />,
                hmr: <InlineText element="code" />,
              }}
            />
          </BlockText>
        </FlexBox>

        <Button
          variant="outline"
          onClick={() => setCount((count) => count + 1)}>
          {t("template.hero.count", { count })}
        </Button>
      </FlexBox>
    </section>
  );
}
