import { Cloud, Gamepad, GitFork, UserStar, X } from "lucide-react";

import { BlockText } from "@/library/components/text/BlockText";
import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";
import { ButtonLink } from "@/library/components/links/ButtonLink";
import { useViewport } from "@/shared/hooks/useViewport";

import styles from "../styles/App.module.scss";

type Props = {
  className?: string;
};

export function Connect({ className }: Props): React.JSX.Element {
  const { isMobile } = useViewport();

  return (
    <Card
      className={[styles.nextsteps, isMobile && styles.stacked, className]
        .filter(Boolean)
        .join(" ")}
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
              <ButtonLink
                href="https://github.com/vitejs/vite"
                external
                variant="surface"
                iconPosition="start"
                icon={GitFork}>
                Github
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://chat.vite.dev/"
                external
                variant="surface"
                iconPosition="start"
                icon={Gamepad}>
                Discord
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://x.com/vite_js"
                external
                variant="surface"
                iconPosition="start"
                icon={X}>
                X.com
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://bsky.app/profile/vite.dev"
                external
                variant="surface"
                iconPosition="start"
                icon={Cloud}>
                Bluesky
              </ButtonLink>
            </li>
          </ul>
        </FlexBox>
      </CardBody>
    </Card>
  );
}
