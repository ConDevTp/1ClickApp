import { useBuilder } from "../../../hooks/useBuilder";
import "./index.css";

const Header2 = ({ id }) => {
  const { data, getElementProps } = useBuilder(id);
  console.log(
    "Header2 render - menu items:",
    data?.menu?.items?.map((i) => i?.content?.text),
  );

  if (!data || !data.section) return null;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light Header-2"
      {...getElementProps("section")}
    >
      <div className="container-fluid">
        <a
          href={data.brand.content?.url || "#"}
          className="navbar-brand fw-bold"
          {...getElementProps("brand")}
        >
          {data.brand.content.text}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${id}-collapse`}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id={`${id}-collapse`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {data.menu.items?.map((link, index) => (
              <li className="nav-item" key={link?.id || index}>
                <a
                  href={link?.content?.url || "#"}
                  className="nav-link"
                  {...getElementProps(`menu.items[${index}]`)}
                >
                  {/* 🌟 علامت ؟ اضافه شد تا در صورت نبود متن، کرش نکند */}
                  {link?.content?.text || "بدون متن"}
                </a>
              </li>
            ))}
          </ul>

          {data.search.show && (
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder={data.search.input.placeholder}
                readOnly
                style={{
                  fontSize: data.section.style.fontSize,
                  fontFamily: data.section.style.fontFamily,
                }}
              />
              <button
                type="button"
                className="btn btn-outline-success custom-search-btn"
                {...getElementProps("search.button")}
              >
                {data.search.button.content.text}
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header2;
