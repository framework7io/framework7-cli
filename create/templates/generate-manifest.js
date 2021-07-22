module.exports = (options) => {
  const { name, theming, bundler } = options;
  const iconsFolder = bundler ? 'public' : 'assets';
  const manifest = {
    name,
    short_name: name,
    description: name,
    lang: 'en-US',
    start_url: '/',
    display: 'standalone',
    background_color: theming.customColor && theming.color ? `${theming.color}` : '#EE350F',
    theme_color: theming.customColor && theming.color ? `${theming.color}` : '#EE350F',
    icons: [
      {
        src: `/${iconsFolder}/icons/128x128.png`,
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: `/${iconsFolder}/icons/144x144.png`,
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: `/${iconsFolder}/icons/152x152.png`,
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: `/${iconsFolder}/icons/192x192.png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: `/${iconsFolder}/icons/256x256.png`,
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: `/${iconsFolder}/icons/512x512.png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
  return JSON.stringify(manifest, null, 2);
};
