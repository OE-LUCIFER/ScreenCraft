import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.screencraft.app',
  appName: 'ScreenCraft Pro',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorFileSystem: {
      readPermission: true,
      writePermission: true
    }
  }
}

export default config;