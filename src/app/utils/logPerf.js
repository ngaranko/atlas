import * as Sentry from '@sentry/browser'

export default async (name, url, promise) => {
  // eslint-disable-next-line consistent-return
  return new Promise((resolve, reject) => {
    try {
      Sentry.configureScope(async scope => {
        const t0 = performance.now()
        scope.setExtra('apiUrl', url)

        const p = await promise.then(res => res.json())
        const t1 = performance.now()

        const time = t1 - t0

        scope.setTag('performance', `${Math.round(time / 10) * 10}`)
        scope.setExtra('performanceTime', time)

        Sentry.captureMessage(`Performance ${name}...`)

        resolve(p)
      })
    } catch (e) {
      return reject(e)
    }
  })
}
