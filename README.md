# Gordify

Gordify is a chat bot that helps you organize lunch-out plans for your slack team.

It has been built with howdy's botkit framework and is ready for you to use at the following URL:  https://gordify.herokuapp.com.

# Bot interactions

Once you add the Gordify to any channel within your slack's workspace your team members can interact with it:  

- When someone says `@gordify start`, the bot will prepare a lunch plan and will ask people out for lunch: `Ey! who is going to have lunch out today?`.
- When someone says `@gordify yo` when there's a lunch plan prepared, the bot will include the person in the plan and will reply with: `Pointed @<username> 😉`
- When someone says `@gordify stop`, when there's an ongoing lunch the bot will stop accepting people, then it will organize people in groups (maximum group size is seven) and assign leader to each group, e.g.

```
someone:
  @gordify stop
gordify:
  Group 1: @helen,@peter,@susan,@george
  Leader: @susan

  Group 2: @claire,@maria,@mark,@hugo
  Leader: @maria
```

## Development

You will need the following:

- NodeJS V8
- MongoDB
- A slack app ([see below](#slack-app-setup))
- Yarn (optional)
- NVM (optional)

Then you can install it with:

```sh
$ git clone https://github.com/anxhe/gordify
$ cd gordify
$ yarn install
$ echo -e "MONGO_URI=mongodb://localhost/gordify_dev\nclientId=<YOUR SLACK CLIENT ID>\nclientSecret=<YOUR SLACK CLIENT SECRET>"
$
```

## Tests

```
$ yarn run test
```

## License

ISC.
