import { lazy } from "react";
// Lazy Load For Each Section And Use In Section Layout

export const HeadersList = [
  lazy(() => import("./Headers/Header1/Header1")),
  lazy(() => import("./Headers/Header2/Header2")),
  lazy(() => import("./Headers/Header3/Header3")),
];

export const FootersList = [
  lazy(() => import("./Footers/Footer1/Footer1")),
  lazy(() => import("./Footers/Footer2/Footer2")),
];
