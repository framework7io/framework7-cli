export default function (log) {
  return log
    .map((l) => {
      return l
        .replace(/(\[[0-9]?[0-9][m])/g, '')
        .replace(/↵/g, '\n')
        .replace(/[\x1b]/g, "")
        .trim();
    })
    .join('\n')
    .replace('https://patreon.com/vladimirkharlampidi', '<a href="https://patreon.com/vladimirkharlampidi" class="external" target="_blank">https://patreon.com/vladimirkharlampidi</a>');
}
