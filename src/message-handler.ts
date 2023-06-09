import {Publisher} from "./publishers/publisher";
import {GetBearInfoCmd} from "./commands/get-bear-info-cmd";
import {getBearAttackInfoCmd} from "./commands/get-bear-attack-info-cmd";


const commands = {
  BearInfo: "!bearinfo",
  BearAttackInfo: "!attackinfo",
}

const commandMap = {
  [commands.BearInfo]: GetBearInfoCmd,
  [commands.BearAttackInfo]: getBearAttackInfoCmd,
}

export class MessageHandler {
  publisher: Publisher;
  constructor(publisher: Publisher) {
    this.publisher = publisher
  }
  async processMessage(msg: string) {
    const words = msg.split(" ");
    if (words.length == 0) {
    } else {
      const commandStr = words[0].toLowerCase();
      const params = words.splice(1);
      if (Object.values(commands).includes(commandStr)) {
        try {
          const command = new commandMap[commandStr](commandStr, params);
          const rs = await command.process();
          this.publisher.newMessage(rs);
        } catch (e) {
          if (e instanceof Error) {
            this.publisher.newMessage(e.message)
          }
        }
      }
    }
  }
}