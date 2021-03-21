import { Listener } from "discord-akairo"
import ms from "ms"

export default class CooldownEvent extends Listener {
    constructor() {
        super("cooldown", {
            emitter: 'commandHandler',
            event: "cooldown"
        })
    }

    exec(message, command, remaining) {
        const embed = this.client.util.embed()
            .setTitle(`You're on cooldown`)
            .setDescription(`You are on a cooldown, please wait **${ms(remaining, { long: true })}** before running the **${command}** command.`)
            .setColor('RED')
        return message.channel.send(embed)
    }
}