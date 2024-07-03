require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.telegramBotToken, { polling: true });

const channelIds = [
    "@awfxtradingplatform",
    "@alfafx0", 
];

const adminIds = [
    956003083,
    6666577780,
];

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function generateContentByGeminiModel(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

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
                    await bot.sendMessage(channelIds[i], await generateContentByGeminiModel(`أعد لي صياغة النص التالي: ${msg.text}`));
                }
            }
        } else await bot.sendMessage(msg.chat.id, "عذراً أنت لا تمتلك الصلاحية لكتابة منشور في  البوت");
    }
    catch(err) {
        console.log(err);
        await bot.sendMessage(msg.chat.id, "عذراً حدث خطأ أثناء المعالجة ، الرجاء إعادة المحاولة  !!");
    }
});