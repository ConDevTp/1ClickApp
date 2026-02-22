import {
  getButtonControls,
  getSectionStyles,
  getTypographyControls,
} from "./core/baseControls";

export const Header2Controls = {
  groups: [
    {
      label: "استایل پایه سکشن",
      fields: getSectionStyles("section.style"),
    },
    {
      label: "تنظیمات برند (لوگو)",
      fields: getTypographyControls("brand", "برند"),
    },
    {
      label: "دکمه جستجو",
      fields: [
        { path: "search.show", label: "نمایش باکس جستجو", type: "switch" },
        ...getButtonControls("search.button", "جستجو"),
      ],
    },
  ],
  lists: [
    {
      label: "منوی ناوبری",
      path: "menu.items",
      itemFields: getTypographyControls("", "آیتم منو"),
    },
  ],
};
