const Discord = require ('discord.js');
const SpellChecker = require('simple-spellchecker');
const fs = require("fs");
const client = new Discord.Client();
const version = 'Flow V1.0.5';
const PREFIX = '?'

//Loading secrets file / Json Parsing
const secretsFile = fs.readFileSync('./secrets.json');
const secrets = JSON.parse(secretsFile);

const dictionaryDE = SpellChecker.getDictionarySync('de-DE');    
const dictionaryGB = SpellChecker.getDictionarySync('en-GB');
const dictionaryUS = SpellChecker.getDictionarySync('en-US');
const dictionaryES = SpellChecker.getDictionarySync('es-ES');
const dictionaryFR = SpellChecker.getDictionarySync('fr-FR');
const wordTotal = dictionaryDE.getLength() + dictionaryGB.getLength() + dictionaryUS.getLength() + dictionaryES.getLength() + dictionaryFR.getLength()

const botInfo = new Discord.MessageEmbed()
.setTitle('Flow Info BETA')
.addField('Flow Version', version)
.addField('German Words', dictionaryDE.getLength())
.addField('English - British Words', dictionaryGB.getLength())
.addField('English - American Words', dictionaryUS.getLength())
.addField('Spanish Words', dictionaryES.getLength())
.addField('French Words', dictionaryFR.getLength())
.addField('Total Words Known', wordTotal)
.setFooter('Flow BETA')
.setColor('0xffb300');

client.on('message', msg=>{
    let args = msg.content.substring(PREFIX.length).split(' ');
    switch(args[0]){
        case 'info':
            msg.channel.send(botInfo);
        break;

        case 'check':
            let output = []
            for (i = 2; i < args.length; i++) {
                switch(args[1]){
                    case 'DE':
                        if(dictionaryDE.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryDE.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'GB':
                        if(dictionaryGB.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryGB.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'US':
                        if(dictionaryUS.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryUS.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'ES':
                        if(dictionaryES.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryES.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'FR':
                        if(dictionaryFR.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryFR.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                }
            }
            output = output.toString();
            newOutput = output.replace(/,/g, ' ');
            let correction = new Discord.MessageEmbed()
            .setTitle(newOutput.toString());
            msg.channel.send(correction)
        break;
    }
})

console.log('Loading Bot...')
client.on('ready', () => {
    console.log('Bot Loaded');
    console.log(`de-DE: Successfuly loaded ${dictionaryDE.getLength()} words`);
    console.log(`en-GB: Successfuly loaded ${dictionaryGB.getLength()} words`);
    console.log(`en-US: Successfuly loaded ${dictionaryUS.getLength()} words`);
    console.log(`es-ES: Successfuly loaded ${dictionaryES.getLength()} words`);
    console.log(`fr-FR: Successfuly loaded ${dictionaryFR.getLength()} words`);
    console.log(`A total of ${wordTotal} words has been loaded into memory`)
})

client.login(secrets.token);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}