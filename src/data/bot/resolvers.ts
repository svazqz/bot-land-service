import { Bot } from './types';
import { createAndDeployService } from '../../services/railway/createAndDeployService';
import { BotModel } from './model';

const getBot = (args: { id: string }): Bot | undefined => {
  // ToDo
  return undefined;
};

const getBots = async () => {
  const bots = await BotModel.getBotList();
  return bots;
};

const createBot = async (args: Omit<Bot, 'id'>): Promise<Bot | undefined> => {
  const id = await createAndDeployService(
    process.env.RAILWAY_PROJECT || '',
    process.env.GITHUB_REPOSITORY || '',
    args.token,
  );

  if (id) {
    const bot = { id, ...args };
    await BotModel.insertBot(bot);
    return bot;
  }
};

const updateBot = (args: Omit<Bot, 'name'>): Bot | undefined => {
  // ToDo
  return undefined;
};

const deleteBot = (args: Pick<Bot, 'id'>): string | undefined => {
  // ToDo
  return undefined;
};

export const botResolvers = {
  getBot,
  getBots,
  createBot,
  updateBot,
  deleteBot,
};
