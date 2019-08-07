// eslint-disable-next-line consistent-return
;(() => {
  if (typeof window.CustomEvent === 'function') return false

  function CustomEvent(event, params = { bubbles: false, cancelable: false, detail: null }) {
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()
