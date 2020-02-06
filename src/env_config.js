const serverUrl = require("./config.json");
// Determines the host and redirects traffic respective from production to test /staging
function env_config() {
  if (window.location.hostname === serverUrl.STAGING_URL) {
    return serverUrl.STAGING_URL;
  } else {
    return serverUrl.LOCAL_URL;
  }
}
let addr = env_config();

export default addr;
