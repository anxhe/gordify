# Gordify

Gordify is a chat bot that helps you organize lunch-out plans for your slack team.

It has been built with howdy's botkit framework and is ready for you to use at the following URL:  https://gordify.herokuapp.com.

# Bot interactions

Once you add the Gordify to any channel within your slack's workspace your team members can interact with it:  

- When someone says `@gordify start`, the bot will prepare a lunch plan and will ask people out for lunch: `Ey! who is going to have lunch out today?`.
- When someone says `@gordify yo` and there's a lunch plan prepared, the bot will include the person in the plan and will reply with: `Pointed @<username> 😉`
- When someone says `@gordify stop`, and there's a lunch plan the bot will stop accepting people and it will organize them in groups (maximum group size is seven) and assign leader to each group, e.g.

```
someone:
  @gordify stop
gordify:
  Group 1: @helen,@peter,@susan,@george
  Leader: @susan

  Group 2: @claire,@maria,@mark,@hugo
  Leader: @maria
```

## Slack App Setup

First, run `ngrok http 3000` this will give an URL that we will need to allow slack to communicate with your bot.

Then, create a new slack app following docs at https://api.slack.com/slack-apps.

Grab your app client id and secret, and [start setting up the bot in development](#development), then come back when ready.

Make sure to enable the following features in your slack app:

- Bot User: Name for your bot
- Permissions: Use `<YOUR NGROK URL>/oauth` as your redirect URL.
- Events Subscriptions:
  - Use `<YOUR NGROK URL/slack/receive>` as webhook URL.
  - Subscribe to bot events: `app_mention`, `message.channels`, and `message.im`.

## Development

You will need the following:

- NodeJS V8
- MongoDB
- Ngrok (or similar)
- A slack app ([see below](#slack-app-setup))
- Yarn (optional)
- NVM (optional)

Then you can install it with:

```sh
$ git clone https://github.com/anxhe/gordify
$ cd gordify
$ yarn install
$ echo -e "MONGO_URI=mongodb://localhost/gordify_dev\nclientId=<YOUR SLACK CLIENT ID>\nclientSecret=<YOUR SLACK CLIENT SECRET>" > .env
```

Now you can start it with as follows:

```sh
$ yarn run dev
```

Then visit http://localhost:3000 and click on 'Add to Slack' button and authorize bot to joing your Slack's workspace.

NOTE: By default gordify runs on PORT 3000, this can be changed in .env file.

## Tests

```
$ yarn run test
```
