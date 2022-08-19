import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const animate = (options) => {
  let type = options?.type ? options?.type : ""

  let animationPayload = {
    opacity: options?.opacity ? options?.opacity : 0,
    y: options?.y ? options?.y : 0,
    x: options?.x ? options?.x : 0,
    duration: options?.duration ? options.duration : 0.5,
    stagger: options?.stagger ? options.stagger : 0.2,
  }

  if (options?.isScrollTrigger) {
    animationPayload.scrollTrigger = options.animateOn
  }

  switch (type) {
    case "from":
      gsap.from(options.target, animationPayload)
      break
    case "to":
      gsap.to(options.target, animationPayload)
      break
    default:
      break
  }
}
