export class Command {
  cmd: string;
  args: string[];

  constructor(cmd: string, args: string[]) {
    this.cmd = cmd;
    this.args = args;
  }

  async process(): Promise<string> {
    return "";
  }

}