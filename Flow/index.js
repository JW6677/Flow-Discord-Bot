const Discord = require ('discord.js')
const fs = require("fs")
const client = new Discord.Client();
const token = 'Njk3MTM3NjYxOTY5ODI1ODk1.Xv0NFQ.r1_QjeBVRs2xTOKm2juTRj3-HUg';

// Opinion files / array setup
var opinionIntroFile = fs.readFileSync("./opinion-intro.txt", "utf-8");
var opinionIntro = opinionIntroFile.split("\n")
var opinionsFile = fs.readFileSync("./opinions.txt", "utf-8");
var opinions = opinionsFile.split("\n")

client.on('message', msg=>{
    if(msg.content === "!opinion"){
        var opinion1 = ""
        var opinion2 = ""
        var opinion = ""
        var opinion1 = opinionIntro[Math.floor(Math.random() * opinionIntro.length)]
        var opinion2 = opinions[Math.floor(Math.random() * opinions.length)]
        console.log(opinion1)
        console.log(opinion2)
        console.log(msg.author.username, ", Giving the Opinion :")
        console.log(opinion.concat(opinion1, opinion2))
        msg.reply(opinion.concat(opinion1, opinion2))
    }
})


console.log('Loading Bot...')
client.on('ready', () => {
    console.log('Bot Loaded');
})

client.login(token);