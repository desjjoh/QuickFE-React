import { Atom, FileCodeCorner, Zap } from "lucide-react";

import { ButtonLink } from "@/library/components/links/ButtonLink";
import { BlockText } from "@/library/components/text/BlockText";
import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";

import styles from "../styles/App.module.scss";
import { useViewport } from "@/shared/hooks/useViewport";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
};

export function Documentation({ className }: Props): React.JSX.Element {
  const { isMobile } = useViewport();
  const { t } = useTranslation();

  return (
    <Card
      className={[styles.nextsteps, isMobile && styles.stacked, className]
        .filter(Boolean)
        .join(" ")}
      size="lg">
      <CardBody>
        <FlexBox direction="column" id="documentation" gap={6}>
          <FlexBox alignItems="center" gap={3}>
            <FileCodeCorner
              size={24}
              strokeWidth={2.5}
              className={styles.icon}
            />

            <FlexBox direction="column">
              <BlockText element="h4">
                {t("template.documentation.heading")}
              </BlockText>
              <BlockText>{t("template.documentation.description")}</BlockText>
            </FlexBox>
          </FlexBox>

          <ul>
            <li>
              <ButtonLink
                href="https://vite.dev/"
                external
                variant="surface"
                iconPosition="start"
                icon={Zap}>
                {t("template.documentation.viteLink")}
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                href="https://react.dev/"
                external
                variant="surface"
                iconPosition="start"
                icon={Atom}>
                {t("template.documentation.reactLink")}
              </ButtonLink>
            </li>
          </ul>
        </FlexBox>
      </CardBody>
    </Card>
  );
}
