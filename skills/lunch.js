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

        if (lunchPlan.participants.indexOf(message.user) < 0) {
          bot.reply(message, `Apuntado <@${message.user}> :wink:`)
          lunchPlan.participants.push(`<@${message.user}>`);
          controller.storage.lunchplans.save(lunchPlan);
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
        let people = lunchPlan.participants
        people.sort(()=> {return Math.random() - 0.5})
        let size = people.length
        let groupCount = Math.ceil(size/7);
        let groupSize = Math.ceil(size/groupCount);
        let groups = [];

        for (let i = 0; i < groupCount; i++) {
          groups[i] = people.splice(0, groupSize);
        }
        let reply = '';
        for (group of groups) {
          let numGroup = groups.indexOf(group)+1
          let numRandom = group[Math.floor(Math.random()*(group.length))];
          reply += `Grupo ${numGroup}: ${group}\nLíder: ${numRandom}\n\n`;
        }
        bot.reply(message, reply);
      })
      .catch(err => console.log(err));
  });

}
