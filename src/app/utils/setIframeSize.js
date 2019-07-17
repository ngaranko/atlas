function setIframeSize(handleResize) {
  window.addEventListener(
    'message',
    e => {
      if (
        typeof e.data === 'string' &&
        e.data.indexOf('documentHeight:') > -1
      ) {
        const height = e.data.split('documentHeight:')[1]
        handleResize(height)
      }
    },
    false,
  )
}

export default setIframeSize
