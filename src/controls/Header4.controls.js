export const Header4Controls = {
  groups: [
    {
      label: "استایل کل سکشن",
      fields: [
        {
          path: "section.style.backgroundColor",
          label: "رنگ پس‌زمینه",
          type: "color",
        },
        { path: "section.style.color", label: "رنگ متن پایه", type: "color" },
        { path: "section.style.fontFamily", label: "فونت", type: "text" },
        { path: "section.style.fontSize", label: "سایز پایه", type: "text" },
        { path: "section.style.lineHeight", label: "ارتفاع خط", type: "text" },
        {
          path: "section.style.position",
          label: "موقعیت (relative/fixed)",
          type: "text",
        },
      ],
    },
    {
      label: "برند",
      fields: [
        { path: "brand.content.text", label: "متن برند", type: "text" },
        { path: "brand.style.color", label: "رنگ برند", type: "color" },
        { path: "brand.style.fontSize", label: "سایز برند", type: "text" },
      ],
    },
    {
      label: "دکمه (CTA)",
      fields: [
        { path: "cta.content.text", label: "متن دکمه", type: "text" },
        { path: "cta.style.color", label: "رنگ متن دکمه", type: "color" },
        {
          path: "cta.style.backgroundColor",
          label: "رنگ پس‌زمینه دکمه",
          type: "color",
        },
        { path: "cta.style.fontSize", label: "سایز فونت دکمه", type: "text" },
        { path: "cta.style.fontFamily", label: "فونت دکمه", type: "text" },
        {
          path: "cta.hover.backgroundColor",
          label: "رنگ هاور دکمه",
          type: "color",
        },
      ],
    },
  ],
  lists: [{ label: "لینک منو", path: "menu.items" }],
};
