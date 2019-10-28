export default (schema, variables) =>
  fetch(`${process.env.ROOT}graphql/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: schema,
      variables,
    }),
  }).then(res => res.json())
