import { Fragment } from "react";
import { FileCodeCorner } from "lucide-react";

import { BlockText } from "@/library/components/text/BlockText";
import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";

const reactLogo = "/assets/react.svg";
const viteLogo = "/assets/vite.svg";

export function Documentation(): React.JSX.Element {
  return (
    <Fragment>
      <Card id="next-steps" size="lg">
        <CardBody>
          <FlexBox direction="column" id="social" gap={6}>
            <FlexBox alignItems="center" gap={3}>
              <FileCodeCorner size={24} className="icon" />

              <FlexBox direction="column">
                <BlockText element="h4">Documentation</BlockText>
                <BlockText>Your questions, answered</BlockText>
              </FlexBox>
            </FlexBox>

            <ul>
              <li>
                <a href="https://vite.dev/" target="_blank">
                  <img className="logo" src={viteLogo} alt="" />
                  Explore Vite
                </a>
              </li>
              <li>
                <a href="https://react.dev/" target="_blank">
                  <img className="button-icon" src={reactLogo} alt="" />
                  Learn more
                </a>
              </li>
            </ul>
          </FlexBox>
        </CardBody>
      </Card>
    </Fragment>
  );
}
