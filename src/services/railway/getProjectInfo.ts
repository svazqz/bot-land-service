export async function getProjectInfo() {
  const query = `
    query projects {
      projects {
        edges {
          node {
            name
            environments {
              edges {
                node {
                  id
                }
              }
            }
            services {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const url = `${process.env.RAILWAY_API_URL}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.RAILWAY_API_TOKEN}`,
  };

  const body = JSON.stringify({
    query,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });
    const result = await response.json();
    const {
      data: {
        projects: {
          edges: [project],
        },
      },
    } = result;
    const {
      environments: {
        edges: [env],
      },
    } = project;
    if (response.ok) {
      console.log('Service created with ID:', JSON.stringify(project, null, 2));
      return project;
    } else {
      console.error('GraphQL Error:', (result as any).errors);
    }
  } catch (error) {
    console.error('Network Error:', error);
  }
}
