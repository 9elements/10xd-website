class LiteYTEmbed extends HTMLElement {
  connectedCallback() {
    this.videoId = this.getAttribute("videoid");
    this.playLabel = this.getAttribute("playlabel") || "Play";

    this.updatePoster();

    // Warm connections on hover
    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
      once: true,
    });

    // Add iframe on click
    this.addEventListener("click", () => this.addIframe());
  }

  static get observedAttributes() {
    return ["videoid"]; // React to changes in the videoid attribute
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "videoid" && oldValue !== newValue) {
      this.videoId = newValue;
      this.updatePoster();
      this.removeIframe(); // Remove existing iframe when videoid changes
    }
  }

  updatePoster() {
    this.posterUrl = `https://i.ytimg.com/vi/${this.videoId}/hqdefault.jpg`;
    this.style.backgroundImage = `url("${this.posterUrl}")`;
    LiteYTEmbed.addPrefetch("preload", this.posterUrl, "image");
  }

  removeIframe() {
    const iframe = this.querySelector("iframe");
    if (iframe) iframe.remove();
  }

  addIframe() {
    const params = new URLSearchParams(this.getAttribute("params") || "");
    params.append("autoplay", "1");

    const iframeEl = document.createElement("iframe");
    iframeEl.width = 560;
    iframeEl.height = 315;
    iframeEl.title = this.playLabel;
    iframeEl.allow =
      "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframeEl.allowFullscreen = true;
    iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
      this.videoId
    )}?${params.toString()}`;
    iframeEl.setAttribute("frameborder", "0");

    this.append(iframeEl);
    this.classList.add("lyt-activated");

    // Accessibility: Focus the iframe for screen readers
    iframeEl.focus();
  }

  static addPrefetch(kind, url, as) {
    const linkEl = document.createElement("link");
    linkEl.rel = kind;
    linkEl.href = url;
    if (as) {
      linkEl.as = as;
    }
    document.head.append(linkEl);
  }

  static warmConnections() {
    if (LiteYTEmbed.preconnected) return;

    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube-nocookie.com");
    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
    LiteYTEmbed.addPrefetch(
      "preconnect",
      "https://googleads.g.doubleclick.net"
    );
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");

    LiteYTEmbed.preconnected = true;
  }
}

// Register custom element
customElements.define("lite-youtube", LiteYTEmbed);
