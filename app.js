const timelineLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" }
})

const timelineEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" }
})

const leaveAnimation = (currentElement, done) => {
  const product = currentElement.querySelector(".image-container")
  const text = currentElement.querySelector(".showcase-text")
  const circles = currentElement.querySelectorAll(".circle")
  const arrow = currentElement.querySelector(".showcase-arrow")

  return (
    timelineLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    timelineLeave.fromTo(product, { y: 0, opacity: 1 }, { y: -100, opacity: 0 }, '<'),
    timelineLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100, onComplete: done }, '<'),
    timelineLeave.fromTo(circles, { y: 0, opacity: 1 }, { y: 200, opacity: 0, stagger: 0.15, ease: "back.out(1.7)", duration: 1 }, '<')
  )
}

const enterAnimation = (currentElement, done, gradient) => {
  const product = currentElement.querySelector(".image-container")
  const text = currentElement.querySelector(".showcase-text")
  const circles = currentElement.querySelectorAll(".circle")
  const arrow = currentElement.querySelector(".showcase-arrow")

  return (
    timelineEnter.fromTo(arrow,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, onComplete: done }),
    timelineEnter.to('body', { background: gradient }, "<"),
    timelineEnter.fromTo(product, { y: -100, opacity: 0, }, { y: 0, opacity: 1 }, '<'),
    timelineEnter.fromTo(text, { opacity: 0, y: 100 }, { opacity: 1, y: 0 }, '<'),
    timelineEnter.fromTo(circles, { y: 200, opacity: 0, }, { y: 0, opacity: 1, stagger: 0.15, ease: "back.out(1.7)", duration: 1 }, '<')
  )
}

const productEnterAnimation = (currentElement, done) => {
  timelineEnter.fromTo(currentElement, { y: "100%" }, { y: "0%", duration: 0.5 })
  timelineEnter.fromTo(".card", { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.1, onComplete: done })
}


const productLeaveAnimation = (currentElement, done) => {
  timelineEnter.fromTo(currentElement, { y: "0%" }, { y: "100%", onComplete: done })
}


barba.init({
  preventRunning: true,
  transitions: [
    {
      name: "default",
      once(data) {
        const done = this.async()
        const next = data.next.container
        const gradient = getGradient(data.next.namespace)
        gsap.set('body', { background: gradient })
        enterAnimation(nextElement, done, gradient)
      },
      leave(data) {
        const done = this.async()
        const currentElement = data.current.container
        leaveAnimation(currentElement, done)
      },
      enter(data) {
        const done = this.async()
        const nextElement = data.next.container
        const gradient = getGradient(data.next.namespace)
        enterAnimation(nextElement, done, gradient)
      }
    },
    {
      name: "product-transition",
      sync: true,
      from: { namespace: ["handbag", "product"] },
      to: { namespace: ["product", "handbag"] },
      leave(data) {
        const done = this.async()
        const currentElement = data.current.container
        productLeaveAnimation(currentElement, done)

      },
      enter(data) {
        const done = this.async()
        const nextElement = data.next.container
        productEnterAnimation(nextElement, done)
      }
    },
  ]
})

function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)"
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)"
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)"
  }
}
