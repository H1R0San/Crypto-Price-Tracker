// Import the Discord.js library
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

// Set up the CoinGecko API endpoint
const COINGECKO_API_ENDPOINT = 'https://api.coingecko.com/api/v3/simple/price';

// Define the command prefix
const prefix = '!';

// Listen for the ready event
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Listen for messages
client.on('message', async message => {
  // Check if the message starts with the command prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Get the arguments from the message
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Check if the command is for getting the price of a cryptocurrency
  if (command === 'price') {
    // Get the cryptocurrency name from the arguments
    const cryptoName = args[0];

    // Check if the cryptocurrency name is provided
    if (!cryptoName) {
      return message.reply('Please provide the name of the cryptocurrency!');
    }

    try {
      // Make a request to the CoinGecko API to get the current price of the cryptocurrency
      const response = await fetch(`${COINGECKO_API_ENDPOINT}?ids=${cryptoName}&vs_currencies=usd`);
      const data = await response.json();

      // Get the price of the cryptocurrency
      const price = data[cryptoName]['usd'];

      // Send the price to the user on Discord
      message.channel.send(`The current price of ${cryptoName} is $${price}`);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error(error);
      message.reply('An error occurred while getting the price of the cryptocurrency!');
    }
  }
});

// Log in to the Discord client
client.login('YOUR_DISCORD_BOT_TOKEN');
