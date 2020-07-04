const Discord = require ('discord.js');
const fs = require("fs");
const client = new Discord.Client();
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const version = 'Flow V1.0.1';
const prefix = '!';

//Loading secrets file / Json Parsing
const secretsFile = fs.readFileSync('./secrets.json');
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
        case 'pog':
            msg.channel.send('Pog dude')
            console.log(msg.author.username, ", Pog dude");
        break;

        case 'opinion':
            let opinion = opinions[getRandomInt(opinions.length)];
            console.log(msg.author.username, ", Giving the Opinion :");
            console.log(opinion)
            msg.reply(opinion)
        break;

        case 'wholesome':
            console.log(msg.author.username, ", Giving the Wholesome Meme :");
            Wholesome();
        break;

        case 'flip':
            let fliper = getRandomInt(2);
            console.log(msg.author.username, ", Flipping the coin :");
            if(fliper == 0){
                let headsembed = new Discord.MessageEmbed()
                .setTitle('Flipping...')
                .attachFiles(['./assets/flip/heads.gif'])
                .setImage('attachment://heads.gif');
                msg.channel.send(headsembed)
                console.log('Heads')
            }
            if(fliper == 1){
                let tailsembed = new Discord.MessageEmbed()
                .setTitle('Flipping...')
                .attachFiles(['./assets/flip/tails.gif'])
                .setImage('attachment://tails.gif');
                msg.channel.send(tailsembed)
                console.log('Tails')
            }
        break;
        
        case 'test':
            Discord.Guild.channels.create('poggers');
        break;
        case 'info':
            let infoembed = new Discord.MessageEmbed()
            .setTitle('Flow Info')
            .addField('Name:', 'Flow')
            .addField('Version', version)
            .addField('Last Update', '04/7/2020')
            .setColor(0xF1C40F)
            .setThumbnail('https://i.ibb.co/LJYVSv2/flow.jpg')
            .setFooter(date);
            msg.channel.send(infoembed)
        break;
    }
})

console.log('Loading Bot...')
console.log(date)
client.on('ready', () => {
    console.log('Bot Loaded');
})

client.login(secrets.token);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Wholesome memes function
function Wholesome(){
    let wholesomeamount = 5
    let wholesomeID = getRandomInt(wholesomeamount)
    if(wholesomeID == 0){
        let wholesome0 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/cat-flower.png'])
        .setImage('attachment://cat-flower.png');
        msg.channel.send(wholesome0)
        console.log('Wholesome0 - cat-flower.png')
    }
    if(wholesomeID == 1){
        let wholesome1 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/cat-roomba.png'])
        .setImage('attachment://cat-roomba.png');
        msg.channel.send(wholesome1)
        console.log('Wholesome1 - cat-roomba.png')
    }
    if(wholesomeID == 2){
        let wholesome2 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/cat-slide.png'])
        .setImage('attachment://cat-slide.png');
        msg.channel.send(wholesome2)
        console.log('Wholesome2 - cat-slide.png')
    }
    if(wholesomeID == 3){
        let wholesome3 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/dog-dance.png'])
        .setImage('attachment://dog-dance.png');
        msg.channel.send(wholesome3)
        console.log('Wholesome3 - dog-dance.png')
    }
    if(wholesomeID == 4){
        let wholesome4 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/dog-love.png'])
        .setImage('attachment://dog-love.png');
        msg.channel.send(wholesome4)
        console.log('Wholesome4 - dog-love.png')
    }
    if(wholesomeID == 5){
        let wholesome5 = new Discord.MessageEmbed()
        .attachFiles(['./assets/memes/wholesome/shiba-grin.png'])
        .setImage('attachment://shiba-grin.png');
        msg.channel.send(wholesome5)
        console.log('Wholesome5 - shiba-grin.png')
    }
}