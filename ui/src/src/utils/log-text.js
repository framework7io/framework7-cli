export default function (log) {
  log = log.map((l) => {
    return l
      .replace(/(\[[0-9]?[0-9][m])/g, '')
      .replace(/↵/g, '\n')
      .replace(/[\x1b]/g, '')
      .trim();
  });

  const indexesToRemove = [];
  log.forEach((line, index) => {
    if (line.indexOf('✔') < 0) return;
    const text = line.replace(/✔/g, '').trim();
    const sameTextItem = log.filter((line) => line.indexOf(text) === 0)[0];
    if (!sameTextItem) return;
    indexesToRemove.push(log.indexOf(sameTextItem));
  });
  for (let i = log.length - 1; i >= 0; i -= 1) {
    if (indexesToRemove.indexOf(i) >= 0) {
      log.splice(i, 1);
    }
  }
  return log
    .join('\n')
    .replace(/✔/g, '<span class="text-color-green">✔</span>')
    .replace(/ℹ/g, '<span class="text-color-yellow">ℹ</span>')
    .replace(
      /LOADING/g,
      `<span class="preloader">
        <span class="preloader-inner">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16"></circle>
          </svg>
        </span>
      </span>`,
    )
    .replace(
      'https://patreon.com/framework7',
      '<a href="https://patreon.com/framework7" class="external" target="_blank">https://patreon.com/framework7</a>',
    )
    .replace(
      'https://opencollective.com/framework7',
      '<a href="https://opencollective.com/framework7" class="external" target="_blank">https://opencollective.com/framework7</a>',
    );
}
