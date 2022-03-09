barba.init({
  preventRunning: true,
  transistions: [
    {
      name: "default",
      leave(data) {
        const done = this.async()
        const currentElement = data.current.container
        gsap.fromTo(current, { opacity: 1 }, { opacity: 0, duration: 1, onComplete: done })
      },

      enter(data) {

        const done = this.async()
        const nextElement = data.next.container
        gsap.fromTo(nextElement, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: done })
      }
    }
  ]
})
