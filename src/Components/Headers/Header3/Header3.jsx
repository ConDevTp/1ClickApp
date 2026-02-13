import "./index.css";
import { useAllData } from "../../../Hooks/useAllData";

const Header3 = () => {
  const { value } = useAllData("Header-3");

  const navStyle = {
    backgroundColor: value?.backgroundColor || "#f8f9fa",
    color: value?.textColor || "#000000",
    padding: value?.padding || "0.5rem",
    margin: value?.margin || "0px",
    fontFamily: value?.fontFamily || "inherit",
    fontSize: value?.fontSize || "16px",
    lineHeight: value?.lineHeight || "1.2",
    borderRadius: value?.borderRadius || "0px",
    transition: "all 0.3s ease",
  };

  const linkStyle = {
    color: value?.textColor || "inherit",
    fontSize: "inherit",
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader3"
          aria-controls="navbarHeader3"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarHeader3">
          <a className="navbar-brand" href="#" style={linkStyle}>
            {value?.brandText || "برند"}
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#" style={linkStyle}>
                {value?.link1 || "Home"}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={linkStyle}>
                {value?.link2 || "Link"}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" style={linkStyle}>
                {value?.link3 || "Disabled"}
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder={value?.searchText || "Search"}
              style={{ borderRadius: value?.borderRadius }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{ color: value?.textColor, borderColor: value?.textColor }}
            >
              {value?.buttonText || "Search"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header3;
