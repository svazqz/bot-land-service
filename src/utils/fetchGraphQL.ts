const RAILWAY_API_URL = process.env.RAILWAY_API_URL || '';
const API_TOKEN = process.env.RAILWAY_API_TOKEN || '';

export const fetchGraphQL = async (query: string, variables = {}) => {
  console.log('URL =>', RAILWAY_API_URL);
  const data = await fetch(RAILWAY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  return data;
};
