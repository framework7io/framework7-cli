const templateIf = require('./template-if');

module.exports = (options) => {
  const {
    bundler,
    type,
  } = options;

  return `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Misc
.DS_Store
Thumbs.db

${templateIf(type.indexOf('cordova') >= 0, () => `
# Cordova
cordova/platforms/
cordova/plugins/
cordova/www/
`)}

${templateIf(type.indexOf('capacitor') >= 0, () => `
# Capacitor
ios/App/public/
!ios/App/public/native-bridge.js
android/app/src/main/assets/public
!android/app/src/main/assets/public/native-bridge.js
`)}

${templateIf(bundler, () => `
# Production build
www/
`)}
`;
};
