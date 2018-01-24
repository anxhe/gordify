module.exports = (controller) => {
  controller.hears('start', 'direct_mention', (bot, message) => {
    bot.reply(message, 'Ey, ¿quién va a almorzar hoy?');
  })
}
