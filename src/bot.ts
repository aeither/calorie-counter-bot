import { TELEGRAM_BOT_TOKEN } from '../lib/constants.ts'
import { Bot, Context, InlineKeyboard, Keyboard } from './deps.ts'

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

const WEBAPP_URL =
  Deno.env.get('NODE_ENV') === 'development'
    ? 'https://0b55-217-165-234-214.ngrok-free.app'
    : 'https://calorie-counter-jade.vercel.app'
console.log('WEBAPP_URL', WEBAPP_URL)

// const inlineKeyboard = new InlineKeyboard()
// inlineKeyboard.webApp('Calorie Counter', WEBAPP_URL)

const keyboard = new Keyboard()
keyboard.webApp('Calorie Counter', WEBAPP_URL)

bot.command('start', (ctx) => ctx.reply('Welcome!'))

bot.command('app', (ctx) => ctx.reply('Open App', { reply_markup: keyboard }))

bot.command('ping', (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`))

bot.filter(
  (ctx) => ctx.update.message !== undefined,
  (ctx) => {
    console.log('filtered')
    console.log(ctx.update.message?.web_app_data)
  },
)
