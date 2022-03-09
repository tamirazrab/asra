const timelineLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" }
})

const timelineEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" }
})

const leaveAnimation = (currentElement, done) => {
  const product = currentElement.querySelector(".image-container")
  const text = currentElement.querySelector(".showcase-text")
  const circles = currentElement.querySelector(".circle")
  const arrow = currentElement.querySelector(".showcase-arrow")

  return (
    timelineLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
    timelineLeave.fromTo(product, { y: 0, opacity: 1 }, { y: -100, opacity: 0, onComplete: done }, '<'),
    timelineLeave.fromTo(text, { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, '<')
  )
}


barba.init({

  // preventRunning: true,
  transitions: [
    {
      name: "default",
      leave(data) {
        const done = this.async()
        console.log("🚀 ~ file: app.js ~ line 8 ~ leave ~ done", done)
        const currentElement = data.current.container
        console.log("🚀 ~ file: app.js ~ line 9 ~ leave ~ currentElement", currentElement)
        leaveAnimation(currentElement, done)
        // gsap.fromTo(currentElement, { opacity: 0 }, {
        //   opacity: 1, onComplete: () => {
        //     console.log("🚀 ~ file: app.js ~ line 16 ~ leave ~             complete")
        //     done()
        //   }
        //   ,
        // })
      },

      enter({ current, next }) {
        console.log("🚀 ~ file: app.js ~ line 13 ~ enter ~ data", data)
        const done = this.async()
        const nextElement = next.container
        gsap.fromTo(nextElement, { opacity: 0 }, {
          opacity: 1, duration: 1, onComplete:
            done
          ,
        })
      }
    }
  ]
})
