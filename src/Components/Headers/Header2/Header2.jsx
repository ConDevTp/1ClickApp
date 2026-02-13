import "./index.css";
import { useAllData } from "../../../Hooks/useAllData";

const Header2 = () => {
  const { value } = useAllData("Header-2");

  const sectionStyle = {
    backgroundColor: value?.backgroundColor || "#0dcaf0",
    color: value?.textColor || "#ffffff",
    padding: value?.padding || "1.5rem",
    margin: value?.margin || "0px",
    borderRadius: value?.borderRadius || "0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease",
  };

  const textStyle = {
    fontFamily: value?.fontFamily || "inherit",
    lineHeight: value?.lineHeight || "1.2",
    textAlign: "center",
  };

  return (
    <section style={sectionStyle}>
      <h1 style={{ ...textStyle, fontSize: value?.fontSize || "32px" }}>
        {value?.title || "بدون تایتل"}
      </h1>
      <h2 style={{ ...textStyle, fontSize: "24px", opacity: 0.9 }}>
        {value?.subtitle || "زیرعنوان"}
      </h2>
      <p style={{ ...textStyle, fontSize: "16px", marginTop: "10px" }}>
        {value?.description || "توضیحات"}
      </p>
      <button
        className="btn btn-danger mt-3"
        style={{ borderRadius: value?.borderRadius || "4px" }}
      >
        {value?.buttonText || "کلیک کنید"}
      </button>
    </section>
  );
};

export default Header2;
