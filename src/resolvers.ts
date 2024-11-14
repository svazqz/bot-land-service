import bots from './db/database';
import { createAndDeployService } from './consumers/createAndDeployService';
import { getProjectInfo } from './consumers/getProjectInfo';

type Bot = {
  id: string;
  name: string;
  description: string;
  flow: string;
};

const getBot = (args: { id: string }): Bot | undefined => {
  return bots.find((bot) => bot.id === args.id);
};

const getBots = async (): Promise<Bot[]> => {
  const data = await getProjectInfo();
  console.log(data);
  return bots;
};

const createBot = async (args: Omit<Bot, 'id'>): Promise<Bot | undefined> => {
  const id = await createAndDeployService(
    process.env.RAILWAY_PROJECT || '',
    process.env.GITHUB_REPOSITORY || '',
  );

  if (id) {
    // create pet object and save
    const bot = { id: '', ...args };
    bots.push(bot);
    return bot;
  }
};

const updateBot = (args: Omit<Bot, 'name'>): Bot => {
  // loop through pets array and get object of pet
  const index = bots.findIndex((bot) => bot.id === args.id);
  const bot = bots[index];

  // update field if it is passed as an argument
  if (args.description) bot.description = args.description;
  if (args.flow) bot.flow = args.flow;

  return bot;
};

const deleteBot = (args: Pick<Bot, 'id'>): string => {
  // loop through pets array and delete pet with id
  const index = bots.findIndex((bot) => bot.id === args.id);
  if (index !== -1) {
    bots.splice(index, 1);
  }

  return args.id;
};

export const root = {
  getBot,
  getBots,
  createBot,
  updateBot,
  deleteBot,
};
