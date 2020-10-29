const fs = require('fs');
const Discord = require('discord.js');
var guildConf = require('./guildConf.json')
const Fs = require("fs");
const prefix = ';';
db = require('quick.db')

const client = new Discord.Client();
client.commands = new Discord.Client();

fetch = require('node-fetch'),
cpuStat = require('cpu-stat'),
parse_ms = require('parse-ms'),
ms = require('ms'),
os = require('os'),
dateformat = require('dateformat');
var dateFormat = require('dateformat');

client.once('ready', () => {
    console.log(`Success! Logged in as ${client.user.tag}.`);
});

// User Message Tracker
client.on("message", async message => {
    console.log(`${message.author.username}: ${message.content}`);
});

// Activity Status
client.on("ready", () => {
  function randomStatus() {
    let status = ["Gizmo.GG", "YouTube", "Discord", "servers", "users"]
    let rstatus = Math.floor(Math.random() * status.length);
    
    client.user.setActivity(status[rstatus], {type: "WATCHING", url: "https://www.discord.com"});
  }; setInterval(randomStatus, 30000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.
})

// Help Commands
client.on('message', message => {
    if(message.content === ";help") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor("Gizmo's Help Command")
        .setDescription("Dungeon Gizmo v1.0")
        .addField("**Commands** \n",":1234: Math \n;help math \n\n :hammer_pick: Moderation \n ;help moderation \n\n :smile: Fun \n;help fun \n\n :money_with_wings:  Economy \n;help eco \n\n :100: : Misc \n;help misc")
        .setColor("AQUA")
        .setFooter("Lead Developers: SpookySleek#8596 and SpookyEvee#0001")
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
        message.author.send(helpEmbed)
    }
});

client.on('message', message => {
    if(message.content === ";help math") {
        const helpEmbed = new Discord.MessageEmbed()
        .setAuthor("Gizmo's Math Help Command")
        .setDescription("Dungeon Gizmo v1.0")
        .addField("**Commands** \n","```Multiply 2 numbers, example: ;multiply 8 4 = Gives answer 32``` Math \n;help math \n\n :hammer_pick: Moderation \n ;help moderation \n\n :smile: Fun \n;help fun \n\n :money_with_wings:  Economy \n;help eco \n\n :100: : Misc \n;help misc")
        .setColor("AQUA")
        .setFooter("Lead Developers: SpookySleek#8596 and SpookyEvee#0001")
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
        message.author.send(helpEmbed)
    }
});

// Math Commands
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === "sum") {
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply(`The sum of all the arguments you provided is ${sum}!`);

    } else if (command === "multiply") {
            const numArgs = args.map(x => parseFloat(x));
            const product = numArgs.reduce((counter, x) => counter *= x);
            message.reply(`The product of all the arguments you provided is ${product}!`);

    } else if (command === "divide") {
            const numArgs = args.map(x => parseFloat(x));
            const quotient = numArgs.reduce((counter, x) => counter /= x);
            message.reply(`The quotient of all the arguments you provided is ${quotient}!`);
            
    } else if (command === "subtract") {
            const numArgs = args.map(x => parseFloat(x));
            const difference = numArgs.reduce((counter, x) => counter -= x);
            message.reply(`The difference of all the arguments you provided is ${difference}!`);
	}
});

// Moderation Commands
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'user-info') {
        let serverembed = new Discord.MessageEmbed()
          .setTitle("User Information")
          .setColor("RANDOM")
          .addField("Username:", message.author.username)
          .addField("ID:", message.author.id)
          .setFooter(`Lead Developers: SpookySleek#8596 and SpookyEvee#0001 | GIZMO.GG`);
        message.channel.send(serverembed);
        
    } else if (command === 'server-info') {
          let serverembed = new Discord.MessageEmbed()
          .setTitle("Server Information")
          .setColor("RANDOM")
          .addField("Server Name", message.guild.name)
          .addField("Total Members", message.guild.memberCount)
          .setFooter(`ID: ${message.guild.id} | GIZMO.GG`);
        message.channel.send(serverembed);
		


	} else if (command === 'prune') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('Failed to run this command, you need to input a number between **1 and 99.**');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Failed to prune messages, please try again.');
		});
	}
});

// Misc Commands
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('Pong.');

    } else if(command === 'beep'){
        message.channel.send('Boop.');

    } else if(command === 'boop'){
        message.channel.send('Beep.');

    } else if(command === 'name'){
        const name = message.member.displayName;
        const server = "server name";

        message.channel.send("Your name is" + {name})

        message.channel.send("Your name is " + name + ". Welcome to " + server + "!")
        message.channel.send(`Your name is ${name}. Welcome to ${server}!`)
    } else if(command === 'hi'){
        message.channel.send('hi');

    } else if(command === 'hey'){
        message.channel.send('hey');

    } else if(command === 'quite'){
        message.channel.send('hey WATCH IT! I AM GIZMOTRON 9000000000');

    } else if(command === 'gizmo'){
        message.channel.send('hey buddy, got something to tell u...turns out, ur a 100%, that bitch!');

    } else if(command === 'gizmoblood'){
        message.channel.send('i have an A blood type');
    
    } else if(command === 'yo'){
        message.channel.send('yo');

    } else if(command === 'bye'){
        message.channel.send('bye');

    } else if(command === 'hello'){
        message.channel.send('hello');
    }
});

// Fun Commands
client.on('message', message => {
    if (!message.guild) {
        return;
    }
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.length).split(' ');

    if (!guildConf[message.guild.id]) {
        guildConf[message.guild.id] = {
            prefix: ';'
        }
    }
    fs.writeFile('./config.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err);
    })

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rng')) {
        if (!args[1]) {
            return message.channel.send('Failed to run this command, please include a number.')
        }
        if (isNaN(args[1])) {
            return message.channel.send('Failed to run this command, please include an actual number.')
        }
        let number = Math.floor(Math.random() * (args[1]));
        message.channel.send(number)
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'poll')) {
        if (!args[1]){
            return message.channel.send('Failed to run this command, please include what you are polling.')
        }

        const poll = new Discord.MessageEmbed()
            .setTitle('**POLL**')
            .setDescription(`${args.slice(1).join(" ")}`)
            .setColor('#880e0e')
            message.channel.send(poll).then(async function (embedMessage) {
                await embedMessage.react('👍')
                await embedMessage.react('👎')
            })
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'food')) {
        if (!args[1]) {
          let foodEmbed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle("**Food!**")
          .addField("Cookie:", "🍪", true)
          .addField("Pizza:", "🍕", true)
          .addField("Ice Cream:", "🍨", true)
          .addField("Cheese Burger:", "🍔", true)
          .addField("Hot Dog:", "🌭", true)
          .addField("Popcorn:", "🍿", true)
          .addField("Doghnut:", "🍩", true)
          .addField("Cheese:", "🧀", true)
          .addField("Bacon:", "🥓", true)
          return message.channel.send(foodEmbed)}}
          
          if (msg.startsWith(guildConf[message.guild.id].prefix + 'hug')) {
            message.channel.send(`Aw! I gave you a hug, ${message.author}. I hope you feel better.`);
          }

          if (msg.startsWith(guildConf[message.guild.id].prefix + 'log')) {
            if (message.member.hasPermission("ADMINISTRATOR") ||message.member.hasPermission("MANAGE_GUILD")){
    
                if (!args[1]) {
                    return message.channel.send('Please include your what you are logging.')
                }
    
                if (client.channels.fetch('771144103709638676')) {
                    client.channels.fetch('771144103709638676').then(channel => {
                        channel.send(args.slice(1).join(" "))
                message.delete();
                })
            } else {
                return message.channel.send('There was an error doing this.')
            }
        } else {
            return message.channel.send('You do not have permissions to log.')
        }
        }
          
    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rps')) {
        if (!args[1]) {
            return message.channel.send('Failed to run this command, please include your choice.')
        }

        let choices = ['rock', 'paper', 'scissors'];
        if (choices.includes((args[1]).toLowerCase())) {
            let number = Math.floor(Math.random() * 3);
            if (number == 1) {
                return message.channel.send('It was a tie, we both had ' + (args[1]).toLowerCase())
            }
            if (number == 2) {
                if ((args[1]).toLowerCase() == "rock") {
                    return message.channel.send('Haha! I won, I had paper.')
                }
                if ((args[1]).toLowerCase() == "paper") {
                    return message.channel.send('LOL! I won, I had scissors.')
                }
                if ((args[1]).toLowerCase() == "scissors") {
                    return message.channel.send('Sorry but, I won. I had rock.')
                }
            }
            if (number == 0) {
                if ((args[1]).toLowerCase() == "rock") {
                    return message.channel.send('Bruh! You won, I had scissors.')
                }
                if ((args[1]).toLowerCase() == "paper") {
                    return message.channel.send('Oh come on! You won, I had rock.')
                }
                if ((args[1]).toLowerCase() == "scissors") {
                    return message.channel.send('Not again...You won, I paper.')
                }
            }
        } else {
            return message.channel.send('Failed to run this command, please include either: Rock, Paper, or Scissors.')
        }
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + '8ball')) {
        if (!args[2]) {
            return message.channel.send('Please ask a full statements or questions.')
        }
        let number = Math.floor(Math.random() * 6);
        if (number == 0) {
            return message.channel.send('Yes, definitely so.')
        }
        if (number == 1) {
            return message.channel.send('No, definitely not.')
        }
        if (number == 2) {
            return message.channel.send('Your future is larger then your brain cells.')
        }
        if (number == 3) {
            return message.channel.send('It is uncertain.')
        }
        if (number == 4) {
            return message.channel.send('Odds are not in your favor.')
        }
        if (number == 5) {
            return message.channel.send('Odds are in your favor.')
        }

    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'rate')) {
        let number = Math.floor(Math.random() * 101);
        if (!args[1]) {
            return message.channel.send('Hm, I would rate you a ' + number + '/100')
        } else {
            let user = message.mentions.users.first();
            if (!user) {
                return message.channel.send('Failed to run this command, please include who you are rating.')
            }
            return message.channel.send('I would rate ' + user.username + ' a ' + number + '/100')
        }
    }

    if (msg.startsWith(prefix + "spotify")) {
        let user;
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else {
          user = message.author;
        }
        
        let convert = require('parse-ms')
        
        let status = user.presence.activities[0];
        
        if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("Failed to run this command, this user isn't listening to a song on Spotify.");
        
        if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
          let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
              url = `https://open.spotify.com/track/${status.syncID}`,
              name = status.details,
              artist = status.state,
              album = status.assets.largeText,
              timeStart = status.timestamps.start,
              timeEnd = status.timestamps.end,
              timeConvert = convert(timeEnd - timeStart);
          
          let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
          let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
          
          let time = `${minutes}:${seconds}`;
          
          const embed = new Discord.MessageEmbed()
          .setAuthor("Spotify Track Information" + ' for ' + message.author.username)
          .setColor(0x1ED768)
          .setThumbnail(image)
          .addField("Name:", name, true)
          .addField("Album:", album, true)
          .addField("Artist:", artist, true)
          .addField("Duration:", time, true)
          .addField("ID:", + message.author.id, true)
          .addField("Listen now on Spotify!", `[\`${artist} - ${name}\`](${url})`, false)
          message.channel.send(embed)
        }
      }
        
      if (msg.startsWith(guildConf[message.guild.id].prefix + 'kill')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Failed to run this command, please include who you are killing.')
        }
        return message.channel.send(user.username + ' won the lottery, then got swarmed and killed but gold diggers' + ' \n**Eliminated by: **' + message.author.username) 
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'snipe')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Failed to run this command, please include who you are sniping.')
        }
        return message.channel.send(user.username + ' got sniped with a sniper from 2000 feet in the air, and it was a 360 no-scope!' + ' \n**Sniped by: **' + message.author.username) 
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'crush')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('You will never have a crush, and will forever be single, noob.')
        }
        return message.channel.send(message.author.username + ', you will have a crush on ' + user.username + '. I Hope you guys become the most beautiful couple there is yet!') 
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'pp')) {
        
        let peepeeembed = new Discord.MessageEmbed()
        .setTitle(message.author.username + "'s PeePee Information")
        .setColor("RANDOM")
        .addField("Size:", "20 inches")
        .addField("ID:", message.author.id)
        .setFooter(`Lead Developers: SpookySleek#8596 and SpookyEvee#0001 | GIZMO.GG`);
        return message.channel.send(peepeeembed);
    }
})

// Image Commands
client.on('message', message => {
    if (!message.guild) {
        return;
    }
    let msg = message.content.toLowerCase();
    let args = message.content.substring(prefix.length).split(' ');

    if (!guildConf[message.guild.id]) {
        guildConf[message.guild.id] = {
            prefix: ';'
        }
    }
    fs.writeFile('./config.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err);
    })

    if (msg.startsWith(prefix + "meme") || msg.startsWith(prefix + "memes")) {
        const got = require('got'),
              {MessageEmbed} = require('discord.js');
        
        got('https://www.reddit.com/r/meme/random/.json').then(response => {
          let content = JSON.parse(response.body),
              image = content[0].data.children[0].data.url,
              embed = new MessageEmbed()
          .setImage(image)
          .setTimestamp()
          .setFooter('from: r/meme')
          message.channel.send(embed);
        }).catch(console.log)
      }

      if (msg.startsWith(prefix + "pat")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/pat').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(":)", attachment)
        })
      }
      
      if (msg.startsWith(prefix + "meow")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/meow').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }

      if (msg.startsWith(prefix + "woof")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/woof').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }

      if (msg.startsWith(prefix + "tickle")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/tickle').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }

      if (msg.startsWith(prefix + "wallpaper")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/wallpaper').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }

      if (msg.startsWith(prefix + "goose")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/goose').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }

      if (msg.startsWith(prefix + "avatar")) {
        const {MessageAttachment} = require('discord.js');
        const {body} = fetch('https://nekos.life/api/v2/img/avatar').then(res => res.json()).then(result => {
          if (!result.url) return message.channel.send("Something went wrong.");
          const attachment = new MessageAttachment(result.url);
          message.channel.send(attachment) // You can remove the :), it's optional.
        })
      }
})

// Economy Commands
client.on("message", async (message) => {
    if (message.content.startsWith(prefix)) {
        // Command
        var args = message.content.substr(prefix.length)
            .toLowerCase()
            .split(" ");
        if (args[0] == "start") {

            // Action
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

            if (UserJSON[message.author.id]) {
                let WarningEmbed = new Discord.MessageEmbed();
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You already started");
                WarningEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(WarningEmbed);
                return;
            }

            UserJSON[message.author.id] = {
                bal: 0,
                lastclaim: 0,
                lastwork: 0,
                lambos: 0,
                cheese: 0,
                bereket: 0,
            }
            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("Success! You have started you adventure, go on and raid some dungeons!");
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "daily") {
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            if (Math.floor(new Date().getTime() - UserJSON[message.author.id].lastclaim) / (1000 * 60 * 60 * 24) < 1) {
                let WarningEmbed = new Discord.MessageEmbed()
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You have claimed today already");
                WarningEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(WarningEmbed);
                return;
            }
            UserJSON[message.author.id].bal += 500;
            UserJSON[message.author.id].lastclaim = new Date().getTime();
            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("Success! You have claimed your daily reward of 500 coins!");
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "hourly") {
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            if (Math.floor(new Date().getTime() - UserJSON[message.author.id].lastclaim) / (60 * 60) < 1) {
                let WarningEmbed = new Discord.MessageEmbed()
                WarningEmbed.setTitle("**ERROR**");
                WarningEmbed.setDescription("You have claimed this hour already");
                WarningEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(WarningEmbed);
                return;
            }
            UserJSON[message.author.id].bal += 500;
            UserJSON[message.author.id].lastclaim = new Date().getTime();
            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));
            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("Success! You have claimed your hourly reward of 500 coins!");
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
            return;
        }
        if (args[0] == "pay") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            let Money = args[1];

            /* ERROR CHECKS */
            if (!Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount to give.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You have not started the game yet.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(Money)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (UserJSON[message.author.id].bal < Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You do not have enough money");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            let Mentioned = message.mentions.members.first();
            if (!Mentioned) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please mention a user");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!UserJSON[Mentioned.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("That person does not play the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal -= parseInt(Money);
            UserJSON[Mentioned.id].bal += parseInt(Money);

            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have given " + Money + " coins to " + Mentioned.user.username);
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
        }

        if (args[0] == "remove") {

            if(!message.member.hasPermission('ADMINISTRATOR')){
                message.reply('Oops! Failed to run the command, you do not have permissions.')
                message.delete();
                return;
                }

            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            let Money = args[1];

            /* ERROR CHECKS */
            if (!Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount to remove.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You have not started the game yet.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(Money)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (UserJSON[message.author.id].bal < Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You do not have enough money");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            let Mentioned = message.mentions.members.first();
            if (!Mentioned) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please mention a user");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!UserJSON[Mentioned.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("That person does not play the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal -= parseInt(Money);
            UserJSON[Mentioned.id].bal -= parseInt(Money);

            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have removed " + Money + " from" + Mentioned.user.username);
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
        }
        if (args[0] == "echopay") {

            if(!message.member.roles.cache.get(`770455447920443432`)){
                message.reply('Oops! Failed to run the command, you do not have permissions.')
                message.delete();
                return;
                }

            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            let Money = args[1];

            /* ERROR CHECKS */
            if (!Money) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount to give.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You have not started the game yet.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(Money)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            let Mentioned = message.mentions.members.first();
            if (!Mentioned) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please mention a user");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!UserJSON[Mentioned.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("That person does not play the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal += parseInt(Money);
            UserJSON[Mentioned.id].bal += parseInt(Money);

            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription("You have given " + Money + " coins to " + Mentioned.user.username);
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
        }

        if (args[0] == "bal") {
            // Action Here
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            let mentioned = message.mentions.members.first();
            if (mentioned) {
                if (!UserJSON[mentioned.id]) {
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("That person is not playing the game.");
                    ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                    message.channel.send(ErrorEmbed);
                    return;
                }
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance", UserJSON[mentioned.id].bal);
                SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(SuccessEmbed);
                return;
            } else {
                let SuccessEmbed = new Discord.MessageEmbed();
                SuccessEmbed.setTitle("**SUCCESS**");
                SuccessEmbed.addField("Balance", UserJSON[message.author.id].bal);
                SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(SuccessEmbed);
                return;
            }
        }

        if (args[0] == "buy") {
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            let item = args[1];
            let amount = args[2];

            if (!item) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an item.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (!amount) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an amount");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (isNaN(amount)) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify a number");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }
            if (amount == 0 || amount.indexOf("-") != -1 || amount.indexOf(".") != -1) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Please specify an integer value greater than 0.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            switch (item) {
                case "lambo":
                    if (7000 * parseInt(amount) > UserJSON[message.author.id].bal) {
                        let ErrorEmbed = new Discord.MessageEmbed();
                        ErrorEmbed.setTitle("**ERROR**");
                        ErrorEmbed.setDescription("You do not have enough money");
                        ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                        message.channel.send(ErrorEmbed);
                        return;
                    }

                    case "cheese":
                        if (7 * parseInt(amount) > UserJSON[message.author.id].bal) {
                            let ErrorEmbed2 = new Discord.MessageEmbed();
                            ErrorEmbed2.setTitle("**ERROR**");
                            ErrorEmbed2.setDescription("You do not have enough money");
                            ErrorEmbed2.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                            message.channel.send(ErrorEmbed2);
                            return;
                        }

                        case "bereket":
                            if (7 * parseInt(amount) > UserJSON[message.author.id].bal) {
                                let ErrorEmbed2 = new Discord.MessageEmbed();
                                ErrorEmbed2.setTitle("**ERROR**");
                                ErrorEmbed2.setDescription("You do not have enough money");
                                ErrorEmbed2.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                                message.channel.send(ErrorEmbed2);
                                return;
                            }

                    UserJSON[message.author.id].lambos += parseInt(amount);
                    UserJSON[message.author.id].bal -= parseInt(amount) * 7;
                    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

                    UserJSON[message.author.id].cheese += parseInt(amount);
                    UserJSON[message.author.id].bal -= parseInt(amount) * 7;
                    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

                    UserJSON[message.author.id].bereket += parseInt(amount);
                    UserJSON[message.author.id].bal -= parseInt(amount) * 7;
                    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

                    let SuccessEmbed = new Discord.MessageEmbed();
                    SuccessEmbed.setTitle("**SUCCESS**");
                    SuccessEmbed.setDescription(`You have bought ${amount} ${item}s.`);
                    SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                    message.channel.send(SuccessEmbed);
                    break;
                default:
                    let ErrorEmbed = new Discord.MessageEmbed();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("The item you are trying to buy does not exist.");
                    ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                    message.channel.send(ErrorEmbed);
                    return;
            }
        }

        if (args[0] == "work") {
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));

            if (!UserJSON[message.author.id]) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("You must be playing the game.");
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            let deltaTime = Math.floor((new Date().getTime() - UserJSON[message.author.id].lastwork) / (1000 * 60));
            if (deltaTime < 30) {
                let ErrorEmbed = new Discord.MessageEmbed();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription(`You can work in ${30 - deltaTime} minutes.`);
                ErrorEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
                message.channel.send(ErrorEmbed);
                return;
            }

            UserJSON[message.author.id].bal += (UserJSON[message.author.id].lambos + 1) * 2;
            UserJSON[message.author.id].lastwork = new Date().getTime();
            Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

            let SuccessEmbed = new Discord.MessageEmbed();
            SuccessEmbed.setTitle("**SUCCESS**");
            SuccessEmbed.setDescription(`You have earned ${(UserJSON[message.author.id].lambos + 1) * 2} coins!`);
            SuccessEmbed.setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png'}));
            message.channel.send(SuccessEmbed);
        }
        if (args[0] == "lb") {
            let UserJSON = JSON.parse(Fs.readFileSync("./database/users.json"));
            var Sorted = Object.entries(UserJSON).sort((a, b) => b[1].bal - a[1].bal);
            if (Sorted.length > 10) Sorted = Sorted.slice(0, 10);

            var LBString = "";
            Sorted.forEach(user => {
                LBString += `${client.users.cache.find(u => u.id == user[0])} - ${user[1].bal}\n`;
            });
            var LBEmbed = new Discord.MessageEmbed()
                .setTitle("**Leaderboard**")
                .setDescription(LBString);
            message.channel.send(LBEmbed);
        }
    }
})




client.login("NzcwMzI0MTAzMjY5MzE4Njk3.X5b6Og.JzKzMkHV_tslBXgckDu9ssGQNH0");

