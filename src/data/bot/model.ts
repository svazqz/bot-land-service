import { db } from '../../db/index';
import { botTable } from '../../db/schema';

export class BotModel {
  public static async insertBot(bot: typeof botTable.$inferInsert) {
    return db.insert(botTable).values(bot);
  }
  public static async getBotList() {
    // : typeof botTable.$inferInsert
    const botList = db.select().from(botTable);
    return botList;
  }
}
