import MainLayout from "./Layout/Main/MainLayout";
import SideLeft from "./Layout/SideLeft/SideLeft";
import SideRight from "./Layout/SideRight/SideRight";
import { PanelContext } from "./Context/Context";
import { useSiteManager } from "./Hooks/useSiteManager";
import "./index.css";

const App = () => {
  const siteManager = useSiteManager();

  return (
    <PanelContext.Provider value={siteManager}>
      <section className="AppContainer d-flex justify-content-between align-items-stretch">
        <SideLeft />
        <MainLayout />
        <SideRight />
      </section>
    </PanelContext.Provider>
  );
};

export default App;
