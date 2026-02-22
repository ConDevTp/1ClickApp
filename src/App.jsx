import { lazy, Suspense } from "react";
import { SectionWrapper } from "./components/Editor/SectionWrapper";
import SmartSidebar from "./components/Editor/SmartSidebar";
import { useSyncEngine } from "./hooks/useSyncEngine";
import { useStore } from "./store/useStore";

const ComponentRegistry = {
  "Header-1": lazy(() => import("./components/Headers/Header-1/Header1")),
  "Header-2": lazy(() => import("./components/Headers/Header-2/Header2")),
  "Header-3": lazy(() => import("./components/Headers/Header-3/Header3")),
  "Header-4": lazy(() => import("./components/Headers/Header-4/Header4")),
  "Hero-2": lazy(() => import("./components/Heros/Hero-2/Hero2")),
};

const App = () => {
  useSyncEngine();
  const sectionOrder = useStore((state) => state.sectionOrder);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "350px",
          borderRight: "1px solid #ddd",
          height: "100%",
          zIndex: 1000,
        }}
      >
        <SmartSidebar />
      </aside>
      <main
        style={{
          flexGrow: 1,
          height: "100%",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div style={{ minHeight: "100%" }}>
          {sectionOrder.map((sectionId) => {
            const section = useStore.getState().sections[sectionId];
            const Component = ComponentRegistry[section?.type];

            if (!Component) return null;

            return (
              // 🌟 تگ Suspense اومد اینجا! حالا فقط همون هدری که عوض میشه میره تو لودینگ
              <Suspense
                key={sectionId}
                fallback={
                  <div className="p-4 text-center text-primary">
                    در حال بارگذاری قالب...
                  </div>
                }
              >
                <SectionWrapper
                  sectionId={sectionId}
                  currentType={section?.type}
                >
                  <Component id={sectionId} />
                </SectionWrapper>
              </Suspense>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
