import { FileCodeCorner } from "lucide-react";

import { BlockText } from "@/library/components/text/BlockText";
import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";

import styles from "../styles/App.module.scss";
import { ButtonLink } from "@/library/components/links/ButtonLink";

const reactLogo = "/assets/react.svg";
const viteLogo = "/assets/vite.svg";

type Props = {
  className?: string;
};

export function Documentation({ className }: Props): React.JSX.Element {
  return (
    <Card
      className={[styles.nextsteps, className].filter(Boolean).join(" ")}
      size="lg">
      <CardBody>
        <FlexBox direction="column" id="social" gap={6}>
          <FlexBox alignItems="center" gap={3}>
            <FileCodeCorner size={24} className={styles.icon} />

            <FlexBox direction="column">
              <BlockText element="h4">Documentation</BlockText>
              <BlockText>Your questions, answered</BlockText>
            </FlexBox>
          </FlexBox>

          <ul>
            <li>
              <ButtonLink
                href="https://vite.dev/"
                external
                variant="surface"
                tone="neutral">
                Explore Vite
              </ButtonLink>
              {/* <a href="https://vite.dev/" target="_blank">
                <img className={styles.logo} src={viteLogo} alt="" />
                Explore Vite
              </a> */}
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className={styles["button-icon"]} src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </FlexBox>
      </CardBody>
    </Card>
  );
}
