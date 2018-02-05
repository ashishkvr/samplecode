import Permissions from 'react-native-permissions';
import AntaviSense from 'react-native-antavi-sense';
// locateAndTriggerUpload
const createConfig = () => JSON.stringify({
  disabled: false,
  enableStorage: true,
  enableUpload: true,
  url: "https://api.myantavi.com:10000",
  uploadPeriod: 3600,
  apiKey: "tourist",
  schedules: [
    {
      name: 'deviceLocationUpdate',
      interval: 60*30,
      action: {
        type: 'locate',
      }
    },
    // TODO decide if we need activity detection
    // {
    //   name: "activityUpdate",
    //   interval: 300,
    //   action: {
    //     type: "classify",
    //     url: SERVER_DB_URL+"todos/"+appId+":Activity:"+deviceId,
    //     auth: "Basic " + btoa(credentials.name + ":" + credentials.password),
    //     doc: {
    //         className: "Activity",
    //         appId: appId,
    //         uploaded: true,
    //         deviceStatusId: `${appId}:DeviceStatus:${deviceId}`
    //     }
    //   }
    // }
  ]
});
module.exports = {
 startSensing() {
    const config = createConfig();
    AntaviSense.storeConfig(config)
        .then(() => AntaviSense.activateStoredConfig())
        .then(() => AntaviSense.locate())
        .then(() => (config));
 },
 stopSensing() {
    AntaviSense.disableStoredConfig();
 },
 insertCustomData(key, data) {
    AntaviSense.insertCustomData(key, data);
 }
}