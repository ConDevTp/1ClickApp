import { useContext } from "react";
import { PanelContext } from "../../Context/Context";
import { HeadersList, FootersList } from "../../Components/AllLists";
import SectionLayout from "../../Components/SectionLayout";
import "./index.css";
import "../Layout.css";
import CodeExtractor from "../../Export/Templates";

const MainLayout = () => {
  const { changedSectionsCount, resetAllData, activeItem, setActiveItem } =
    useContext(PanelContext);
  return (
    <main className="MainLayout position-relative px-3">
      <CodeExtractor />
      <div
        className={`Content-Overlay ${activeItem ? "Show-Overlay" : ""}`}
        onClick={() => setActiveItem(null)}
      />

      <SectionLayout id="Header" list={HeadersList} />
      <SectionLayout id="Footer" list={FootersList} />

      {changedSectionsCount >= 2 && (
        <button
          className="btn btn-danger position-fixed bottom-0 end-0 m-4 shadow"
          style={{ zIndex: 100 }}
          onClick={resetAllData}
        >
          ریست کل تغییرات ({changedSectionsCount})
        </button>
      )}
    </main>
  );
};

export default MainLayout;
