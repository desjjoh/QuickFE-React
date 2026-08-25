import { BlockText } from "@/library/components/text/BlockText";

import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";
import { UserStar } from "lucide-react";

import "../styles/App.module.scss";
import styles from "../styles/App.module.scss";
import { Button } from "@/library/components/button/Button";

type Props = {
  className?: string;
};

export function Connect({ className }: Props): React.JSX.Element {
  return (
    <Card
      className={[styles.nextsteps, className].filter(Boolean).join(" ")}
      size="lg">
      <CardBody>
        <FlexBox direction="column" id="social" gap={6}>
          <FlexBox alignItems="center" gap={3}>
            <UserStar size={24} className={styles.icon} />

            <FlexBox direction="column">
              <BlockText element="h4">Connect with us</BlockText>
              <BlockText>Join the Vite community</BlockText>
            </FlexBox>
          </FlexBox>

          <ul>
            <li>
              <Button>GitHub</Button>
              {/* <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className={styles["button-icon"]}
                  role="presentation"
                  aria-hidden="true">
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a> */}
            </li>
            <li>
              <Button>Discord</Button>
              {/* <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className={styles["button-icon"]}
                  role="presentation"
                  aria-hidden="true">
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a> */}
            </li>
            <li>
              <Button>X.com</Button>
              {/* <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className={styles["button-icon"]}
                  role="presentation"
                  aria-hidden="true">
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a> */}
            </li>
            <li>
              <Button>Bluesky</Button>
              {/* <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className={styles["button-icon"]}
                  role="presentation"
                  aria-hidden="true">
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a> */}
            </li>
          </ul>
        </FlexBox>
      </CardBody>
    </Card>
  );
}
