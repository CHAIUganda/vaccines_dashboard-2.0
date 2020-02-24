const serverUrl = require("./config.json");
// Determines the host and redirects traffic respective from production to test /staging
function env_config() {
  if (window.location.hostname === serverUrl.STAGING_URL) {
    return serverUrl.STAGING_URL;
  } else if (window.location.hostname === serverUrl.LOCAL_URL) {
    return serverUrl.LOCAL_URL;
  } else {
    return serverUrl.PRODUCTION_URL;
  }
}
let addr = env_config();

export default addr;
