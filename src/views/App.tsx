import { Fragment, useState } from "react";
import { BlockText } from "@/library/components/text/BlockText";
import "./App.scss";
import { InlineText } from "@/library/components/text/InlineText";
import { Button } from "@/library/components/button/Button";
import { AppLayout } from "./AppLayout";
import { Card } from "@/library/components/card/BaseCard";
import { CardBody } from "@/library/components/card/CardBody";
import { FlexBox } from "@/library/components/flex/FlexBox";
import { CenteredLayout } from "@/shared/layouts/CenteredLayout";
import { FileCodeCorner, UserStar } from "lucide-react";

const reactLogo = "/assets/react.svg";
const viteLogo = "/assets/vite.svg";
const heroImg = "/assets/hero.png";

function App(): React.JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <Fragment>
      <CenteredLayout>
        <AppLayout
          top={
            <section id="center">
              <FlexBox direction="column" gap={6} alignItems="center">
                <div className="hero">
                  <img
                    src={heroImg}
                    className="base"
                    width="170"
                    height="179"
                    alt=""
                  />
                  <img src={reactLogo} className="framework" alt="React logo" />
                  <img src={viteLogo} className="vite" alt="Vite logo" />
                </div>

                <FlexBox direction="column" gap={1} alignItems="center">
                  <BlockText element="h1">Get started</BlockText>
                  <BlockText>
                    Edit <InlineText element="code">src/App.tsx</InlineText> and
                    save to test <InlineText element="code">HMR</InlineText>
                  </BlockText>
                </FlexBox>

                <Button
                  variant="outline"
                  onClick={() => setCount((count) => count + 1)}>
                  Count is {count}
                </Button>
              </FlexBox>
            </section>
          }
          bottomLeft={
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
          }
          bottomRight={
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
                      <a
                        href="https://bsky.app/profile/vite.dev"
                        target="_blank">
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
          }
        />
      </CenteredLayout>
    </Fragment>
  );
}

export default App;
