function getWrapperItems(wrapper) {
  return wrapper.querySelectorAll('.running-line__item')
}

function setAnimationVariables(wrapper) {
  const durationInMs = wrapper.offsetWidth / .18

  wrapper.style.setProperty('--animation-duration', `${durationInMs}ms`)
  wrapper.style.setProperty('--animation-translate', `-${wrapper.offsetWidth}px`)
}


export function initRunningLine(wrapper) {
  setAnimationVariables(wrapper)

  let items = getWrapperItems(wrapper)
  const itemWidth = items[0].offsetWidth

  let itemsCopied = 1

  while (itemWidth * items.length <= window.innerWidth || itemsCopied === 1) {
    const cloned = Array.from(items).map(item => item.cloneNode(true))
    wrapper.append(...cloned)
    items = getWrapperItems(wrapper)
    itemsCopied++
  }
}