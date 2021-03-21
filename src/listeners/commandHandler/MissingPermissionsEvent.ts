import { Listener } from "discord-akairo";

export default class MissingPermissionsEvent extends Listener {
  constructor() {
    super("missingPermissions", {
      emitter: "commandHandler",
      event: "missingPermissions",
    });
  }

  exec(message, command, type, missing) {
    if (type === "client") {
      const embed = this.client.util
        .embed()
        .setTitle(`Missing Permissions`)
        .setDescription(
          `I need ${missing.join(
            ", "
          )} permissions to execute the ${command} command. Please give me enough permissions.`
        )
        .setColor("RED");
      return message.channel.send(embed);
    } else if (type === "user") {
      const embed = this.client.util
        .embed()
        .setTitle(`Missing Permissions`)
        .setDescription(
          `You need ${missing.join(
            ", "
          )} permissions. Please make sure you have enough permissions to run the ${command} command.`
        )
        .setColor("RED");
      return message.channel.send(embed);
    }
  }
}
