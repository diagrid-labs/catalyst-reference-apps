import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        deeper: "#262e35",
        deep: "#303841",
        light: "#36404a",
        "text-primary": "#aebac1",
        "gray-primary": "#2f2e40",
        primary: "#00a884",
      },
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
        video: "16 / 9",
      },
    },
  },
};
