import { Amplify } from "aws-amplify";
import config from "../src/amplifyconfig.json";
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  Amplify.configure(config, { ssr: true });
});
