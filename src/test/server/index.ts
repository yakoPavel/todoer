/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
export const initMocks = () => {
  if (!!process.env.REACT_APP_API_MOCKING === true) {
    if (typeof window === "undefined") {
      const { server } = require("./server");
      server.listen();
    } else {
      const { worker } = require("./browser");
      worker.start({ quiet: true, onUnhandledRequest: "bypass" });
    }
  }
};
