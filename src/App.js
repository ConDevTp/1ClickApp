import { useEffect, useState } from "react";
import { PanelContext } from "./Context/Context";
import { HeadersList, FootersList } from "./Components/AllLists";
import SectionLayout from "./Components/SectionLayout";

const App = () => {
  const [IsPanelOpen, SetPanelOpen] = useState(false);

  useEffect(() => {
    if (IsPanelOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [IsPanelOpen]);

  return (
    <PanelContext.Provider value={{ IsPanelOpen, SetPanelOpen }}>
      <div
        className={`Slider-Overlay ${IsPanelOpen ? "Overlay-Active" : ""}`}
        onClick={() => SetPanelOpen(false)}
      />

      {/* هدرها */}
      <SectionLayout id="Headers-Section" list={HeadersList} />

      {/* فوترها */}
      <SectionLayout id="Footers-Section" list={FootersList} />

      {/* سکشن‌های بعدی فقط یک خط کد هستند */}
      {/* <SectionLayout id="Hero-Section" list={HeroList} /> */}
    </PanelContext.Provider>
  );
};

export default App;
