export const Header3Schema = {
  type: "Header-3",
  defaults: {
    section: {
      style: { backgroundColor: "#f8f9fa", padding: "10px 0" },
    },
    brand: {
      content: { text: "Navbar" },
      style: { color: "#000000", fontSize: "20px", fontWeight: "700" },
    },
    search: {
      input: { placeholder: "Search..." },
      button: { text: "Search", style: { color: "#198754" } },
    },
  },
};
