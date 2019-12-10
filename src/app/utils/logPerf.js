import * as Sentry from '@sentry/browser'

export default async (name, url, promise) => {
  return new Promise((resolve, reject) => {
    try {
      Sentry.withScope(async scope => {
        const t0 = performance.now()
        scope.setExtra('apiUrl', url)

        Sentry.captureMessage(`Performance ${name}...`)
        const p = await promise.then(res => res.json())
        const t1 = performance.now()

        const time = t1 - t0

        console.log(url, time)

        scope.setTag('performance', `${Math.round(time / 10) * 10}`)
        scope.setExtra('performanceTime', time)

        resolve(p)
      })
    } catch (e) {
      return reject(e)
    }
  })
}
