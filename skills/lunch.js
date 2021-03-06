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
          return bot.reply(message, 'Ey! who is going to have lunch out today?');
        }
        console.log(lunchPlan.active)
        if (lunchPlan.active) return bot.reply(message, 'There is a plan already :)');
        bot.reply(message, 'The plans are over for today :cry:')
      })
      .catch(err => console.log(err));
  });

  controller.hears('yo', 'direct_mention', (bot, message) => {
    const id = `${message.channel}-${new Date().toLocaleDateString()}`;
    controller.storage.lunchplans.get(id)
      .then((lunchPlan)=> {
        if (!lunchPlan) return bot.reply(message, 'There is no active plan yet');
        if (!lunchPlan.active) return bot.reply(message, 'The plan is not active');

        if (lunchPlan.participants.indexOf(`<@${message.user}>`) < 0) {
          bot.reply(message, `Pointed <@${message.user}> :wink:`)
          lunchPlan.participants.push(`<@${message.user}>`);
          controller.storage.lunchplans.save(lunchPlan);
        } else {
          bot.reply(message, `I already have you contemplated :wink:`)
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
