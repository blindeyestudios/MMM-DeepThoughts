Module.register("MMM-DeepThought", {
  defaults: {
    updateInterval: 60 * 60 * 1000, // 1 hour
  },

  start() {
    this.inspiration = "Loading inspiration...";
    this.weirdThought = "Loading weirdness...";
    this.getThoughts();
    this.scheduleUpdate();
  },

  scheduleUpdate() {
    setInterval(() => {
      this.getThoughts();
    }, this.config.updateInterval);
  },

  getThoughts() {
    this.sendSocketNotification("GET_THOUGHTS");
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "THOUGHTS") {
      this.inspiration = payload.inspiration;
      this.weirdThought = payload.weirdThought;
      this.updateDom();
    }
  },

  getDom() {
    const wrapper = document.createElement("div");

    const inspire = document.createElement("div");
    inspire.innerHTML = `<strong>Inspiration:</strong> ${this.inspiration}`;

    const weird = document.createElement("div");
    weird.innerHTML = `<strong>Weird Thought:</strong> ${this.weirdThought}`;

    wrapper.appendChild(inspire);
    wrapper.appendChild(weird);
    return wrapper;
  }
});
