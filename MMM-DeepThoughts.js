Module.register("MMM-DeepThoughts", {
    defaults: {
        updateInterval: 60 * 60 * 1000, // 1 hour
    },

    getStyles: function () {
        return ["MMM-DeepThoughts.css"];
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
        wrapper.className = "deep-thoughts";

        const inspire = document.createElement("div");
        inspire.innerHTML = `<strong>Inspiration:</strong> ${this.inspiration}`;
        inspire.className = "inspirational";

        const weird = document.createElement("div");
        weird.innerHTML = `<strong>Weird Thought:</strong> ${this.weirdThought}`;
        weird.className = "weird";

        wrapper.appendChild(inspire);
        wrapper.appendChild(weird);
        return wrapper;
    }
});
