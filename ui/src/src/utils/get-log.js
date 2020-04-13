export default function (self, url) {
  self.$f7.request.json(url, (data) => {
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
