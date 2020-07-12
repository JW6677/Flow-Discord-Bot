const Discord = require ('discord.js');
const SpellChecker = require('simple-spellchecker');
const fs = require("fs");
const client = new Discord.Client();
const version = 'Flow V1.0.5';
const PREFIX = '?'

//Loading secrets file / Json Parsing
const secretsFile = fs.readFileSync('./secrets.json');
const secrets = JSON.parse(secretsFile);

const dictionaryDE = SpellChecker.getDictionarySync('de-DE'); //German Dictionary 
const dictionaryGB = SpellChecker.getDictionarySync('en-GB'); //British English Dictionary
const dictionaryUS = SpellChecker.getDictionarySync('en-US'); //American English Dictionary
const dictionaryES = SpellChecker.getDictionarySync('es-ES'); //Spanish Dictionary
const dictionaryMX = SpellChecker.getDictionarySync('es-MX'); //Spanish Mexico Dictionary
const dictionaryFR = SpellChecker.getDictionarySync('fr-FR'); //French Dictionary
const dictionaryIT = SpellChecker.getDictionarySync('it-IT'); //Italian Dictionary N
const dictionaryNL = SpellChecker.getDictionarySync('nl-NL'); //Dutch Dictionary N
const dictionaryPL = SpellChecker.getDictionarySync('pl-PL'); //Polish Dictionary N
const dictionaryBR = SpellChecker.getDictionarySync('pt-BR'); //Brazil Portuguese Dictionary N
const dictionarySV = SpellChecker.getDictionarySync('sv-SE'); //Sweedish Dictionary N
const wordTotal = dictionaryDE.getLength() + dictionaryGB.getLength() + dictionaryUS.getLength() + dictionaryES.getLength() + dictionaryMX.getLength() + dictionaryFR.getLength() + dictionaryIT.getLength() + dictionaryNL.getLength() + dictionaryPL.getLength() + dictionaryBR.getLength() + dictionarySV.getLength()

const botInfo = new Discord.MessageEmbed()
.setTitle('Flow Info BETA')
.addField('Flow Version', version)
.addField('German Words', dictionaryDE.getLength())
.addField('English - British Words', dictionaryGB.getLength())
.addField('English - American Words', dictionaryUS.getLength())
.addField('Spanish Words', dictionaryES.getLength())
.addField('Spanish Mexico Words', dictionaryMX.getLength())
.addField('French Words', dictionaryFR.getLength())
.addField('Italian Words', dictionaryIT.getLength())
.addField('Dutch Words', dictionaryNL.getLength())
.addField('Polish Words', dictionaryPL.getLength())
.addField('Brazillian Portuguese Words', dictionaryBR.getLength())
.addField('Sweedish Words', dictionarySV.getLength())
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