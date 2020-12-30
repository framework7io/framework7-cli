import { request } from 'framework7';

export default function (self, url) {
  request.json(url).then(({ data }) => {
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
