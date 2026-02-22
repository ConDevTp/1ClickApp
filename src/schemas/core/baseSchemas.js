const baseStyles = {
  backgroundColor: "transparent",
  color: "#333333",
  fontFamily: "Rokh",
  fontSize: "16px",
  lineHeight: "1.5",
  padding: "0px",
  margin: "0px",
  borderRadius: "0px",
  border: "none",
  textAlign: "right",
  fontWeight: "700",
};

export const getDefaultSectionStyle = (
  bgColor = "#ffffff",
  color = "#333333",
) => ({
  ...baseStyles,
  backgroundColor: bgColor,
  color: color,
  padding: "20px 0px",
});

export const getDefaultTypography = (
  text = "متن پیش‌فرض",
  size = "16px",
  color = "#000000",
  url = "#",
) => ({
  content: { text, url },
  style: {
    ...baseStyles,
    color: color,
    fontSize: size,
  },
});

export const getDefaultButton = (text = "کلیک کنید", bgColor = "#0d6efd") => ({
  content: { text, url: "#" },
  style: {
    ...baseStyles,
    color: "#ffffff",
    backgroundColor: bgColor,
    padding: "10px 20px",
    borderRadius: "4px",
  },
  hover: {
    backgroundColor: "#0b5ed7",
    color: "#ffffff",
  },
});
