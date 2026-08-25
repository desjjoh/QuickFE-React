import { Fragment } from "react";
import { BlockText } from "@/library/components/text/BlockText";

import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";
import { UserStar } from "lucide-react";

export function Connect(): React.JSX.Element {
  return (
    <Fragment>
      <Card id="next-steps" size="lg">
        <CardBody>
          <FlexBox direction="column" id="social" gap={6}>
            <FlexBox alignItems="center" gap={3}>
              <UserStar size={24} className="icon" />

              <FlexBox direction="column">
                <BlockText element="h4">Connect with us</BlockText>
                <BlockText>Join the Vite community</BlockText>
              </FlexBox>
            </FlexBox>

            <ul>
              <li>
                <a href="https://github.com/vitejs/vite" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true">
                    <use href="/icons.svg#github-icon"></use>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://chat.vite.dev/" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true">
                    <use href="/icons.svg#discord-icon"></use>
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <a href="https://x.com/vite_js" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true">
                    <use href="/icons.svg#x-icon"></use>
                  </svg>
                  X.com
                </a>
              </li>
              <li>
                <a href="https://bsky.app/profile/vite.dev" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true">
                    <use href="/icons.svg#bluesky-icon"></use>
                  </svg>
                  Bluesky
                </a>
              </li>
            </ul>
          </FlexBox>
        </CardBody>
      </Card>
    </Fragment>
  );
}
