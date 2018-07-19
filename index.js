const install = function (Vue, options) {
  let $el = null

  let $pageX = 0

  let $draggable = false

  const on = function (elm, evtName, cb) {
    elm.addEventListener(evtName, cb)
  }

  const off = function (elm, evtName, cb) {
    elm.removeEventListener(evtName, cb)
  }

  const cancelBubble = function (e) {
    e.stopPropagation()
    e.preventDefault()
    e.cancelBubble = true
    e.returnValue = false
    return false
  }

  const handleMouseDown = function (e) {
    $draggable = true
    const { pageX } = e
    $pageX = pageX
    cancelBubble(e)
  }

  const handleMouseMove = function (e) {
    if (!$draggable) return
    const moveX = e.pageX - $pageX
    $pageX = e.pageX
    const previousElm = $el.previousElementSibling
    const nextElm = $el.nextElementSibling
    previousElm.style.width = (previousElm.offsetWidth + moveX) + 'px'
    nextElm.style.width = (nextElm.offsetWidth - moveX) + 'px'
    cancelBubble(e)
  }

  const handleMouseUp = function (e) {
    $draggable = false
    cancelBubble(e)
  }

  Vue.directive('col-resize', {
    bind (el) {
      $el = el
      on(el, 'mousedown', handleMouseDown)
      on(document, 'mousemove', handleMouseMove)
      on(document, 'mouseup', handleMouseUp)
    },

    inserted (el) {
      $el = el
      on(el, 'mousedown', handleMouseDown)
      on(document, 'mousemove', handleMouseMove)
      on(document, 'mouseup', handleMouseUp)
    },

    unbind (el) {
      $el = el
      off(el, 'mousedown', handleMouseDown)
      off(document, 'mousemove', handleMouseMove)
      off(document, 'mouseup', handleMouseUp)
    }
  })
}

export default install
