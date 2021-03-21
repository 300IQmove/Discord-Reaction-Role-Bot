import { Command } from "discord-akairo"

class PingCommand extends Command {
    constructor() {
        super("ping", {
            aliases: ['ping', 'pong', 'ding', 'dong'],
            description: "Shows the bot's ping",
            clientPermissions: ['SEND_MESSAGES'],
            userPermissions: [],
            cooldown: 5000,
            ratelimit: 1,
            category: "Others",
        })
    }

    async exec(message) {
        return message.channel.send(`Pong!\nAPI Ping: ${this.client.ws.ping}`)
    }
}

module.exports = PingCommand