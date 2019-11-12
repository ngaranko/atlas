export default (endpoint, schema, variables) =>
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: schema,
      variables,
    }),
  }).then(res => res.json())
