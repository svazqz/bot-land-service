export async function createRailwayService() {
  const mutation = `
    mutation serviceCreate {
      serviceCreate(
          input: {
            projectId: "${process.env.RAILWAY_PROJECT}"
            source: { repo: "railwayapp-templates/django" }
          }
      ) {
          id
      }
    }
  `;

  const url = `${process.env.RAILWAY_API_URL}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
  };

  const body = JSON.stringify({
    query: mutation,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Service created with ID:', JSON.stringify(result, null, 2));
      return result?.data?.serviceCreate?.id;
    } else {
      console.error('GraphQL Error:', result.errors);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
}
