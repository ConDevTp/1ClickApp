export const getNestedValue = (obj, path) => {
  return path
    .split(/[.[\]]+/)
    .filter(Boolean)
    .reduce((acc, key) => acc?.[key], obj);
};

export const deepMerge = (base, override) => {
  if (override === undefined || override === null) return base;

  // 🌟 شاه‌کلید معماری: تشخیص ترکیبِ آرایه پایه با فرهنگ لغتِ تغییرات (State Normalization)
  const isBaseIdArray =
    Array.isArray(base) &&
    base.length > 0 &&
    base[0] &&
    typeof base[0] === "object" &&
    "id" in base[0];
  const isOverrideNormalized =
    override &&
    typeof override === "object" &&
    "byId" in override &&
    Array.isArray(override.allIds);

  if (isBaseIdArray && isOverrideNormalized) {
    return override.allIds
      .map((id) => {
        const bItem = base.find((b) => b && b.id === id);
        const oItem = override.byId[id];

        if (bItem && oItem) return deepMerge(bItem, oItem);
        if (bItem) return bItem; // آیتم پیش‌فرض بدون تغییر
        if (oItem) return oItem; // آیتم جدیدِ ساخته شده توسط کاربر
        return null;
      })
      .filter(Boolean);
  }

  // اگر پایه و اورراید هر دو آرایه ساده هستند (برای المان‌های قدیمی یا بدون ID)
  if (Array.isArray(base) && Array.isArray(override)) {
    return override;
  }

  // ادغام آبجکت‌های ساده
  if (
    typeof base === "object" &&
    base !== null &&
    typeof override === "object" &&
    override !== null &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  ) {
    const result = { ...base };
    for (const key in override) {
      result[key] = deepMerge(base[key], override[key]);
    }
    return result;
  }

  return override;
};

export const resolveSection = (schema, overrides = {}) => {
  if (!schema || !schema.defaults) {
    console.error(
      "❌ Schema is missing or invalid! Check your SchemaRegistry.",
    );
    return overrides;
  }
  return deepMerge(schema.defaults, overrides);
};
