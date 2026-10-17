import { Cloud, Gamepad, GitFork, UserStar, X } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Card
      className={[styles.nextsteps, isMobile && styles.stacked, className]
        .filter(Boolean)
        .join(" ")}
      size="lg">
      <CardBody>
        <FlexBox direction="column" id="social" gap={6}>
          <FlexBox alignItems="center" gap={3}>
            <UserStar size={24} strokeWidth={2.5} className={styles.icon} />

            <FlexBox direction="column">
              <BlockText element="h4">
                {t("template.connect.heading")}
              </BlockText>
              <BlockText>{t("template.connect.description")}</BlockText>
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
                {t("template.connect.githubLink")}
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://chat.vite.dev/"
                external
                variant="surface"
                iconPosition="start"
                icon={Gamepad}>
                {t("template.connect.discordLink")}
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://x.com/vite_js"
                external
                variant="surface"
                iconPosition="start"
                icon={X}>
                {t("template.connect.xLink")}
              </ButtonLink>
            </li>

            <li>
              <ButtonLink
                href="https://bsky.app/profile/vite.dev"
                external
                variant="surface"
                iconPosition="start"
                icon={Cloud}>
                {t("template.connect.blueskyLink")}
              </ButtonLink>
            </li>
          </ul>
        </FlexBox>
      </CardBody>
    </Card>
  );
}
