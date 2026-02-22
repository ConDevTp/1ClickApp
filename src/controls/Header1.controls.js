export const Header1Controls = {
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
        {
          path: "section.style.fontFamily",
          label: "فونت",
          type: "dropdown",
          options: ["Vazir, sans-serif", "Tahoma", "Arial"],
        },
        {
          path: "section.style.fontSize",
          label: "سایز پایه",
          type: "slider",
          min: 12,
          max: 32,
        },
        {
          path: "section.style.lineHeight",
          label: "ارتفاع خط",
          type: "slider",
          min: 1,
          max: 3,
        },
      ],
    },
    {
      label: "عنوان",
      fields: [
        { path: "title.content.text", label: "متن عنوان", type: "text" },
        { path: "title.style.color", label: "رنگ عنوان", type: "color" },
        {
          path: "title.style.fontSize",
          label: "سایز عنوان",
          type: "slider",
          min: 16,
          max: 64,
        },
        {
          path: "title.style.textAlign",
          label: "چیدمان متن",
          type: "alignment",
        },
      ],
    },
  ],
};
