import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.macaron.neosysapp',
  appName: 'NeoSys App',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    // hostname: 'neosysapp.macaron.com',
    // allowNavigation: ['*'],
    // cleartext: true
  },
  SplashScreen: {
    launchAutoHide: true,
    launchShowDuration: 0
  },
  cordova: {
    preferences: {
      LottieFullScreen: "true",
      LottieHideAfterAnimationEnd: "true",
      LottieAnimationLocation: "assets/public/assets/splash.json",
      LottieScaleType: "CENTER_CROP",
      LottieFadeOutDuration: "300",
      LottieCancelOnTap: "true"
    }
  }
};

export default config;