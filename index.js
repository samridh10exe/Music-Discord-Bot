const { Client } = require('discord.js');
const ytdl = require('ytdl-core');
const Spotify = require('node-spotify-api');
const spotifyUrlInfo = require('spotify-url-info');
const { prefix, token, spotifyToken, spotifySecret } = require('./config.json');

const client = new Client();
const queue = new Map();
const spotify = new Spotify({ id: spotifyToken, secret: spotifySecret });


client.once('ready', () => {
  console.log('Music bot is ready!');
});

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    if (!args[0]) {
      return message.channel.send('You need to provide a YouTube or Spotify URL.');
    }

    if (args[0].includes('spotify')) {
      executeSpotify(message, args);
    } else {
      executeYouTube(message, args);
    }
  } else if (command === 'skip') {
    skip(message);
  } else if (command === 'stop') {
    stop(message);
  }
});

async function executeYouTube(message, args) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send('You must be in a voice channel to play music!');
  }

  const serverQueue = queue.get(message.guild.id);

  const songInfo = await ytdl.getInfo(args[0]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);
    queueContruct.songs.push(song);

    try {
      const connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.error(err);
      queue.delete(message.guild.id);
      return message.channel.send(err.message);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

async function executeSpotify(message, args) {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send('You must be in a voice channel to play music!');
  }

  const serverQueue = queue.get(message.guild.id);

  try {
    const trackInfo = await spotifyUrlInfo.getData(args[0]);
    const song = {
      title: trackInfo.name,
      url: trackInfo.external_urls.spotify,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      queue.set(message.guild.id, queueContruct);
      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.error(err);
        queue.delete(message.guild.id);
        return message.channel.send(err.message);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  } catch (err) {
    console.error(err);
    return message.channel.send('An error occurred while fetching the Spotify track.');
  }
}

function skip(message) {
  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('There is no song that I could skip!');
  serverQueue.connection.dispatcher.end();
}

function stop(message) {
  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('There is no song that I could stop!');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Now playing: **${song.title}**`);
}

client.login(token);
