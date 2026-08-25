import { useState } from "react";

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
          <img src={reactLogo} className={styles.framework} alt="React logo" />
          <img src={viteLogo} className={styles.vite} alt="Vite logo" />
        </div>

        <FlexBox direction="column" gap={1} alignItems="center">
          <BlockText element="h1">Get started</BlockText>
          <BlockText>
            Edit <InlineText element="code">src/App.tsx</InlineText> and save to
            test <InlineText element="code">HMR</InlineText>
          </BlockText>
        </FlexBox>

        <Button
          variant="outline"
          onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
      </FlexBox>
    </section>
  );
}
