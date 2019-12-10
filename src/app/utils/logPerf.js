import * as Sentry from '@sentry/browser'

export default async (name, promise) => {
  return new Promise((resolve, reject) => {
    try {
      return Sentry.configureScope(async scope => {
        const t0 = performance.now()
        scope.setExtra('apiName', name)

        Sentry.captureMessage(`Performance ${name}...`)
        const p = await promise.then(res => res.json())
        const t1 = performance.now()

        console.log('performance', `${Math.round((t1 - t0) / 10) * 10}`)

        scope.setTag('performance', `${Math.round((t1 - t0) / 10) * 10}`)

        return resolve(p)
      })
    } catch (e) {
      return reject(e)
    }
  })
}
