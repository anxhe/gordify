// https://github.com/gratifyguy/botkit-mock#basic-usage

const botMock = require('botkit-mock');

const testDB = require('botkit-storage-mongo')({
  mongoUri: 'mongodb://localhost/gordify_test',
  tables: ['lunchplans']
});

module.exports = () => {
  return botMock({storage: testDB}).spawn({ type: null });
}
