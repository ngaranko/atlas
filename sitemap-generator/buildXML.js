const fetch = require('isomorphic-fetch')

const API_ENDPOINT = 'https://api.data.amsterdam.nl/cms_search/search/'

function useSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

function buildUrlPart(results, urlPart) {
  return results.reduce(
    (acc, result) =>
      result.slug && result.uuid
        ? `${acc}<url><loc>https://data.amsterdam.nl/${urlPart}/${useSlug(result.slug)}/${
            result.uuid
          }/</loc><lastmod>${new Date(result.changed).toISOString()}</lastmod></url>`
        : '',
    '',
  )
}

module.exports = async () => {
  const { results: articleResults } = await fetch(`${API_ENDPOINT}article?page_size=9999`).then(
    data => data.json(),
  )
  const { results: publicationResults } = await fetch(
    `${API_ENDPOINT}publication?page_size=9999`,
  ).then(data => data.json())
  const { results: specialResults } = await fetch(`${API_ENDPOINT}special?page_size=9999`).then(
    data => data.json(),
  )

  let result =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

  if (articleResults && publicationResults) {
    result += buildUrlPart(articleResults, 'artikelen/artikel')
    result += buildUrlPart(publicationResults, 'publicaties/publicatie')
    result += buildUrlPart(specialResults, 'specials/special')
  }

  result += '</urlset>'

  return result
}
