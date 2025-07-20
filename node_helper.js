const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
  start() {
    console.log("MMM-DeepThought helper started");
  },

  async socketNotificationReceived(notification, payload) {
    if (notification === "GET_THOUGHTS") {
      const inspiration = await this.getInspiration();
      const weirdThought = await this.getWeirdThought();
      this.sendSocketNotification("THOUGHTS", { inspiration, weirdThought });
    }
  },

  async getInspiration() {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();
      return `${data[0].q} — ${data[0].a}`;
    } catch (e) {
      return "Be your best self.";
    }
  },

  async getWeirdThought() {
  const url = 'https://www.reddit.com/r/Showerthoughts/hot.json?limit=50';
  const res = await fetch(url, { headers: { 'User-Agent': 'MyMirrorModule/1.0' }});
  const json = await res.json();
  const posts = json.data.children;
  if (posts.length === 0) return "No thoughts found.";
  const choice = posts[Math.floor(Math.random() * posts.length)].data.title;
  return choice;
}
});
