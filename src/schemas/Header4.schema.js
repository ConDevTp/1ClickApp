export const Header4Schema = {
  type: "Header-4",
  defaults: {
    section: {
      style: {
        backgroundColor: "#ffffff",
        color: "#333333",
        fontFamily: "Vazir, sans-serif",
        fontSize: "16px",
        lineHeight: "1.5",
        position: "relative",
        padding: "15px 20px",
      },
    },
    brand: {
      content: { text: "برند من", url: "/" },
      style: {
        color: "#000000",
        fontSize: "24px",
        fontWeight: "bold",
        textDecoration: "none",
      },
    },
    menu: {
      style: {
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0,
      },
      items: [
        {
          id: "1",
          content: { text: "خانه", url: "#" },
          style: { color: "#333333", hoverColor: "#0d6efd", fontSize: "16px" },
        },
        {
          id: "2",
          content: { text: "خدمات", url: "#" },
          style: { color: "#333333", hoverColor: "#0d6efd", fontSize: "16px" },
        },
        {
          id: "3",
          content: { text: "تماس", url: "#" },
          style: { color: "#333333", hoverColor: "#0d6efd", fontSize: "16px" },
        },
      ],
    },
    cta: {
      content: { text: "شروع کنید" },
      style: {
        backgroundColor: "#0d6efd",
        color: "#ffffff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        fontFamily: "Vazir, sans-serif",
      },
      hover: {
        backgroundColor: "#0b5ed7",
      },
    },
  },
};
