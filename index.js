const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const bot = new Discord.Client({disableEveryone: false});
const fs = require('fs');
const prefix = "?"
const ms = require('ms')
const colors = require("colors")

const yesgif = bot.emojis.get("717637341514301514");
const nogif = bot.emojis.get("717637341665296385");

bot.on('guildMemberAdd', member => {
    const salutation = bot.emojis.get("717646193710071808");

    const channel = bot.channels.find("name", "🎉︱accueil")
    var joinembed = new Discord.RichEmbed()
        .setTitle(salutation +' | Nouvel Arrivant')

        .setFooter(`🤖 ● MssClick - Braquages`)
        .addField(`Bienvenue sur le serveur Discord de MssClick - Braquages !`, `Souahitez la bienvenue à ${member} | Nous sommes actuellement ${member.guild.memberCount} !`)
        .setColor('#36393f')

    channel.send(joinembed)

})

bot.on('guildMemberAdd', (member) => {
    var ever = member.guild.roles.find(role => role.name === "@everyone");
    var channel = member.guild.channels.filter(ch => ch.type == 'voice').find(ch => ch.name.startsWith('👥 | Membres » '));
    if(channel){
      channel.setName('👥 | Membres » '+member.guild.memberCount);
    } 
      
})
bot.on('message', message => {
    if (message.content.startsWith(prefix + "setup")) {
        message.delete()
        if(!message.guild.member(message.author).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(noperm);

        message.channel.send('**:white_check_mark: | __Setup mis en place__ !**')
        var ever = message.guild.roles.find(role => role.name === "@everyone");
        var channel = message.guild.channels.filter(ch => ch.type == 'voice').find(ch => ch.name.startsWith('👥 | Membres » '));
        if(channel){
          channel.setName('👥 | Membres » '+message.guild.memberCount);
        } else {
          message.guild.createChannel('👥 | Membres » '+message.guild.memberCount, 'voice').then(ch =>
            ch.overwritePermissions(ever, {
                VIEW_CHANNEL: true,
                CONNECT: false
            })
          )
        
        }
        

    }
})

var noperm = new Discord.RichEmbed()
    .setTitle('" + nogif + "  » Erreur')
    .setDescription(nogif + "  Vous n'avez pas la permission d'utiliser cette commande !__")
    .setFooter('🤖 ● MssClick - Braquages')
    .setColor('#36393f')

    

bot.on('message', message => {
  if(message.content.startsWith(prefix + "embed")) {
    var today = new Date();
    message.delete()

    let args = message.content.split(" | ").slice(1)


    if (!args[1]) return message.channel.send(nogif + " » Vous n'avez pas mis le contenu de votre embed ! (moins de 2000 caractères)")
    if (!args[0]) return message.channel.send(nogif + " » Vous n'avez pas mis de titre à votre embed !")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)

    var devBlog = new Discord.RichEmbed()

    .setAuthor("📍 » "+ args[0])
    .setColor('#36393f')
    .setDescription(args[1])
    .setTimestamp()
    .setFooter(`🤖 ● MssClick - Braquages`) 
    
    message.channel.send(devBlog)
    // .setImage("https://cdn.discordapp.com/attachments/666343495383908352/705175659307335720/image0.png")
  }
    if (message.content.startsWith(prefix + "sondage")) {
      const yesgif = bot.emojis.get("717637341514301514");
      const nogif = bot.emojis.get("717637341665296385");
        message.delete()

        if(!message.guild.member(message.author).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(noperm);

        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        // const yes = bot.emojis.get("621070770499747861");
        // const nogif = bot.emojis.get("621070770696880128");

        if (!thingToEcho) return message.channel.send(nogif + " » Vous n'avez pas mis le contenu de votre sondage ! (moins de 2000 caractères)")

        var sondage = new Discord.RichEmbed()

        .setAuthor("📜 » Sondage")
        .setColor('#36393f')
        .addField(`Veuillez répondre par les réactions ci-dessous :`, thingToEcho)
        .setTimestamp()
        .setFooter(`🤖 ● MssClick - Braquages`)
        message.channel.send(sondage)
        .then(message => {
            message.react(yesgif)
            message.react(nogif)
        })

        
    }
})


var emojiname = ["🔫", "🔫"];
var rolename=["⚡️ ● Membre", "⚡️ ● Membre"];


let embedReaction = new Discord.RichEmbed()

  .setDescription(":round_pushpin: Bienvenue à toi sur le serveur discord dédié aux braquages sur MssClick !\n\nNous t'invitons, pour avoir un accès complet au serveur discord, à utiliser la réaction ci-dessous !\n\nEn te souhaitant une bonne navigation sur notre serveur Discord !\n\nUn problème avec la réaction ? Envoyez-nous un message !\n\n🔫 » Vos kheys préférés.")
  .setColor('#36393f')
  .setFooter(`🤖 ● MssClick - Braquages`)


bot.on('message', msg => {

 if (msg.content.startsWith(prefix + "ping")) {
  msg.delete();
  const startTime = Date.now();
  msg.channel.send('```🏓 » Pong !```')
  .then(msg => {
      const endTime = Date.now()
      msg.edit(`🏓 » Pong ! (${endTime - startTime} ms)`)
      .then(message => {
          message.delete(10000)
        })
  });
  }
});



bot.on("messageReactionAdd",(reaction,user)=>{

  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  for(let n in emojiname){
  if(reaction.emoji.name == "🔫"){
    let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);          
    reaction.message.guild.member(user).addRole(role).catch(console.error);
  }
}
});


bot.on("messageReactionRemove",(reaction,user)=>{

  if(!user) return;
  if(user.bot)return;
  if(!reaction.message.channel.guild) return;
  for(let n in emojiname){
  if(reaction.emoji.name == "🔫"){
    let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);   
    reaction.message.guild.member(user).removeRole(role).catch(console.error);
  }
  }
});

bot.on('raw', packet => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = bot.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
        }
    });
});
// let welcomestaffanim = new Discord.RichEmbed()
//   .setAuthor(`🎉 » Bienvenue à toi dans le staff de la Heaven Community !`)
//   .setDescription("» Tu pourras trouver ci-dessous les principales choses qui te seront nécessaire !")
//   .addField("📝 » Règlement", "https://heaven-community.com/forum/thread-23.html (attends que tes permissions t'aient été assignées)")
//   .addField("🤖 » Discord Staff", "https://discord.gg/qnnJFSy » " + nogif + "  de propager le lien sous peine d'un licenciment direct")
//   .setColor('#36393f')
//   .setTimestamp()
//   .setFooter(`🤖 ● MssClick - Braquages`)
// let welcomestaffmod = new Discord.RichEmbed()
//   .setAuthor(`🎉 » Bienvenue à toi dans le staff de la Heaven Community !`)
//   .setDescription("» Tu pourras trouver ci-dessous les principales choses qui te seront nécessaire !")
//   .addField("📝 » Règlement", "https://heaven-community.com/forum/thread-22.html (attends que tes permissions t'aient été assignées)")
//   .addField("🤖 » Discord Staff", "https://discord.gg/qnnJFSy » " + nogif + "  de propager le lien sous peine d'un licenciment direct")
//   .setColor('#36393f')
//   .setTimestamp()
//   .setFooter(`🤖 ● MssClick - Braquages`)
// let welcomestaffhlp = new Discord.RichEmbed()
//   .setAuthor(`🎉 » Bienvenue à toi dans le staff de la Heaven Community !`)
//   .setDescription("» Tu pourras trouver ci-dessous le discord staff qui te sera nécessaire !")
//   .addField("🤖 » Discord Staff", "https://discord.gg/qnnJFSy » " + nogif + "  de propager le lien sous peine d'un licenciment direct")
//   .setColor('#36393f')
//   .setTimestamp()
//   .setFooter(`🤖 ● MssClick - Braquages`)
// let noarg = new Discord.RichEmbed()
//   .setDescription(`❌ » Erreur ! Veuillez suivre le modèle ci-dessous:\n\n${prefix}add <swtor » military » poudlard> <modérateur » animateur » helpeur (que pour le SWTOR)> <mention du joueur>`)
//   .setColor('#36393f')
//   .setTimestamp()
//   .setFooter(`🤖 ● MssClick - Braquages`)

// bot.on('message', message => {

//   if (message.content.startsWith(prefix + "add")) {
//     message.delete()

//     let args = message.content.split(" ").slice(1)
//     let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[2]));

//     if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)

//     if (!user) return message.channel.send(noarg).then(message => {
//       message.delete(10000)
//     })

//     if (!args[0]) return message.channel.send(noarg).then(message => {
//       message.delete(10000)
//     })

//     if (!args[1]) return message.channel.send(noarg).then(message => {
//       message.delete(10000)
//     })

//     if (!args[2]) return message.channel.send(noarg).then(message => {
//       message.delete(10000)
//     })

//     if(args[0] === "modérateur"){



//       if(args[1] === "swtor"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff SWTOR RP (modérateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('545263736190009389')

//         bot.channels.get("646414937501204480").send(varstaff)

//         user.send(welcomestaffmod)



//       }

//       if(args[1] === "military"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff Military RP (modérateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('626397958207963147')

//         bot.channels.get("646414937501204480").send(varstaff)
//         user.send(welcomestaffmod)

//       }
//       if(args[1] === "poudlard"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff Poudlard RP (modérateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('646393894497681409')

//         bot.channels.get("646414937501204480").send(varstaff)
//         user.send(welcomestaffmod)

//       }
//   }

//   if(args[0] === "animateur")

//         if(args[1] === "swtor"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff SWTOR RP (animateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('574992187952070656')

//         bot.channels.get("646414937501204480").send(varstaff)
//         user.send(welcomestaffanim)

//       }

//       if(args[1] === "military"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff Military RP (animateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('626398511314894853')

//         bot.channels.get("646414937501204480").send(varstaff)
//         user.send(welcomestaffanim)

//       }
//       if(args[1] === "poudlard"){

//         let varstaff = new Discord.RichEmbed()
//         .setDescription(`🎉 » Bienvenue à ${user} dans le staff Poudlard RP (animateur en test) ! @everyone`)
//         .setColor('#36393f')
//         .setTimestamp()
//         .setFooter(`🤖 ● MssClick - Braquages`)

//         user.addRole('646394216800583680')

//         bot.channels.get("646414937501204480").send(varstaff)
//         user.send(welcomestaffanim)

//       }

      
//   if(args[0] === "helpeur") {

//     if(args[1] === "swtor"){

//       let varstaff = new Discord.RichEmbed()
//       .setDescription(`🎉 » Bienvenue à ${user} dans le staff SWTOR RP (helpeur) ! @everyone`)
//       .setColor('#36393f')
//       .setTimestamp()
//       .setFooter(`🤖 ● MssClick - Braquages`)

//       user.addRole('646837323736154112')

//       bot.channels.get("646414937501204480").send(varstaff)

//       user.send(welcomestaffhlp)

//     }
//   }

//   }

// })

bot.on('ready', message => {


    let activNum = 0;

    setInterval(function() {

        if (activNum === 0) {
          bot.user.setStatus("Online")
          bot.user.setGame(`braquer la banque.`)

          activNum = 1;
        }
        else if (activNum === 1) {
          bot.user.setStatus("dnd")
          bot.user.setGame(`voler le dépot.`)
          activNum = 2;
        }
        else if (activNum === 2) {
          bot.user.setStatus("idle")
          bot.user.setGame(`braquer le micromania.`)
          activNum = 3;
        }
        else if (activNum === 3) {
          bot.user.setStatus("idle")
          bot.user.setGame(`libérer tout le monde.`)
          activNum = 0;
        }
    }, 20 * 1000)


    console.log(`[MSSCLICK BOT] `.cyan + `En Ligne`.yellow);
});




bot.login(process.env.BOT_TOKEN);




bot.on('message', message => {
    if(message.content.startsWith(prefix + "ban")) {
        message.delete()
        let args = message.content.split(" ").slice(1)
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) return message.channel.send(">" + nogif + " » Utilisateur Introuvable !");
        let raison = args.join(" ").slice(22);
        if(!raison) return message.channel.send(">" + nogif + " » Veuillez entrer une raison dans cette syntaxe !")
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(">" + nogif + " » Permission Manquante");
        if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(">" + nogif + " » Cet Utilisateur ne peut être bannis !");
        

        var roleevde = message.guild.roles.find(role => role.name === "|| @everyone ||");
        var rolestaffs = message.guild.roles.find(role => role.name === "👤 ● Chef de Bande");
        message.guild.createChannel(`⛔︱sanctions`, "text").then(od => {
        
            od.overwritePermissions(rolestaffs, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
          });
          od.overwritePermissions(roleevde, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
          });
        })
        let ban = new Discord.RichEmbed()
        .setTitle("⚒ » La Ban Hammer a encore frappé !")
        .setThumbnail("http://atom.smasher.org/error/xp.png.php?icon=Error&title=MssClick+-+Braquages&url=&text=La+BanHammer+a+encore+frapp%E9+%21&b1=&b2=&b3=")
        .setColor("#36393f")
        .addField("📍 » Utilisateur Bannis:", `${user}`, true)
        .addField("🔍 » ID Utilisateur Bannis:", `${user.id}`, true)
        .addField("👥 » Bannis Par:", `${message.author}`, true)
        .addField("🔰 » Raison:", raison, true)
        .setFooter(`🤖 ● MssClick - Braquages`)

        let sanction = message.guild.channels.find(`name`, "⛔︱sanctions");
    
        message.guild.member(user).ban(raison);
        message.channel.send(nogif + " » __ " + user + "__ a bien été bannis par __" + message.author.username + "__ !").then(message => {
            message.delete(30000)
          })
        bot.channels.get("705337488134373388").send(ban)
    
    
        return;
      }

      if(message.content.startsWith(prefix + "kick")) {
        message.delete()
        let args = message.content.split(" ").slice(1)
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) return message.channel.send(">" + nogif + " » Utilisateur Introuvable !");
        let raison = args.join(" ").slice(22);
        if(!raison) return message.channel.send(">" + nogif + " » Veuillez entrer une raison dans cette syntaxe !")
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(">" + nogif + " » Permission Manquante");
        if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(">" + nogif + " » Cet Utilisateur ne peut être exclu !");
    
        let kick = new Discord.RichEmbed()
        .setTitle("❌  » Exclusion !")
        .setThumbnail("https://www.enseignons.be/app/uploads/2012/02/exclusion-2.jpg")
        .setColor("#36393f")
        .addField("📍 » Utilisateur Exclu:", `${user}`, true)
        .addField("🔍 » ID Utilisateur Exclu:", `${user.id}`, true)
        .addField("👥 » Exclu Par:", `${message.author}`, true)
        .addField("🔰 » Raison:", raison, true)
        .setFooter(`🤖 ● MssClick - Braquages`)

        let sanction = message.guild.channels.find(`name`, "⛔︱sanctions");
    
        message.guild.member(user).kick(raison);
        message.channel.send(`> ${nogif} »  __${user}__ a bien été exclu par __${message.author.username}__ !`).then(message => {
            message.delete(30000)
          })
        bot.channels.get("705337488134373388").send(kick)
    
    
        return;
      }

    
})

bot.on('message', message => {
if(message.content.startsWith(prefix + "clearchat")){
  const yesgif = bot.emojis.get("717637341514301514");
  const nogif = bot.emojis.get("717637341665296385");
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopermz);
    message.delete();


    let args = message.content.split(" ").slice(1);

    if(args >= 100) return message.channel.send("> " + nogif + " » Vous ne pouvez pas clear plus de 100 messages en une fois !")
            
    if(!args[0]) return message.channel.send("> " + nogif + " » Vous n'avez pas précisé le nombre de messages à supprimer.")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`> ${yesgif} » ${args[0]} messages ont été supprimés !`).then(message => {
            message.delete(10000)
          })
    
    })
}
})


const warns = JSON.parse(fs.readFileSync('./warns.json'))
 


bot.on("message", message => {

    if (!message.guild) return

    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "addwarn") {
      const yesgif = bot.emojis.get("717637341514301514");
      const nogif = bot.emojis.get("717637341665296385");
        message.delete()


        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(">" + nogif + " » Vous n'avez pas la permission d'utiliser cette commande !")

        let member = message.mentions.members.first()

        if (!member) return message.channel.send(">" + nogif + " » Veuillez mentionner l'utilisateur en question !")

        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(">" + nogif + " » Vous ne pouvez pas vous permettre d'avertir ce membre !")

        let rsWarn = args.slice(2).join(' ')

        if (!rsWarn) return message.channel.send(">" + nogif + " » Veuillez indiquer une raison !")


        if (!warns[member.id]) {

            warns[member.id] = []

        }

        warns[member.id].unshift({

            reason: rsWarn,
            author: message.author.id,
          
            date: Date.now()
        })

        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        
        let embwarn = new Discord.RichEmbed()
            .setDescription(nogif + "  » Warn :" + member)
            .setColor('#36393f')
            .addField('👥 » Utilisateur Avertis:', member, true)
            .addField('📎 » ID Utilisateur Avertis:', member.id, true)
            .addField('📝 » Raison:', rsWarn, true)
            .addField('📍 » Avertis par:', message.author, true)
            .setFooter(`🤖 ● MssClick - Braquages`)

        bot.channels.get("705337488134373388").send(embwarn)
        message.channel.send(">" + yesgif + " » " + member + " a été avertis pour: " + rsWarn).then(message => {
            message.delete(10000)
          })


    }
 
    if (args[0].toLowerCase() === prefix + "seewarn") {
      const yesgif = bot.emojis.get("717637341514301514");
      const nogif = bot.emojis.get("717637341665296385");
        message.delete()

        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(">" + nogif + " » Vous n'avez pas la permission d'utiliser cette commande !")

        let member = message.mentions.members.first()

        if (!member) return message.channel.send(">" + nogif + " » Veuillez mentionner l'utilisateur en question !")

        let seewarn = new Discord.RichEmbed()

            .setAuthor(`❗️ » Avertissement(s) de ${member.user.username}`, member.user.displayAvatarURL)
            .setColor('#36393f')
            .addField('Derniers Avertissement(s)', ((warns[member.id]) ? warns[member.id].slice(0, 5).map(e => e.raison) : " » Cet utilisateur n'a aucun avertissement !"))
            .setFooter(`🤖 ● MssClick - Braquages`)
            .setTimestamp()

        message.channel.send(seewarn)
        
    }
})








bot.on('message', message => {
    if (message.content.startsWith(prefix + "choix")) {
        message.delete()
        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(">" + nogif + " » Vous n'avez pas la permission d'utiliser cette commande !")
        let args = message.content.split(" | ").slice(1)
        if(!args[0]) return message.channel.send(">" + nogif + " » Veuillez préciser votre __premier__ choix afin de mettre en ligne votre 'Tu préfères ?'  !").then( message => {
            message.delete(10000)
        })
        if(!args[1]) return message.channel.send(">" + nogif + " » Veuillez préciser votre __second__ choix afin de mettre en ligne votre 'Tu préfères ?'  !").then( message => {
            message.delete(10000)
        })
        const vio = bot.emojis.get("717637500075507744");
        const jaun = bot.emojis.get("717637500469903420");
        let choixemb = new Discord.RichEmbed()
            .setTitle('👥 » Tu préfères ?')
            .addField('Fais ton choix...\n\n', `${vio} » __${args[0]}__\n\n${jaun} » __${args[1]}__`)
            .setColor('#36393f')
            .setFooter(`🤖 ● MssClick - Braquages`)

        message.channel.send(choixemb).then(function (message){
            message.react(vio)
            message.react(jaun)
         }).catch(function(){
             message.channel.send(nogif + " » Erreur !")
         })
    }})
