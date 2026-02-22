export const Header3Controls = {
  groups: [
    {
      label: "استایل کلی",
      fields: [
        {
          path: "section.style.backgroundColor",
          label: "رنگ پس‌زمینه",
          type: "color",
        },
      ],
    },
    {
      label: "برند",
      fields: [
        { path: "brand.content.text", label: "متن برند", type: "text" },
        { path: "brand.style.color", label: "رنگ برند", type: "color" },
      ],
    },
    {
      label: "بخش جستجو",
      fields: [
        {
          path: "search.input.placeholder",
          label: "متن جایگزین (Placeholder)",
          type: "text",
        },
        { path: "search.button.text", label: "متن دکمه", type: "text" },
        { path: "search.button.style.color", label: "رنگ دکمه", type: "color" },
      ],
    },
  ],
};
