import { Amplify } from "aws-amplify";
import { DataStore, AuthModeStrategyType } from "aws-amplify/datastore";
import config from "../src/amplifyconfig.json";
// eslint-disable-next-line no-undef
export default defineNuxtPlugin(() => {
  Amplify.configure(config, { ssr: true });
});
