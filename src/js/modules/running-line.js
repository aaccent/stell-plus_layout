function getWrapperItems(wrapper) {
  return wrapper.querySelectorAll('.running-line__item')
}

function setAnimationVariables(wrapper, wrapperWidth) {
  const firstItemWidth = wrapper.querySelector('.running-line__item')?.offsetWidth
  const width = firstItemWidth > wrapperWidth ? firstItemWidth : wrapperWidth
  const durationInMs = Math.trunc(width / 2500 * 5000)

  const computedStyles = getComputedStyle(wrapper)
  if (!computedStyles.getPropertyValue('--animation-duration')) {
    wrapper.style.setProperty('--animation-duration', `${durationInMs}ms`)
  }
  wrapper.style.setProperty('--animation-translate', `-${width}px`)
}


export function initRunningLine(wrapper) {
  const initWidth = wrapper.offsetWidth
  setAnimationVariables(wrapper, initWidth)

  const resizeObserver = new ResizeObserver(() => setAnimationVariables(wrapper, initWidth))

  let items = getWrapperItems(wrapper)
  const itemWidth = items[0].offsetWidth

  items.forEach((item) => resizeObserver.observe(item))

  let itemsCopied = 1

  while (itemWidth * items.length <= window.innerWidth || itemsCopied === 1) {
    const cloned = Array.from(items).map(item => item.cloneNode(true))
    wrapper.append(...cloned)
    items = getWrapperItems(wrapper)
    itemsCopied++
  }
}