export const normalizeColorName = (v) =>
 String(v || "")
  .trim()
  .toLowerCase()
  .replace(/İ/g, "i")
  .replace(/I/g, "i")
  .replace(/ı/g, "i")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "");

export const COLOR_HEX_MAP = {
 siyah: "#000000",
 beyaz: "#ffffff",
 kirmizi: "#ef4444",
 mavi: "#3b82f6",
 yesil: "#22c55e",
 sari: "#facc15",
 turuncu: "#f97316",
 mor: "#a855f7",
 pembe: "#ec4899",
 gri: "#9ca3af",
 lacivert: "#1e3a8a",
 kahverengi: "#92400e",
 bej: "#e5d3b3",
};

export const getColorHex = (color) => {
 const hex = color?.hexCode;
 if (hex && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) return hex;
 const name = color?.name;
 const key = normalizeColorName(name);
 return COLOR_HEX_MAP[key] || "#e5e7eb";
};
