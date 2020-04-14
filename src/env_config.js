const serverUrl = require("./config.json");
// Determines the host and redirects traffic respective from production to test /staging
const env_config = () => {
  if (window.location.hostname === serverUrl.STAGING_URL) {
    return serverUrl.STAGING_URL;
  } else if (window.location.hostname === serverUrl.PRODUCTION_URL) {
    return serverUrl.LOCAL_PRODUCTION_URLURL;
  } else {
    return serverUrl.LOCAL_URL;
  }
};

const addr = env_config();

export default addr;
