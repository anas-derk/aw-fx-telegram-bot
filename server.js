require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.telegramBotToken, { polling: true });

const channelIds = [
    "@awfx0",
    "@awfx1",
    "@awfx3",
    "@awfx4",
    "@awfx6",
    "@awfx7",
    "@awfx8",
    
];

const adminIds = [
    956003083,
    5291202137,
];

bot.onText(/\/start/, async (msg) => {
    try{
        await bot.sendMessage(msg.chat.id, "مرحباً بك في البوت الخاص بنا");
    }
    catch(err) {
        throw Error(err);
    }
});

bot.on("message", async (msg) => {
    try{
        if (adminIds.includes(msg.from.id)) {
            if (msg.text !== "/start") {
                for(let i = 0; i < channelIds.length; i++) {
                    await bot.sendMessage(channelIds[i], msg.text);
                }
            }
        } else await bot.sendMessage(msg.chat.id, "عذراً أنت لا تمتلك الصلاحية لكتابة منشور في  البوت");
    }
    catch(err) {
        throw Error(err);
    }
});