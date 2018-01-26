// Test suite https://mochajs.org/#getting-started
// Expectations https://github.com/Automattic/expect.js
// Botkit Tests https://github.com/gratifyguy/botkit-mock#basic-usage

const expect = require('expect.js');
const testBot = require('../helper');
const lunchController = require('../../skills/lunch');

describe('Lunch', () => {

  beforeEach(() => {
    this.bot = testBot();
    lunchController(this.bot.botkit);
  });

  afterEach(() => {
    this.bot.botkit.storage.lunchplans.all()
      .then(lunchPlans => {
        lunchPlans.forEach(lp => {
          this.bot.botkit.storage.lunchplans.delete(lp.id)
        })
      })
      .catch(error => console.error(error));
  });

  describe('when someone tells gordify start', () => {
    it('and there are no plans, it asks people out for lunch', () => {
      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
            text: 'start',
            isAssertion: true
        }]
      }
      return this.bot.usersInput([message]).then((reply) => {
        expect(reply.text).to.be('Ey! who is going to have lunch out today?');
      })
    });

    it('when there is a plan, it tells people about it', () => {
      this.bot.botkit.storage.lunchplans.save({
        id: `lunchs-${new Date().toLocaleDateString()}`,
        active: true
      });

      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'start',
          isAssertion: true
        }]
      }
      return this.bot.usersInput([message]).then((reply) => {
        expect(reply.text).to.be('There is a plan already :)');
      })
    })
  });

  describe('when someone says gordify yo', () => {
    it('and there is no plan', () => {
      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'yo',
          isAssertion: true
        }]
      }
      return this.bot.usersInput([message])
      .then((reply) => {
        expect(reply.text).to.be('There is no active plan yet');
      })
    })

    it('and there is a plan, it includes requester in the plan', () => {
      let lunchPlanId = `lunchs-${new Date().toLocaleDateString()}`;
      this.bot.botkit.storage.lunchplans.save({
        id: lunchPlanId,
        active: true,
        participants: []
      });

      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'yo',
          isAssertion: true
        }]
      }

      return this.bot.usersInput([message]).then((reply) => {
        expect(reply.text).to.be(`Pointed <@${message.user}> :wink:`);
        this.bot.botkit.storage.lunchplans.get(lunchPlanId)
          .then(lunchPlan =>{
            expect(lunchPlan.participants).to.contain('<@A>');
          })
          .catch(error => console.error(error));
      });
    });

    it('and plan is not active', () => {
      let lunchPlanId = `lunchs-${new Date().toLocaleDateString()}`;
      this.bot.botkit.storage.lunchplans.save({
        id: lunchPlanId,
        active: false,
        participants: []
      });

      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'yo',
          isAssertion: true
        }]
      }

      return this.bot.usersInput([message])
        .then((reply) => {
          expect(reply.text).to.be('The plan is not active');
        })
    });

  });

  describe('when someone says gordify stop', () => {

    it('and there is an active plan, it groups people', () => {
      let lunchPlanId = `lunchs-${new Date().toLocaleDateString()}`;
      this.bot.botkit.storage.lunchplans.save({
        id: lunchPlanId,
        active: true,
        participants: [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
        ]
      });

      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'stop',
          isAssertion: true
        }]
      }

      return this.bot.usersInput([message])
        .then((reply) => {
          expect(reply.text).to.match(/Group 1: (.,){4}/);
          expect(reply.text).to.match(/Group 2: (.,){4}/);
        })
    });

    it('and there is an active plan, it assigns group leaders', () => {
      let lunchPlanId = `lunchs-${new Date().toLocaleDateString()}`;
      this.bot.botkit.storage.lunchplans.save({
        id: lunchPlanId,
        active: true,
        participants: [
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'
        ]
      });

      let message = {
        user: 'A',
        channel: 'lunchs',
        type: 'direct_mention',
        messages: [{
          text: 'stop',
          isAssertion: true
        }]
      }

      return this.bot.usersInput([message])
        .then((reply) => {
          expect(reply.text).to.match(/(Leader: (.)*)*2/);
        })
    })

  });

});
