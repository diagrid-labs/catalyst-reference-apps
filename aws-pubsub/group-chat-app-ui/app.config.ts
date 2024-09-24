export default defineAppConfig({
  ui: {
    primary: "violet",
    gray: "cool",
    modal: {
      wrapper: "relative z-[105]",
      padding: "p-0",
      container:
        "flex min-h-full items-end items-center justify-center text-center mx-4",
      overlay: {
        base: "fixed inset-0 transition-opacity",
        background: "bg-[#0c1317] bg-opacity-90",
      },
    },
  },
});
