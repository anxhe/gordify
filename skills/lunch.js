const tools = require('../tools/javascript');

module.exports = (controller) => {

  controller.hears('start', 'direct_mention', (bot, message) => {

    const id = `${message.channel}-${new Date().toLocaleDateString()}`;
    controller.storage.lunchplans.get(id)
      .then((lunchPlan) => {
        if (!lunchPlan) {
          controller.storage.lunchplans.save({
            id: id,
            participants: [],
            active: true
          })
          return bot.reply(message, 'Ey, ¿quién va a almorzar hoy?');
        }
        console.log(lunchPlan.active)
        if (lunchPlan.active) return bot.reply(message, 'Ya hay un plan iniciado :)');
        bot.reply(message, 'Se acabaron los planes por hoy :cry:')
      })
      .catch(err => console.log(err));
  });

  controller.hears('yo', 'direct_mention', (bot, message) => {
    const id = `${message.channel}-${new Date().toLocaleDateString()}`;
    controller.storage.lunchplans.get(id)
      .then((lunchPlan)=> {
        if (!lunchPlan) return bot.reply(message, 'Aún no hay ningún plan activo');
        if (!lunchPlan.active) return bot.reply(message, 'El plan no está activo');

        if (lunchPlan.participants.indexOf(`<@${message.user}>`) < 0) {
          bot.reply(message, `Apuntado <@${message.user}> :wink:`)
          lunchPlan.participants.push(`<@${message.user}>`);
          controller.storage.lunchplans.save(lunchPlan);
        } else {
          bot.reply(message, `Ya te tengo contemplad@ :wink:`)
        }
      })
      .catch(err => console.log(err));
  });

  controller.hears('stop', 'direct_mention', (bot, message) => {
    const id = `${message.channel}-${new Date().toLocaleDateString()}`;
    controller.storage.lunchplans.get(id)
      .then((lunchPlan)=> {
        lunchPlan.active = false
        controller.storage.lunchplans.save(lunchPlan);
        let groups = tools.group(lunchPlan.participants);
        let reply = tools.groupReply(groups);
        bot.reply(message, reply);
      })
      .catch(err => console.log(err));
  });

}
