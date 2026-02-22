export const Hero2Controls = {
  groups: [
    {
      label: "استایل کل سکشن",
      fields: [
        {
          path: "section.style.backgroundColor",
          label: "رنگ پس‌زمینه",
          type: "color",
        },
        { path: "section.style.color", label: "رنگ متن", type: "color" },
        { path: "section.style.fontFamily", label: "فونت", type: "text" },
        { path: "section.style.fontSize", label: "سایز پایه", type: "text" },
        { path: "section.style.lineHeight", label: "ارتفاع خط", type: "text" },
        {
          path: "section.style.minHeight",
          label: "حداقل ارتفاع",
          type: "text",
        },
      ],
    },
    {
      label: "متون اصلی",
      fields: [
        { path: "title.content.text", label: "عنوان اصلی", type: "text" },
        { path: "title.style.fontSize", label: "سایز عنوان", type: "text" },
        { path: "description.content.text", label: "توضیحات", type: "text" },
        {
          path: "description.style.fontSize",
          label: "سایز توضیحات",
          type: "text",
        },
      ],
    },
    {
      label: "دکمه‌ها",
      fields: [
        { path: "buttons.primary.text", label: "متن دکمه اصلی", type: "text" },
        { path: "buttons.secondary.text", label: "متن دکمه دوم", type: "text" },
      ],
    },
    {
      label: "تصویر",
      fields: [
        { path: "image.content.src", label: "لینک تصویر", type: "text" },
      ],
    },
  ],
};
