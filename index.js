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

        .setFooter(`🤖 ● Hartford`)
        .addField(`Bienvenue sur le serveur Discord de Hartford !`, `Souahitez la bienvenue à ${member} | Nous sommes actuellement ${member.guild.memberCount} !`)
        .setColor('#36393f')

    channel.send(joinembed)

})

bot.on('guildMemberAdd', (member) => {
    var ever = member.guild.roles.find(role => role.name === "@everyone");
    var channel = member.guild.channels.filter(ch => ch.type == 'voice').find(ch => ch.name.startsWith('👥 | Membres ● '));
    if(channel){
      channel.setName('👥 | Membres ● '+member.guild.memberCount);
    } 
      
})
bot.on('message', message => {
    if (message.content.startsWith(prefix + "setup")) {
        message.delete()
        if(!message.guild.member(message.author).hasPermission("VIEW_AUDIT_LOG")) return message.channel.send(noperm);

        message.channel.send('**:white_check_mark: | __Setup mis en place__ !**')
        var ever = message.guild.roles.find(role => role.name === "@everyone");
        var channel = message.guild.channels.filter(ch => ch.type == 'voice').find(ch => ch.name.startsWith('👥 | Membres ● '));
        if(channel){
          channel.setName('👥 | Membres ● '+message.guild.memberCount);
        } else {
          message.guild.createChannel('👥 | Membres ● '+message.guild.memberCount, 'voice').then(ch =>
            ch.overwritePermissions(ever, {
                VIEW_CHANNEL: true,
                CONNECT: false
            })
          )
        
        }
        

    }
})

var noperm = new Discord.RichEmbed()
    .setTitle('" + nogif + "  ● Erreur')
    .setDescription(nogif + "  Vous n'avez pas la permission d'utiliser cette commande !__")
    .setFooter('🤖 ● Hartford')
    .setColor('#36393f')

    

bot.on('message', message => {
  if(message.content.startsWith(prefix + "embed")) {
    var today = new Date();
    message.delete()

    let args = message.content.split(" | ").slice(1)
    const nogif = bot.emojis.get("717637341665296385");


    if (!args[1]) return message.channel.send(nogif + " ● Vous n'avez pas mis le contenu de votre embed ! (moins de 2000 caractères)")
    if (!args[0]) return message.channel.send(nogif + " ● Vous n'avez pas mis de titre à votre embed !")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)

    var devBlog = new Discord.RichEmbed()

    .setAuthor("📍 ● "+ args[0])
    .setColor('#36393f')
    .setDescription(args[1])
    .setTimestamp()
    .setFooter(`🤖 ● Hartford`) 
    
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

        if (!thingToEcho) return message.channel.send(nogif + " ● Vous n'avez pas mis le contenu de votre sondage ! (moins de 2000 caractères)")

        var sondage = new Discord.RichEmbed()

        .setAuthor("📜 ● Sondage")
        .setColor('#36393f')
        .addField(`Veuillez répondre par les réactions ci-dessous :`, thingToEcho)
        .setTimestamp()
        .setFooter(`🤖 ● Hartford`)
        message.channel.send(sondage)
        .then(message => {
            message.react(yesgif)
            message.react(nogif)
        })

        
    }
})


var emojiname = ["🔫", "🔫"];
var rolename=["⚡️ ● Membre", "⚡️ ● Membre"];




bot.on('message', msg => {

 if (msg.content.startsWith(prefix + "ping")) {
  msg.delete();
  const startTime = Date.now();
  msg.channel.send('```🏓 ● Pong !```')
  .then(msg => {
      const endTime = Date.now()
      msg.edit(`🏓 ● Pong ! (${endTime - startTime} ms)`)
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


bot.on('ready', message => {


    let activNum = 0;

    setInterval(function() {

        if (activNum === 0) {
          bot.user.setStatus("Online")
          bot.user.setGame(`développer le serveur.`)

          activNum = 1;
        }
        else if (activNum === 1) {
          bot.user.setStatus("dnd")
          bot.user.setGame(`trouver des easter-eggs.`)
          activNum = 2;
        }
        else if (activNum === 2) {
          bot.user.setStatus("idle")
          bot.user.setGame(`braquer la bijouterie.`)
          activNum = 0;
        }
    }, 20 * 1000)


    console.log(`[HARTFORD BOT] `.cyan + `En Ligne`.yellow);
});




bot.login(process.env.BOT_TOKEN);




bot.on('message', message => {
    if(message.content.startsWith(prefix + "ban")) {
        message.delete()
        let args = message.content.split(" ").slice(1)
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) return message.channel.send(">" + nogif + " ● Utilisateur Introuvable !");
        let raison = args.join(" ").slice(22);
        if(!raison) return message.channel.send(">" + nogif + " ● Veuillez entrer une raison dans cette syntaxe !")
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(">" + nogif + " ● Permission Manquante");
        if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(">" + nogif + " ● Cet Utilisateur ne peut être bannis !");
        

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
        .setTitle("⚒ ● La Ban Hammer a encore frappé !")
        .setThumbnail("http://atom.smasher.org/error/xp.png.php?icon=Error&title=Hartford&url=&text=La+BanHammer+a+encore+frapp%E9+%21&b1=&b2=&b3=")
        .setColor("#36393f")
        .addField("📍 ● Utilisateur Bannis:", `${user}`, true)
        .addField("🔍 ● ID Utilisateur Bannis:", `${user.id}`, true)
        .addField("👥 ● Bannis Par:", `${message.author}`, true)
        .addField("🔰 ● Raison:", raison, true)
        .setFooter(`🤖 ● Hartford`)

        let sanction = message.guild.channels.find(`name`, "⛔︱sanctions");
    
        message.guild.member(user).ban(raison);
        message.channel.send(nogif + " ● __ " + user + "__ a bien été bannis par __" + message.author.username + "__ !").then(message => {
            message.delete(30000)
          })
        bot.channels.get("705337488134373388").send(ban)
    
    
        return;
      }

      if(message.content.startsWith(prefix + "kick")) {
        message.delete()
        let args = message.content.split(" ").slice(1)
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user) return message.channel.send(">" + nogif + " ● Utilisateur Introuvable !");
        let raison = args.join(" ").slice(22);
        if(!raison) return message.channel.send(">" + nogif + " ● Veuillez entrer une raison dans cette syntaxe !")
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(">" + nogif + " ● Permission Manquante");
        if(user.hasPermission("ADMINISTRATOR")) return message.channel.send(">" + nogif + " ● Cet Utilisateur ne peut être exclu !");
    
        let kick = new Discord.RichEmbed()
        .setTitle("❌  ● Exclusion !")
        .setThumbnail("https://www.enseignons.be/app/uploads/2012/02/exclusion-2.jpg")
        .setColor("#36393f")
        .addField("📍 ● Utilisateur Exclu:", `${user}`, true)
        .addField("🔍 ● ID Utilisateur Exclu:", `${user.id}`, true)
        .addField("👥 ● Exclu Par:", `${message.author}`, true)
        .addField("🔰 ● Raison:", raison, true)
        .setFooter(`🤖 ● Hartford`)

        let sanction = message.guild.channels.find(`name`, "⛔︱sanctions");
    
        message.guild.member(user).kick(raison);
        message.channel.send(`> ${nogif} ●  __${user}__ a bien été exclu par __${message.author.username}__ !`).then(message => {
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

    if(args >= 100) return message.channel.send("> " + nogif + " ● Vous ne pouvez pas clear plus de 100 messages en une fois !")
            
    if(!args[0]) return message.channel.send("> " + nogif + " ● Vous n'avez pas précisé le nombre de messages à supprimer.")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`> ${yesgif} ● ${args[0]} messages ont été supprimés !`).then(message => {
            message.delete(10000)
          })
    
    })
}
})


const warns = JSON.parse(fs.readFileSync('./warns.json'))
 
bot.on('message', message => {


  if(message.content.startsWith(prefix + "devlog")) {
    var today = new Date();
    message.delete()

    const nogif = bot.emojis.get("717637341665296385");

    let arg = message.content.split(" | ").slice(1);
    let args = arg.join(" ")

    if (!args) return message.channel.send(nogif + " ● Vous n'avez pas mis le contenu de votre dev-blog ! (moins de 2000 caractères)")
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noperm)

    var devBlog = new Discord.RichEmbed()

    .setAuthor("💻 ● Devlog")
    .setColor('#36393f')
    .setDescription(args)
    .setTimestamp()
    .setFooter(`🤖 ● Hartford`)  
    // .setImage("https://cdn.discordapp.com/attachments/666343495383908352/705175659307335720/image0.png")


    message.channel.send({
      files: ['https://cdn.discordapp.com/attachments/666343495383908352/705175659307335720/image0.png']
    }).then(message => {
    message.channel.send(devBlog)
  })
  }

})


bot.on("message", message => {

    if (!message.guild) return

    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "addwarn") {
      const yesgif = bot.emojis.get("717637341514301514");
      const nogif = bot.emojis.get("717637341665296385");
        message.delete()


        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(">" + nogif + " ● Vous n'avez pas la permission d'utiliser cette commande !")

        let member = message.mentions.members.first()

        if (!member) return message.channel.send(">" + nogif + " ● Veuillez mentionner l'utilisateur en question !")

        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(">" + nogif + " ● Vous ne pouvez pas vous permettre d'avertir ce membre !")

        let rsWarn = args.slice(2).join(' ')

        if (!rsWarn) return message.channel.send(">" + nogif + " ● Veuillez indiquer une raison !")


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
            .setDescription(nogif + "  ● Warn :" + member)
            .setColor('#36393f')
            .addField('👥 ● Utilisateur Avertis:', member, true)
            .addField('📎 ● ID Utilisateur Avertis:', member.id, true)
            .addField('📝 ● Raison:', rsWarn, true)
            .addField('📍 ● Avertis par:', message.author, true)
            .setFooter(`🤖 ● Hartford`)

        bot.channels.get("705337488134373388").send(embwarn)
        message.channel.send(">" + yesgif + " ● " + member + " a été avertis pour: " + rsWarn).then(message => {
            message.delete(10000)
          })


    }
 
    if (args[0].toLowerCase() === prefix + "seewarn") {
      const yesgif = bot.emojis.get("717637341514301514");
      const nogif = bot.emojis.get("717637341665296385");
        message.delete()

        if (!message.member.hasPermission('VIEW_AUDIT_LOG')) return message.channel.send(">" + nogif + " ● Vous n'avez pas la permission d'utiliser cette commande !")

        let member = message.mentions.members.first()

        if (!member) return message.channel.send(">" + nogif + " ● Veuillez mentionner l'utilisateur en question !")

        let seewarn = new Discord.RichEmbed()

            .setAuthor(`❗️ ● Avertissement(s) de ${member.user.username}`, member.user.displayAvatarURL)
            .setColor('#36393f')
            .addField('Derniers Avertissement(s)', ((warns[member.id]) ? warns[member.id].slice(0, 5).map(e => e.raison) : " ● Cet utilisateur n'a aucun avertissement !"))
            .setFooter(`🤖 ● Hartford`)
            .setTimestamp()

        message.channel.send(seewarn)
        
    }
})


bot.on('message', async message => {

  let args = message.content.split(" ").slice(1)

  if (message.content.startsWith(prefix + "ticket")) {
      message.delete()

      var roleeve = message.guild.roles.find(role => role.name === "|| @everyone ||");

      var access = message.guild.roles.find(role => role.name === "👥 ● Staff");

      message.delete()

      let hembed = new Discord.RichEmbed()
          .setTitle('👥 ● Aide: Tickets')
          .setDescription('↓ Préfixe : `' + prefix + '`')
          .setColor('#36393f')
          .addField('👥 ● Commandes', '`ticket create, ticket close`', true)
          .setTimestamp()
          .setFooter(`🤖 ● Hartford`)

      if(!args[0]) return message.channel.send(hembed)

      let bddticket = JSON.parse(fs.readFileSync("./ticketsystem.json", "utf8"));

  if(args[0] === "set"){

      if(args[1] == 'on'){
        const yesgif = bot.emojis.get("717637341514301514");
        const nogif = bot.emojis.get("717637341665296385");
          let chand = message.guild.channels.find(c => c.name == "💠︱support" && c.type == "text");


          

          chand.send(`${yesgif} ● Tickets Activés !\n\n● ?ticket create`)

              chand.overwritePermissions(roleeve, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });

        if(bddticket[message.guild.id] != 0){
          var numbers = 0;
          var chantickid = [];
          var usetickid = [];
          bddticket[message.guild.id] = {numbers, chantickid, usetickid},
          fs.writeFile("./ticketsystem.json", JSON.stringify (bddticket, null, 4), err => {if (err) console.log(err)})


          
          
          if(!message.guild.channels.exists(channel => channel.name === '💠︱support')){

  
            message.guild.createChannel(`──────────🌐──────────`, "category").then(o => {
      
                o.overwritePermissions(access, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
              });
              o.overwritePermissions(roleeve, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
              });
            })

      
          }else{
              return message.channel.send(">" + nogif + " ● Erreur ! Les Commandes sont déjà activées !")
          }
           
      
          } 
        
      }else if(args[1] === 'off'){
        const yesgif = bot.emojis.get("717637341514301514");
        const nogif = bot.emojis.get("717637341665296385");
          let chands = message.guild.channels.find(c => c.name == "💠︱support" && c.type == "text");
          chands.bulkDelete("99")
          chands.send(`${nogif} ● Tickets désactivés `)

              chands.overwritePermissions(access, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
            });
              chands.overwritePermissions(roleeve, {
              SEND_MESSAGES: false,
              READ_MESSAGES: true
            });
          

          message.channel.send(`${yesgif} Le Système de tickets a bien été  __désactivé__ sur votre serveur !`)

  
        if(!bddticket[message.guild.id] == 1) return message.channel.send(">" + nogif + " ● Le système de commandes est déja __désactivé__ sur votre serveur !")

        if(bddticket[message.guild.id] == 1) return message.channel.send(">" + nogif + " ● Le système de commandes est déja __désactivé__ sur votre serveur !")

  
        var zero = 0
        bddticket[message.guild.id] = {zero}
        fs.writeFile("./ticketsystem.json", JSON.stringify (bddticket, null, 4), err => {if (err) console.log(err)})
  
  
      }



  }else if(args[0] === "create"){
    const yesgif = bot.emojis.get("717637341514301514");
    const nogif = bot.emojis.get("717637341665296385");

    
    if(!bddticket[message.guild.id] == 1) return message.channel.send(">" + nogif + " ● Le système de tickets est __désactivé__ sur votre serveur !**\n ``" + prefix + "ticket set on``")


    
 if(!message.guild.roles.exists(role => role.name === "👥 ● Staff")) return message.channel.send(nogif + "  ● Veuillez créer un rôle** \n```👥 ● Staff```")    

    var roleeve = message.guild.roles.find(role => role.name === "|| @everyone ||");

    var access = message.guild.roles.find(role => role.name === "👥 ● Staff");




    var channelcate = message.guild.channels.find(channel => channel.name === "──────────🌐──────────")
      if(!channelcate.type === 'category') return message.channel.send(nogif + " ● Catégorie Inconnue")
      var cate = channelcate.id

    if(bddticket[message.guild.id].usetickid.includes(message.author.id)) return message.channel.send(">" + nogif + " ● Vous avez deja un channel ouvert, veuillez faire votre demande dans celui-ci !").then(message => {
        message.delete(5000)
    })
    message.delete()
    var nbt = bddticket[message.guild.id].numbers + 1
    
    var channelcate = message.guild.channels.find(channel => channel.name === "──────────🌐──────────")
    if(!channelcate.type === 'category') return message.channel.send(nogif + " ● Catégorie Inconnue")
    var cate = channelcate.id

    var channelticket = await message.guild.createChannel(`➰︱ticket-${nbt}`, "text")
    channelticket.setParent(cate)
    channelticket.overwritePermissions(access, {
      READ_MESSAGES: true,
      SEND_MESSAGES: true
    });
    channelticket.overwritePermissions(roleeve, {
      READ_MESSAGES: false,
      SEND_MESSAGES: false  
    });
    channelticket.overwritePermissions(message.author, {
      READ_MESSAGES: true,
      SEND_MESSAGES: true
  });

 
  let embedmpticket = new Discord.RichEmbed()
  .setColor('#36393f')
  .setAuthor(`👥 ● Nouveau Ticket`)
  .setDescription(`Bonjour ${message.author},\n\nVotre ticket a été ouvert, veuillez vous rendre dans le channel __${channelticket}__ !`)
  .setFooter(`🤖 ● Hartford`)

  message.author.send(embedmpticket)
 
  let embTicketCreate = new Discord.RichEmbed()
  .setTitle("📓 ● Nouveau ticket !")
  .addField("📕 ● Auteur", message.author)
  .addField("📘 ● Channel", channelticket)

  bot.channels.get("717442513689903201").send(embTicketCreate)


/* JSON */

var statut = 'OPEN'
var demandeurname = message.author.username
var demandeurid = message.author.id
var adduser = []
var demandeur = {
  demandeurname,
  demandeurid
}


bddticket[message.guild.id][channelticket.id] = {statut, nbt, demandeur, adduser}
bddticket[message.guild.id].numbers = nbt
bddticket[message.guild.id].chantickid.push(channelticket.id); 
bddticket[message.guild.id].usetickid.push(message.author.id);   
fs.writeFile("./ticketsystem.json", JSON.stringify (bddticket, null, 4), err => {if (err) console.log(err)});

let embednewticket = new Discord.RichEmbed()
 .setColor('#36393f')
 .setAuthor(`👥 ● Ticket Support`, bot.user.avatarURL)
 .setFooter(`🤖 ● Hartford`)
 .setDescription(`Bonjour __${message.author}__ !\nBienvenue sur l'espace dédié à votre ticket, veuillez préciser votre requête ou vos questions, les membres du staff vous répondront d'ici peu.\n\nVous pouvez fermer votre ticket avec la commande suivante: ?ticket close !`)
 channelticket.send(embednewticket)

  }else if(args[0] === "close"){
    
    const yesgif = bot.emojis.get("717637341514301514");
    const nogif = bot.emojis.get("717637341665296385");

    if(!bddticket[message.guild.id].chantickid.includes(message.channel.id)) return message.channel.send(nogif + " ● Vous devez être dans un channel dédié aux tickets afin de supprimer votre ticket !").then(message => {
        message.delete(5000)
    })

    if(bddticket[message.guild.id][message.channel.id].adduser){
    if(bddticket[message.guild.id][message.channel.id].adduser.includes(message.author.id)) return message.channel.send(nogif + " ● Vous ne pouvez pas fermer ce __ticket__ !")
    }
    
    
    


 bot.users.get(bddticket[message.guild.id][message.channel.id].demandeur.demandeurid)


    if(bddticket[message.guild.id].chantickid.includes(message.channel.id)){
      var channelIdIndex = bddticket[message.guild.id].chantickid.indexOf(message.channel.id);
      bddticket[message.guild.id].chantickid.splice(channelIdIndex, 1);

    }
      

    if(bddticket[message.guild.id].usetickid.includes(bddticket[message.guild.id][message.channel.id].demandeur.demandeurid)){
        var channelIdIndex = bddticket[message.guild.id].usetickid.indexOf(bddticket[message.guild.id][message.channel.id].demandeur.demandeurid);
        bddticket[message.guild.id].usetickid.splice(channelIdIndex, 1);
    }


      var close = 'CLOSE'
    bddticket[message.guild.id][message.channel.id].statut = close
    fs.writeFile("./ticketsystem.json", JSON.stringify (bddticket, null, 4), err => {if (err) console.log(err)});

    message.channel.delete()

  }
}

})  
