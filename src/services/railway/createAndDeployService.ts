import { fetchGraphQL } from '../../utils/fetchGraphQL';

export async function createAndDeployService(
  projectId: string,
  repo: string,
  botToken: string,
) {
  try {
    const createServiceResponse = await fetchGraphQL(
      `
        mutation CreateService($input: ServiceCreateInput!) {
          serviceCreate(input: $input) {
            id
          }
        }
      `,
      {
        input: {
          projectId,
          source: { repo },
          variables: {
            TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
            TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
            TELEGRAM_BOT_TOKEN: botToken,
          },
        },
      },
    );

    const createServiceData: {
      data: {
        serviceCreate: {
          id: string;
        };
      };
    } & { errors: any } = (await createServiceResponse.json()) as any;

    if (createServiceResponse.ok && createServiceData.data) {
      const serviceId = createServiceData.data.serviceCreate.id;
      console.log('Service created with ID:', serviceId);

      const deployServiceResponse = await fetchGraphQL(
        `
        mutation DeployService($serviceId: String!, $environmentId: String!) {
          serviceInstanceDeploy(serviceId: $serviceId, environmentId: $environmentId)
        }
        `,
        {
          serviceId,
          environmentId: process.env.RAILWAY_ENV,
        },
      );

      const deployServiceData: {
        data: {
          serviceInstanceDeploy: boolean;
        };
      } & { errors: any } = (await deployServiceResponse.json()) as any;
      if (deployServiceResponse.ok && deployServiceData.data) {
        console.log(
          'Deployment status:',
          deployServiceData.data.serviceInstanceDeploy,
        );
      } else {
        console.error('Failed to deploy service:', deployServiceData.errors);
      }
      return serviceId;
    } else {
      console.error('Failed to create service:', createServiceData.errors);
    }
  } catch (e) {
    console.log(e);
  }
}
