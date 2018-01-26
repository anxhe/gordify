var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {
        debug('Starting an onboarding experience!');

        bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
          if (err) {
            console.log(err);
          } else {
            convo.say('Soy un bot que acaba de unirse a su equipo');
            convo.say('¡Ahora debe / invitarme a un canal para que yo pueda ser útil!');
          }
        });
    })
}
