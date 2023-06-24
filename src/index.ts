import {DataWorker} from "./workers/worker";
import {Publisher} from "./publishers/publisher";

import {Client, Collection, Events, ShardEvents, GatewayIntentBits, TextBasedChannel} from "discord.js";
import {BrawlerBearContractUpdateDetector} from "./workers/BrawlerBearContractUpdateDetector";
import {BearsChangeDetector} from "./workers/BearsChangeDetector";
import {BrawlerBearAttackContractUpdateDetector} from "./workers/BrawlerBearAttackContractUpdateDetector";
import {ClimateChangeDetector} from "./workers/ClimateChangeDetector";
import {BrawlerBearSalesDetector} from "./workers/BrawlerBearSalesDetector";
import {PendingBattleChangeDetector} from "./workers/PendingBattleChangeDetector";
import {MessageHandler} from "./message-handler";
import {EightiesBullContractUpdateDetector} from "./workers/EightiesBullContractUpdateDetector";
import {NinetiesBullContractUpdateDetector} from "./workers/NinetiesBullContractUpdateDetector";
import {VariationApesContractUpdateDetector} from "./workers/VariationApesContractUpdateDetector";
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
  new EightiesBullContractUpdateDetector(publisher),
  new NinetiesBullContractUpdateDetector(publisher),
  new VariationApesContractUpdateDetector(publisher)
]


client.on(ShardEvents.Ready, () => {
  let id = 0
  setInterval(() => {
    workers.forEach(worker => {
      worker.updateAndNotifyToPublisher().then(() => {})
    })
  }, 60000)
  client.channels.fetch(process.env.CHANNEL_ID || "").then((channel) => {
    publisher.initDiscordClient(channel as TextBasedChannel)
  })
})

client.on(Events.MessageCreate, msg => {
  const publisher = new Publisher()
  publisher.initDiscordClient(msg.channel)
  const messageHandler = new MessageHandler(publisher)
  messageHandler.processMessage(msg.content).then(() => {});
})

client.on(Events.MessageUpdate, msg => {
  const publisher = new Publisher()
  publisher.initDiscordClient(msg.channel)
  const messageHandler = new MessageHandler(publisher)
  messageHandler.processMessage(msg.reactions.message.content || "").then(() => {});
})
client.login(process.env.TOKEN || "");