import {Publisher} from "../publishers/publisher";
const gitDiff = require("git-diff")


export class DataWorker {
  curData: string;
  newData: string;
  isInit: boolean;
  name: string;
  publisher: Publisher;
  constructor(publisher: Publisher, name: string) {
    this.curData = ""
    this.newData = ""
    this.isInit = false
    this.publisher = publisher
    this.name = name
  }

  compareAndNotifyToPublisher() {
    const diff = gitDiff(this.curData, this.newData, {flags: "--diff-algorithm=minimal --unified=0 --ignore-all-space "});
    if (!!diff) {
      this.publisher.newMessage(`**${this.name}**\n\`\`\`diff\n${diff}\n\`\`\``);
    }
  }

  async fetchNewData(): Promise<string> {
    return "";
  }
  async updateAndNotifyToPublisher() {
    try {
      this.newData = await this.fetchNewData()
      if (this.isInit) this.compareAndNotifyToPublisher()
      else {
        this.isInit = true;
      }
      this.curData = this.newData
    } catch (e) {
      console.log("Worker error: ", e)
    }
  }
}

