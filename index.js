const fs = require('fs');
const Discord = require('discord.js');
var guildConf = require('./guildConf.json')
const Fs = require("fs");
const prefix = ';';

const client = new Discord.Client();
client.commands = new Discord.Client();

answer = true;
cAnswer = "";
userAnswer = "";

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

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'quiz')) {

        if (answered = false) {
            userAnswer = msg;
        if (userAnswer == cAnswer) {
        }
        else {
            message.reply ("incorrect")
        }
        answered = true; cAnswer = ""; userAnswer = "";
        }
        

        number = 3;
        var random = Math.floor (Math.random() * (number - 1 + 1)) + 1;
        switch(random) {
            case 1: message.channel.send('are u cool'); cAnswer = "yes" 
            case 2: message.channel.send('what fruit do u like'); cAnswer = "orange" 
            case 3: message.channel.send('r u good'); cAnswer = "yes" 
        }
        answered = false;
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

        if (msg.startsWith(guildConf[message.guild.id].prefix + 'prefix')) {
            if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("ADMINISTRATOR")) {
                bot.commands.get('prefix').execute(message, args, guildConf)
            } else {
                return message.channel.send('You require the manage server permission to use this.')
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

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'kill')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Failed to run this command, please include who you are killing.')
        }
        return message.channel.send(message.author.username + ' won the lottery, then got swarmed and killed but gold diggers' + ' \n**Eliminated by: **' + message.author.username) 
    }

    if (msg.startsWith(guildConf[message.guild.id].prefix + 'throw')) {
        let user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Failed to run this command, please include who you are throwing.')
        }
        return message.channel.send(message.author.username + ' has thrown ' + user.username + ' on a train track, and ' + user.username + ' got squished to their death.') 
    }
})

// Message Handler
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

                    UserJSON[message.author.id].lambos += parseInt(amount);
                    UserJSON[message.author.id].bal -= parseInt(amount) * 7;
                    Fs.writeFileSync("./database/users.json", JSON.stringify(UserJSON));

                    UserJSON[message.author.id].cheese += parseInt(amount);
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

