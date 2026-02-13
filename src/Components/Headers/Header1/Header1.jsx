import "./index.css";
import { useAllData } from "../../../Hooks/useAllData";

const Header1 = () => {
  const { value } = useAllData("Header-1");

  const headerStyle = {
    color: value?.textColor || "#ffffff",
    backgroundColor: value?.backgroundColor || "#dc3545",
    padding: value?.padding || "1.5rem",
    margin: value?.margin || "0px",
    borderRadius: value?.borderRadius || "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    transition: "all 0.3s ease",
  };

  const textStyle = {
    fontSize: value?.fontSize || "24px",
    fontFamily: value?.fontFamily || "inherit",
    lineHeight: value?.lineHeight || "1.2",
    color: "inherit",
    margin: 0,
  };

  return (
    <section style={headerStyle}>
      <h1 style={textStyle}>{value?.title || "بدون تایتل"}</h1>
    </section>
  );
};

export default Header1;
