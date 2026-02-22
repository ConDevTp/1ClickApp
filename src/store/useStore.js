import { enableMapSet, produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SchemaRegistry } from "../schemas";
import { getNestedValue } from "../utils/resolver";

enableMapSet();

// 🌟 تابع کمکی برای تضمین مسطح بودن لیست‌ها قبل از ویرایش
const ensureNormalizedList = (section, type, listPath) => {
  const keys = listPath.split(/[.[\]]+/).filter(Boolean);
  let current = section.overrides;
  for (let i = 0; i < keys.length; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  if (!current.allIds) {
    const schemaDefaults = SchemaRegistry[type]?.defaults || {};
    const defaultArray = getNestedValue(schemaDefaults, listPath) || [];
    current.allIds = defaultArray.map((item) => item.id).filter(Boolean);
    current.byId = current.byId || {};
  }
  return current;
};

export const useStore = create(
  persist(
    (set, get) => ({
      sections: {
        "sec-primary": { id: "sec-primary", type: "Header-1", overrides: {} },
        "sec-secondary": {
          id: "sec-secondary",
          type: "Header-2",
          overrides: {},
        },
        "sec-tertiary": { id: "sec-tertiary", type: "Header-3", overrides: {} },
        "sec-fourth": { id: "sec-fourth", type: "Header-4", overrides: {} },
        "sec-hero": { id: "sec-hero", type: "Hero-2", overrides: {} },
      },
      sectionOrder: ["sec-primary", "sec-hero"],
      dirtyIds: new Set(),
      activeElement: { sectionId: null, fieldPath: null },

      past: [],
      future: [],
      lastSaveTime: 0,
      lastSavePath: null,

      saveHistory: () => {
        const { sections, sectionOrder, past } = get();
        const snapshot = JSON.parse(JSON.stringify({ sections, sectionOrder }));
        set({ past: [...past, snapshot].slice(-20), future: [] });
      },

      undo: () => {
        const { past, future, sections, sectionOrder } = get();
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        const currentSnapshot = JSON.parse(
          JSON.stringify({ sections, sectionOrder }),
        );
        set({
          past: newPast,
          future: [currentSnapshot, ...future],
          sections: previous.sections,
          sectionOrder: previous.sectionOrder,
          dirtyIds: new Set([...Object.keys(previous.sections)]),
          lastSavePath: null,
        });
      },

      redo: () => {
        const { past, future, sections, sectionOrder } = get();
        if (future.length === 0) return;
        const next = future[0];
        const newFuture = future.slice(1);
        const currentSnapshot = JSON.parse(
          JSON.stringify({ sections, sectionOrder }),
        );
        set({
          past: [...past, currentSnapshot],
          future: newFuture,
          sections: next.sections,
          sectionOrder: next.sectionOrder,
          dirtyIds: new Set([...Object.keys(next.sections)]),
          lastSavePath: null,
        });
      },

      deleteOverride: (sectionId, path) => {
        get().saveHistory();
        set(
          produce((state) => {
            const section = state.sections[sectionId];
            if (!section || !section.overrides) return;
            const keys = path.split(/[.[\]]+/).filter(Boolean);
            let current = section.overrides;
            for (let i = 0; i < keys.length - 1; i++) {
              if (current[keys[i]] === undefined) return;
              current = current[keys[i]];
            }
            delete current[keys[keys.length - 1]];
            state.dirtyIds.add(sectionId);
          }),
        );
      },

      removeListItem: (sectionId, listPath, itemId) => {
        get().saveHistory();
        set(
          produce((state) => {
            const section = state.sections[sectionId];
            if (!section) return;

            const listObj = ensureNormalizedList(
              section,
              section.type,
              listPath,
            );
            listObj.allIds = listObj.allIds.filter((id) => id !== itemId);
            delete listObj.byId[itemId];

            state.activeElement = { sectionId, fieldPath: null };
            state.dirtyIds.add(sectionId);
          }),
        );
      },

      changeSectionType: (sectionId, newType) => {
        get().saveHistory();
        set(
          produce((state) => {
            if (state.sections[sectionId]) {
              state.sections[sectionId].type = newType;
              state.sections[sectionId].overrides = {};
              state.activeElement = { sectionId: null, fieldPath: null };
              state.dirtyIds.add(sectionId);
            }
          }),
        );
      },

      updateOverride: (sectionId, path, value) => {
        const now = Date.now();
        const { lastSaveTime, lastSavePath, saveHistory } = get();

        if (path !== lastSavePath || now - lastSaveTime > 1000) saveHistory();
        set({ lastSaveTime: now, lastSavePath: path });

        set(
          produce((state) => {
            const section = state.sections[sectionId];
            if (!section) return;

            const listMatch = path.match(/(.*)\.byId\./);
            if (listMatch)
              ensureNormalizedList(section, section.type, listMatch[1]);

            const keys = path.split(/[.[\]]+/).filter(Boolean);
            let current = section.overrides;

            keys.forEach((key, i) => {
              if (i === keys.length - 1) {
                current[key] = value;
              } else {
                if (!current[key]) current[key] = {};
                current = current[key];
              }
            });

            state.dirtyIds.add(sectionId);
          }),
        );
      },

      addListItem: (sectionId, listPath) => {
        get().saveHistory();
        set(
          produce((state) => {
            const section = state.sections[sectionId];
            if (!section) return;

            const listObj = ensureNormalizedList(
              section,
              section.type,
              listPath,
            );

            const schemaDefaults = SchemaRegistry[section.type]?.defaults;
            const defaultArray = getNestedValue(schemaDefaults, listPath) || [];
            let template =
              Array.isArray(defaultArray) && defaultArray.length > 0
                ? defaultArray[0]
                : null;

            if (!template)
              template = {
                content: { text: "آیتم جدید", url: "#" },
                style: {},
              };

            const newItem = JSON.parse(JSON.stringify(template));
            newItem.id = crypto.randomUUID();
            if (newItem.content && newItem.content.text)
              newItem.content.text = "آیتم جدید";

            listObj.allIds.push(newItem.id);
            listObj.byId[newItem.id] = newItem;

            state.dirtyIds.add(sectionId);
          }),
        );
      },

      setActiveElement: (sectionId, fieldPath) =>
        set({ activeElement: { sectionId, fieldPath } }),
      clearDirtyIds: (ids) =>
        set((state) => ({
          dirtyIds: new Set([...state.dirtyIds].filter((id) => !ids.has(id))),
        })),
    }),
    {
      name: "site-builder-storage-v40",
      partialize: (state) => ({
        sections: state.sections,
        sectionOrder: state.sectionOrder,
      }),
    },
  ),
);
