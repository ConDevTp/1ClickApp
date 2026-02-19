import { lazy } from "react";
// Lazy Load For Each Section And Use In Section Layout

export const HeadersList = [
  lazy(() => import("./Headers/Header-1/Header1")),
  lazy(() => import("./Headers/Header-2/Header2")),
  lazy(() => import("./Headers/Header-3/Header3")),
];

export const FootersList = [
  lazy(() => import("./Footers/Footer-1/Footer1")),
  lazy(() => import("./Footers/Footer-2/Footer2")),
];

export const HerosList = [
  lazy(() => import("./Heros/Hero-1/Hero1")),
  lazy(() => import("./Heros/Hero-2/Hero2")),
];
