# Playground

[Back to README](../README.md)

Visit `/playground`, or choose **Playground** directly below **Template** in More
navigation. The route loads the playground separately and uses the translated
`Playground — QuickFE` browser title.

The structure follows Vue: `PlaygroundView` composes component widgets using
`PlaygroundContent`, `PlaygroundSection`, `PlaygroundTable`, and
`PlaygroundShowcase`. Widgets cover buttons, icon buttons, button links,
plain links, dropdowns, tabs, and typography. English copy comes
from Vue; rich-text interpolation uses React i18next syntax.

Tables scroll within their own viewport on narrow screens. They do not widen
the app frame. The existing stacked layout and design tokens provide spacing.

## Tabs

`TabLayout` accepts a `tabs` slot as a React node and a `panels` object keyed by
tab ID. Use `TabButton` for local selection. The first enabled tab is selected
automatically, including tabs nested in fragments or arrays. Set `value` and
`onValueChange` for controlled selection, or omit them for internal state.

```tsx
<TabLayout
  label={t('playground.header.sections.button')}
  tabs={
    <React.Fragment>
      <TabButton id="colors">{t('playground.header.tabs.themeColors')}</TabButton>
      <TabButton id="sizes">{t('playground.header.tabs.allSizes')}</TabButton>
    </React.Fragment>
  }
  panels={{ colors: <ColorExamples />, sizes: <SizeExamples /> }}
/>
```

`tone` supports `primary` and `neutral`. `TabRouter` accepts React Router
destinations and uses the current route for selected state; route content stays
in the router outlet. Use it inside `TabLayout` and a router.

Arrow Left/Right wrap through enabled tabs; Home/End select the first/last.
Selection follows focus. Nested tab groups remain independent. Panels have
unique IDs and label relationships, are mounted only while displayed, and fade
out before the next panel mounts. Initial panels appear without animation;
only tab changes animate. Reduced motion disables the animation.

## Verification

Use `/playground` for nested groups, translated rich text, button states,
dropdown keyboard/focus behavior, and narrow-screen tables. Controlled selection,
route tabs, and disabled-tab cases need dedicated consumers to exercise them.

The earlier `/test/manual/tabs.html` fixture is no longer checked in. There is
currently no automated tab test suite. Follow [Testing](testing.md) for the
available checks and manual regression checklist.
