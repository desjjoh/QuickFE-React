import type { To } from "react-router-dom";

export type iRoute = {
  to: To;
  label: string;
};

export const mainNavigation: iRoute[] = [];

export const moreNavigation: iRoute[] = [
  { label: "app.routes.about", to: "/" },
  { label: "app.routes.blog", to: "/" },
  { label: "app.routes.contactUs", to: "/" },
  { label: "app.routes.developers", to: "/" },
  { label: "app.routes.events", to: "/" },
  { label: "app.routes.jobs", to: "/" },
  { label: "app.routes.partners", to: "/" },
  { label: "app.routes.playground", to: "/" },
  { label: "app.routes.privacy", to: "/" },
  { label: "app.routes.template", to: "/" },
  { label: "app.routes.terms", to: "/" },
];
