export const Header1Schema = {
  type: "Header-1",
  defaults: {
    section: {
      style: {
        backgroundColor: "#212529",
        color: "#ffffff",
        fontFamily: "Vazir, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
      },
    },
    title: {
      content: { text: "عنوان هدر" },
      style: {
        color: "#ffffff",
        fontSize: "24px",
        fontWeight: "bold",
      },
    },
    subtitle: {
      content: { text: "توضیحات زیر عنوان" },
      style: {
        color: "#cccccc",
        fontSize: "16px",
        fontWeight: "normal",
      },
    },
  },
};
