import { Command } from "discord-akairo";
import db from "quick.db";

class RRAddCommand extends Command {
  constructor() {
    super("rradd", {
      aliases: ["rradd", "reactionroleadd"],
      description: "Adds a reaction role to a message.",
      category: "Reaction Roles",
      clientPermissions: ["SEND_MESSAGES", "MANAGE_ROLES", "MANAGE_MESSAGES"],
      userPermissions: ["MANAGE_GUILD"],
      cooldown: 10000,
      ratelimit: 1,

      args: [
        {
          id: "messageID",
          type: "guildMessage",
          default: null,
          prompt: {
            start: "Please specify a message ID.",
            retry: "Please specify a valid message ID",
          },
        },
        {
          id: "emoji",
          type: "emoji",
          default: null,
          prompt: {
            start: "Please specify an emoji.",
            retry: "Please speicfy a valid emoji.",
          },
        },
        {
          id: "role",
          type: "role",
          prompt: {
            start: "Please specify a role.",
            retry: "Please specify a valid role.",
          },
        },
      ],
    });
  }

  async exec(message, { messageID, emoji, role }) {
    await db.set(
      `reactionRoles_${message.guild.id}_${messageID.id}_${emoji.id}`,
      {
        role: role.id,
      }
    );
    messageID.react(emoji);
    return message.channel.send(
      `Successfully created a reaction role.\nMessage: ${messageID.url}\nEmoji: ${emoji}\nRole: **${role.name}**`
    );
  }
}

module.exports = RRAddCommand;
