import { Listener } from "discord-akairo";
import db from "quick.db";

export default class MessageReactionRemoveEvent extends Listener {
  constructor() {
    super("messageReactionRemove", {
      emitter: "client",
      event: "messageReactionRemove",
    });
  }

  async exec(messageReaction, user) {
    const data = await db.fetch(
      `reactionRoles_${messageReaction.message.guild.id}_${messageReaction.message.id}_${messageReaction.emoji.id}`
    );
    if (!data) return;
    else {
      const member = await messageReaction.message.guild.members.fetch(user.id);
      const role = messageReaction.message.guild.roles.cache.get(data.role);
      member.roles.remove(role, `Reaction roles`);
    }
  }
}
