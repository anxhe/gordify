module.exports = (controller) => {
  controller.hears('ping', 'direct_message', (bot, message) => {
    bot.reply(message, 'pong');
  })
}
