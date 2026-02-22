import {
  getDefaultButton,
  getDefaultSectionStyle,
  getDefaultTypography,
} from "./core/baseSchemas";

export const Header2Schema = {
  type: "Header-2",
  defaults: {
    section: {
      style: getDefaultSectionStyle("#f8f9fa", "#212529"),
    },
    brand: getDefaultTypography("برند شما", "24px", "#0d6efd"),
    menu: {
      items: [
        { id: "1", ...getDefaultTypography("خانه", "16px", "#333333") },
        { id: "2", ...getDefaultTypography("محصولات", "16px", "#333333") },
        { id: "3", ...getDefaultTypography("درباره ما", "16px", "#333333") },
      ],
    },
    search: {
      show: true,
      input: { placeholder: "جستجو..." },
      button: getDefaultButton("بگرد", "#198754"),
    },
  },
};
