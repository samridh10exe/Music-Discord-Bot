# Music-Discord-Bot

![Discord.js Version](https://img.shields.io/badge/discord.js-v11.6.4-blue.svg)
![Node.js Version](https://img.shields.io/badge/node.js-v14.x-green.svg)

## Description

This Music Discord Bot is a simple and customizable music bot for Discord, allowing users to stream music from both YouTube and Spotify in voice channels.

## Features

- Play music from YouTube and Spotify
- Skip, stop, and control music playback
- Queue system to manage multiple music requests
- Customizable prefix and other settings

## Requirements

- Node.js (v14.x or higher)
- Discord.js (v11.x) [Note: Please verify the correct version for your bot]

## Installation
1. Clone the repository:

```
git clone https://github.com/samridh10exe/Music-Discord-Bot.git
```

2. Navigate to the project folder:

```
cd Music-Discord-Bot
```

3. Install the required dependencies:

```

npm install discord.js

```
```

npm install ytdl-core ffmpeg-static

```
```

npm install node-spotify-api

```
```

npm install spotify-url-info

```


4. Set up the configuration:

   Create a `config.json` file in the project root directory with the following content:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "prefix": "!",
  "youtubeAPIKey": "YOUR_YOUTUBE_API_KEY",
  "spotifyToken": "YOUR_SPOTIFY_API_TOKEN",
  "spotifySecret": "YOUR_SPOTIFY_API_SECRET"
}
```

Replace `YOUR_DISCORD_BOT_TOKEN`, `YOUR_YOUTUBE_API_KEY`, `YOUR_SPOTIFY_API_TOKEN`, and `YOUR_SPOTIFY_API_SECRET` with your respective API tokens and secret.

5. Run the bot:

```
node index.js
```

## Usage

Invite your bot to your Discord server using the OAuth2 URL generated in the Discord Developer Portal. Ensure that your bot has the necessary permissions to join voice channels and read and send messages.

Use the `!play` command followed by a YouTube or Spotify URL to start playing music in the voice channel.

Available commands:
- `!play <YouTube or Spotify URL>`: Play music from YouTube or Spotify.
- `!skip`: Skip the currently playing song.
- `!stop`: Stop the music playback and clear the queue.

## Contributions

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

Please remember to replace the placeholders (`YOUR_DISCORD_BOT_TOKEN`, `YOUR_YOUTUBE_API_KEY`, `YOUR_SPOTIFY_API_TOKEN`, and `YOUR_SPOTIFY_API_SECRET`) in the `config.json` section with the actual credentials you obtained for your bot and APIs.

Feel free to add more sections or customize the README based on your bot's unique features, setup instructions, or any additional details you'd like to provide to users.
