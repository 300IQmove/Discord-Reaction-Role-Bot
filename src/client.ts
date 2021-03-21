import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import * as config from "../config.json";
import path from "path";

declare module "discord-akairo" {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
  }
}

export class ReactionRoleClient extends AkairoClient {
  constructor(options: object) {
    super(options);

    this.commandHandler = new CommandHandler(this, {
      allowMention: true,
      handleEdits: true,
      prefix: config.prefix,
      blockBots: true,
      blockClient: true,
      ignoreCooldown: this.ownerID,
      ignorePermissions: this.ownerID,
      defaultCooldown: 5000,
      commandUtil: true,
      commandUtilLifetime: 150000,
      automateCategories: true,
      argumentDefaults: {
        prompt: {
          retries: 5,
          time: 20000,
          cancelWord: "cancel",
          modifyStart: (m, content) =>
            `${content}\n\nUse \`cancel\` to cancel the command.`,
          modifyRetry: (m, content) =>
            `${content}\n\nUse \`cancel\` to cancel the command.`,
          timeout: "You ran out of time..",
          ended: "You reached the maximum amount of retries..",
          cancel: "Command has been cancelled..",
        },
      },
      directory: path.join(__dirname, "commands"),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join(__dirname, "listeners"),
    });
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process: process,
    });

    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.commandHandler.loadAll();
    console.log(`Loaded commands`);
    this.listenerHandler.loadAll();
    console.log(`Loaded listeners`);
  }
}
