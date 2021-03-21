import { Command } from "discord-akairo";
import db from "quick.db";

class RRRemoveCommand extends Command {
  constructor() {
    super("rrremove", {
      aliases: ["rrremove", "rremove", "rrdelete"],
      description: "Removes a reaction role from a specific message.",
      category: "Reaction Roles",
      cooldown: 10000,
      ratelimit: 1,
      clientPermissions: ["SEND_MESSAGES", "ADD_REACTIONS"],
      userPermissions: ["MANAGE_GUILD"],

      args: [
        {
          id: "messageID",
          type: "guildMessage",
          default: null,
          prompt: {
            start:
              "Please specify a message ID which has the reaction role you want to remove.",
            retry: "Please specify a valid message ID",
          },
        },
        {
          id: "emoji",
          type: "emoji",
          default: null,
          prompt: {
            start: "Please specify an emoji.",
            retry: "Please specify a valid emoji.",
          },
        },
      ],
    });
  }

  async exec(message, { messageID, emoji }) {
    const data = await db.fetch(
      `reactionRoles_${message.guild.id}_${messageID.id}_${emoji.id}`
    );
    if (!data)
      return message.channel.send(`That message is not a reaction role.`);
    else {
      messageID.reactions.removeAll();
      await db.delete(
        `reactionRoles_${message.guild.id}_${messageID.id}_${emoji.id}`
      );
      return message.channel.send(
        `That reaction role has been successfully removed.`
      );
    }
  }
}

module.exports = RRRemoveCommand;
