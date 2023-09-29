import { TELEGRAM_BOT_TOKEN } from '../lib/constants.ts'
import { Bot, InlineKeyboard, Keyboard } from './deps.ts'

export const bot = new Bot(TELEGRAM_BOT_TOKEN, {
  client: {
    timeoutSeconds: 60,
    canUseWebhookReply: (method) => {
      console.log('botConfig :', method)
      return true
    },
  },
})

/**
 * Bot Commands
 */

const inlineKeyboard = new InlineKeyboard()
inlineKeyboard.webApp('Calorie Counter', 'https://calorie-counter.vercel.app')

const keyboard = new Keyboard();
keyboard.webApp('Calorie Counter', 'https://calorie-counter.vercel.app')

bot.command('start', (ctx) => ctx.reply('Welcome!', { reply_markup: inlineKeyboard }))

bot.command('app', (ctx) => ctx.reply('Welcome!', { reply_markup: keyboard }))

bot.command('ping', (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`))
