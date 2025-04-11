import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (document.querySelector(".grid-background")) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    "html",
    {
      "--grid-offset": "0",
    },
    {
      scrollTrigger: {
        toggleAction: "restart pause reverse pause",
        trigger: ".grid-background",
        scrub: true,
      },
      "--grid-offset": "-2",
      duration: 4,
    }
  );
}
