const navLinks = document.querySelectorAll("nav a")
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    const targetEl = document.getElementById(targetId)
    const headerOffset = 70
    const elementPosition = targetEl.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  })
})

const track = document.getElementById("sliderTrack","servicesSliderTrack")
const speedSeconds = 30
function duplicateForLoop(el) {
  const children = Array.from(el.children)
  children.forEach((node) => el.appendChild(node.cloneNode(true)))
}
duplicateForLoop(track)
let rafId, start, totalScroll, pxPerMs
function getTrackWidth(el) {
  return Array.from(el.children).reduce((w, it) => {
    return w + it.getBoundingClientRect().width + 20
  }, 0)
}
function initAnimation() {
  cancelAnimationFrame(rafId)
  start = null
  const trackWidth = getTrackWidth(track)
  totalScroll = trackWidth / 2
  pxPerMs = totalScroll / (speedSeconds * 1000)
  rafId = requestAnimationFrame(step)
}
function step(t) {
  if (!start) start = t
  const dx = pxPerMs * (t - start)
  track.style.transform = `translateX(${-dx % totalScroll}px)`
  rafId = requestAnimationFrame(step)
}

const servicesTrack = document.getElementById("servicesSliderTrack")

// Apply the same animation system to services slider
if (servicesTrack) {
  duplicateForLoop(servicesTrack)

  let servicesRafId, servicesStart, servicesTotalScroll, servicesPxPerMs

  function initServicesAnimation() {
    cancelAnimationFrame(servicesRafId)
    servicesStart = null
    const trackWidth = getTrackWidth(servicesTrack)
    servicesTotalScroll = trackWidth / 2
    servicesPxPerMs = servicesTotalScroll / (speedSeconds * 1000)
    servicesRafId = requestAnimationFrame(servicesStep)
  }

  function servicesStep(t) {
    if (!servicesStart) servicesStart = t
    const dx = servicesPxPerMs * (t - servicesStart)
    servicesTrack.style.transform = `translateX(${-dx % servicesTotalScroll}px)`
    servicesRafId = requestAnimationFrame(servicesStep)
  }

  window.addEventListener("load", initServicesAnimation)
  window.addEventListener("resize", () => setTimeout(initServicesAnimation, 200))
}

window.addEventListener("load", initAnimation)
window.addEventListener("resize", () => setTimeout(initAnimation, 200))
const canvas = document.getElementById("particles")
const ctx = canvas.getContext("2d")
function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)
const particles = []
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  })
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = canvas.width
    if (p.x > canvas.width) p.x = 0
    if (p.y < 0) p.y = canvas.height
    if (p.y > canvas.height) p.y = 0
    ctx.beginPath()
    ctx.fillStyle = "rgba(14,165,233,0.8)"
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  })
  requestAnimationFrame(animateParticles)
}
animateParticles()


