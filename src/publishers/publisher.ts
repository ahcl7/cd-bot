import {Client, Channel, TextBasedChannel} from "discord.js"
export class Publisher {
  discordChannel: TextBasedChannel | null
  constructor() {
    this.discordChannel = null
  }
  initDiscordClient(channel: TextBasedChannel | null) {
    this.discordChannel = channel
  }
  newMessage(msg: string) {
    if (this.discordChannel) {
      if (msg.length > 2000) {
        msg = msg.slice(0, 2000)
      }
      this.discordChannel.send(msg)
    }
  }
}