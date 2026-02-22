import { useEffect } from "react";
import { useStore } from "../store/useStore";

export const useSyncEngine = () => {
  // 🌟 روش درست و ضد ارور: دریافت هر فیلد به صورت جداگانه (Selector)
  const dirtyIds = useStore((state) => state.dirtyIds);
  const sections = useStore((state) => state.sections);
  const clearDirtyIds = useStore((state) => state.clearDirtyIds);

  useEffect(() => {
    // اگر دیتایی کثیف (تغییر یافته) نبود، کاری نکن
    if (!dirtyIds || dirtyIds.size === 0) return;

    const timer = setTimeout(async () => {
      const snapshot = new Set(dirtyIds);
      console.log("%c 🔄 Syncing Section Overrides...", "color: #0d6efd", [
        ...snapshot,
      ]);

      // شبیه‌سازی تاخیر اینترنت
      await new Promise((r) => setTimeout(r, 1000));

      [...snapshot].forEach((id) => {
        console.log(`Payload for ${id}:`, sections[id].overrides);
      });

      clearDirtyIds(snapshot);
      console.log("%c ✅ Sync Complete", "color: #198754");
    }, 2000);

    return () => clearTimeout(timer);
  }, [dirtyIds, sections, clearDirtyIds]);
};
