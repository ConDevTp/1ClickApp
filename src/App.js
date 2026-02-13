import { PanelContext } from "./Context/Context";
import { HeadersList, FootersList } from "./Components/AllLists";
import SectionLayout from "./Components/SectionLayout";
import EditPanel from "./Panel/EditPanel";
import { useSiteManager } from "./Hooks/useSiteManager";

const App = () => {
  const siteManager = useSiteManager();

  return (
    <PanelContext.Provider value={siteManager}>
      <div
        className={`Slider-Overlay ${siteManager.activeItem ? "Overlay-Active" : ""}`}
        onClick={() => siteManager.setActiveItem(null)}
      />

      <SectionLayout id="Header" list={HeadersList} />
      <SectionLayout id="Footer" list={FootersList} />

      <EditPanel />

      {siteManager.changedSectionsCount >= 2 && (
        <button className="reset-all-btn" onClick={siteManager.resetAllData}>
          ریست کل سایت
        </button>
      )}
    </PanelContext.Provider>
  );
};

export default App;
