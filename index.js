const Discord = require ('discord.js');
const fs = require("fs");
const client = new Discord.Client();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const version = 'Flow V1.0.1';
const prefix = '!';

//Loading secrets file
const secretsFile = fs.readFileSync('secrets.json');
const secrets = JSON.parse(secretsFile);

// Opinion files / array setup
const opinionsFile = fs.readFileSync("./opinions.txt", "utf-8");
const opinions = opinionsFile.split("\n")

// Meme file / array setup
const memeFile = fs.readFileSync("./memes.txt", "utf-8");
const memes = memeFile.split("\n")

client.on('message', msg=>{
    let args = msg.content.substring(prefix.length).split(' ')
    switch(args[0]){
        case 'opinion':
            let opinion = opinions[Math.floor(Math.random() * opinions.length)]
            console.log(msg.author.username, ", Giving the Opinion :");
            console.log(opinion)
            msg.reply(opinion)
        break
        case 'info':
            let embed = new Discord.MessageEmbed()
            .setTitle('Flow Info')
            .addField('Name:', 'Flow')
            .addField('Version', version)
            .addField('Last Update', '03/7/2020')
            .setColor(0xF1C40F)
            .setThumbnail('https://i.ibb.co/LJYVSv2/flow.jpg')
            .setFooter(date);
            msg.channel.send(embed)
        break
        case 'meme':
            let meme = memes[Math.floor(Math.random() * memes.length)]
            msg.reply(meme);
        break
    }
})

console.log('Loading Bot...')
console.log(date)
client.on('ready', () => {
    console.log('Bot Loaded');
})

client.login(secrets.token);