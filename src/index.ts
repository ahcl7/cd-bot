import {DataWorker} from "./workers/worker";
import {Publisher} from "./publishers/publisher";

import {Client, Collection, Events, ShardEvents, GatewayIntentBits, TextBasedChannel} from "discord.js";
import {BrawlerBearContractUpdateDetector} from "./workers/BrawlerBearContractUpdateDetector";
import {BearsChangeDetector} from "./workers/BearsChangeDetector";
import {BrawlerBearAttackContractUpdateDetector} from "./workers/BrawlerBearAttackContractUpdateDetector";
import {ClimateChangeDetector} from "./workers/ClimateChangeDetector";
import {BrawlerBearSalesDetector} from "./workers/BrawlerBearSalesDetector";
import {PendingBattleChangeDetector} from "./workers/PendingBattleChangeDetector";
const path = require("path")
const fs = require("fs");
const {BattleChangeDetector} = require("./workers/BattleChangeDetector");
require("dotenv").config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

const publisher = new Publisher()

const workers: DataWorker[] = [
  new BearsChangeDetector(publisher),
  new BattleChangeDetector(publisher),
  new BrawlerBearContractUpdateDetector(publisher),
  new BrawlerBearAttackContractUpdateDetector(publisher),
  new ClimateChangeDetector(publisher),
  new BrawlerBearSalesDetector(publisher),
  new PendingBattleChangeDetector(publisher),
]


client.on(ShardEvents.Ready, () => {
  console.log(`Loggined in as ${client?.user?.tag}`)
  let id = 0
  setInterval(() => {
    workers.forEach(worker => {
      worker.updateAndNotifyToPublisher()
    })
  }, 60000)
  client.channels.fetch(process.env.CHANNEL_ID || "").then((channel) => {
    publisher.initDiscordClient(channel as TextBasedChannel)
  })
})

console.log(process.env.TOKEN)
client.login(process.env.TOKEN || "");