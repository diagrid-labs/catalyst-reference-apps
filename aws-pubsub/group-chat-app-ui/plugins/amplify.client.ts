import { Amplify } from "aws-amplify";
import config from "../src/amplifyconfiguration.json";
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  Amplify.configure(config, { ssr: true });
});
