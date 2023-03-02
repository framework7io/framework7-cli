export default function (self, url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.done) {
        self.done = true;
      }
      if (data.error) {
        self.error = true;
      }
      self.log = data.log;
      if (self.done || self.error) return;
      setTimeout(() => {
        self.getLog();
      }, 1000);
    });
}
