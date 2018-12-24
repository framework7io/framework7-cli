const indent = require('../utils/indent');
const { colorThemeCSSProperties } = require('../utils/colors');

module.exports = (options) => {
  const {
    template,
    customColor,
    color,
    type,
  } = options;

  let styles = '';

  if (type.indexOf('cordova') >= 0) {
    styles += indent(0, `
      /* iOS Cordova Tweak */
      .device-cordova.device-ios {
        height: 100vh;
      }
    `);
  }

  if (customColor && color) {
    const customProps = colorThemeCSSProperties(`#${color}`);
    styles += indent(0, `
      /* Custom color theme properties */
      :root {
        ${Object.keys(customProps).map(prop => `${prop}: ${customProps[prop]};`).join('\n        ')}
      }
    `);
  }

  if (template === 'split-view') {
    styles += indent(0, `
      /* Left Panel right border when it is visible by breakpoint */
      .panel-left.panel-visible-by-breakpoint:before {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 1px;
        background: rgba(0,0,0,0.1);
        content: '';
        z-index: 6000;
      }

      /* Hide navbar link which opens left panel when it is visible by breakpoint */
      .panel-left.panel-visible-by-breakpoint ~ .view .navbar .panel-open[data-panel="left"] {
        display: none;
      }

      /*
        Extra borders for main view and left panel for iOS theme when it behaves as panel (before breakpoint size)
      */
      .ios .panel-left:not(.panel-visible-by-breakpoint).panel-active ~ .view-main:before,
      .ios .panel-left:not(.panel-visible-by-breakpoint).panel-closing ~ .view-main:before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 1px;
        background: rgba(0,0,0,0.1);
        content: '';
        z-index: 6000;
      }
    `);
  } else {
    styles += indent(0, `
      /* Your app custom styles here */
    `);
  }

  return styles.trim();
};
