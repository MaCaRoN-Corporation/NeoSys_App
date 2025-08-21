
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-lottie-splashscreen.LottieSplashScreen",
          "file": "plugins/cordova-plugin-lottie-splashscreen/dist/www/lottie-splashscreen.js",
          "pluginId": "cordova-plugin-lottie-splashscreen",
        "clobbers": [
          "lottie.splashscreen"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-lottie-splashscreen": "0.10.0"
    };
    // BOTTOM OF METADATA
    });
    