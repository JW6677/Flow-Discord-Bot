const Discord = require ('discord.js');
const SpellChecker = require('simple-spellchecker');
const Filter = require('bad-words'),
filter = new Filter();
const WolframAlphaAPI = require('wolfram-alpha-api');
const fs = require("fs");
const client = new Discord.Client();
const talkedRecently = new Set();
const version = 'Flow V1.0.5';
const PREFIX = '?'

//Loading secrets file / Json Parsing
const secretsFile = fs.readFileSync('./secrets.json');
const secrets = JSON.parse(secretsFile);
const waApi = WolframAlphaAPI(secrets.wolframtoken);

const dictionaryDE = SpellChecker.getDictionarySync('de-DE'); //German Dictionary 
const dictionaryGB = SpellChecker.getDictionarySync('en-GB'); //British English Dictionary
const dictionaryUS = SpellChecker.getDictionarySync('en-US'); //American English Dictionary
const dictionaryES = SpellChecker.getDictionarySync('es-ES'); //Spanish Dictionary
const dictionaryMX = SpellChecker.getDictionarySync('es-MX'); //Spanish Mexico Dictionary
const dictionaryFR = SpellChecker.getDictionarySync('fr-FR'); //French Dictionary
const dictionaryIT = SpellChecker.getDictionarySync('it-IT'); //Italian Dictionary
const dictionaryNL = SpellChecker.getDictionarySync('nl-NL'); //Dutch Dictionary
const dictionaryPL = SpellChecker.getDictionarySync('pl-PL'); //Polish Dictionary
const dictionaryBR = SpellChecker.getDictionarySync('pt-BR'); //Brazil Portuguese Dictionary
const dictionarySV = SpellChecker.getDictionarySync('sv-SE'); //Sweedish Dictionary
const wordTotal = dictionaryDE.getLength() + dictionaryGB.getLength() + dictionaryUS.getLength() + dictionaryES.getLength() + dictionaryMX.getLength() + dictionaryFR.getLength() + dictionaryIT.getLength() + dictionaryNL.getLength() + dictionaryPL.getLength() + dictionaryBR.getLength() + dictionarySV.getLength()

//Message embed setup
const botInfo = new Discord.MessageEmbed()
.setTitle('Flow Info BETA')
.addField('Flow Version', version)
/*
.addField('German Words', dictionaryDE.getLength())
.addField('English Words', dictionaryGB.getLength() + dictionaryUS.getLength())
.addField('Spanish Words', dictionaryES.getLength() + dictionaryMX.getLength())
.addField('French Words', dictionaryFR.getLength())
.addField('Italian Words', dictionaryIT.getLength())
.addField('Dutch Words', dictionaryNL.getLength())
.addField('Polish Words', dictionaryPL.getLength())
.addField('Brazillian Words', dictionaryBR.getLength())
.addField('Sweedish Words', dictionarySV.getLength())
*/
.addField('Total Words Known', wordTotal)
.addField('Programmed By', 'JW66')
.setFooter('Flow BETA')
.setColor('0xffb300');

client.on('message', msg=>{
    let args = msg.content.substring(PREFIX.length).split(' ');
    switch(args[0]){
        case 'info':
            msg.channel.send(botInfo);
        break;

        case 'ask':
            if (talkedRecently.has(msg.author.id)) {
                msg.delete();
                msg.channel.send('❗ Wait 1 minute before getting using this again.')
                    .then(message => {
                        message.delete({ timeout: 10000 })
                    })
                    .catch();
            } else {
                args.shift();
                let question = args.toString();
                question = question.replace(/,/g, ' ');
                if (filter.isProfane(question) == false) {
                    waApi.getSpoken(question).then((data) => {
                        let wolframResult = new Discord.MessageEmbed()
                            .setTitle(data)
                        msg.channel.send(wolframResult)
                            .then(message => {
                                message.delete({ timeout: 10000 })
                            })
                            .catch();
                    }).catch((error) => {
                        let wolframError = new Discord.MessageEmbed()
                            .setTitle(`I'm sorry, Wolfram Alpha did not understand your request.`)
                        msg.channel.send(wolframError)
                            .then(message => {
                                message.delete({ timeout: 10000 })
                            })
                            .catch();
                    });
                } else {
                    msg.delete();
                    msg.channel.send('❗ Sorry you cannot use profanity')
                        .then(message => {
                            message.delete({ timeout: 10000 })
                        })
                        .catch();
                }
                
                // Adds the user to the set so that they can't talk for a minute
                console.log(`${msg.author.username} Used Wolfram Alpha. Adding them to the cooldown set`)
                talkedRecently.add(msg.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a minute
                    talkedRecently.delete(msg.author.id);
                    console.log(`${msg.author.username} Can now use Wolfram Alpha again. Removing them from the set`)
                }, 60000);
            }
        break;

        case 'spell':
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
                    case 'MX':
                        if(dictionaryMX.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryMX.getSuggestions(args[i], 1)
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
                    case 'IT':
                        if(dictionaryIT.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryIT.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'NL':
                        if(dictionaryNL.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryNL.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'PL':
                        if(dictionaryPL.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryPL.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'BR':
                        if(dictionaryBR.isMisspelled(args[i]) == true){
                            let suggestion = dictionaryBR.getSuggestions(args[i], 1)
                            suggestion = suggestion.toString()
                            output.push(suggestion);
                        } else {
                            output.push(args[i]);
                        }
                    break;
                    case 'SV':
                        if(dictionarySV.isMisspelled(args[i]) == true){
                            let suggestion = dictionarySV.getSuggestions(args[i], 1)
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
                .then(message => {
                    message.delete({ timeout: 10000 })
                })
                .catch();
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
    console.log(`es-MX: Successfuly loaded ${dictionaryMX.getLength()} words`);
    console.log(`fr-FR: Successfuly loaded ${dictionaryFR.getLength()} words`);
    console.log(`it-IT: Successfuly loaded ${dictionaryIT.getLength()} words`);
    console.log(`nl-NL: Successfuly loaded ${dictionaryNL.getLength()} words`);
    console.log(`pl-PL: Successfuly loaded ${dictionaryPL.getLength()} words`);
    console.log(`pt-BR: Successfuly loaded ${dictionaryBR.getLength()} words`);
    console.log(`sv-SV: Successfuly loaded ${dictionarySV.getLength()} words`);
    console.log(`A total of ${wordTotal} words has been loaded into memory`)
})

client.login(secrets.token);