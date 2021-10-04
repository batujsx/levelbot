const {MessageEmbed, Permissions,MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");
const levels = require("../models/levels");
const guildss = require("../models/guild");
exports.run = async (client, message, args) => {
  
  const { levelSystem } = await guildss.findOne({ guildID: message.guild.id }) || { levelSystem: null };
  if (!levelSystem) return message.channel.send({ content: "Seviye sistemi aktif değil açmak için: `!level-sistem aç`" })
  
  let member = message.mentions.members.first() || message.member;
  
  const x = await levels.findOne({ guildID: message.guild.id, userID: member.user.id }) 
  
  if(args[0] == 'sıfırla'){
   
    if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'Bu komutu kullanmak için yeterli yetkiniz yok'})
     const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!member) return message.channel.send({ content: "Kullanıcı belirtmelisin." });
    await levels.updateOne({guildID: message.guild.id, userID: member.user.id}, {$set: {level: 0}}, {upsert: true });
  const levelsıfırla = new MessageEmbed().setDescription(`${member} isimli kişinin verisi sıfırlandı`);
    message.channel.send({embeds:[levelsıfırla]})
    return;
  }
  
  if (x) {
    

const rank = new canvacord.Rank()
    .setAvatar(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png?size=2048`)
    .setCurrentXP(x.xp)
    .setLevel(x.level)
    .setRequiredXP(x.gerekli)
    .setStatus("dnd")
    .setProgressBar("#14bdb0", "COLOR")
    .setUsername(member.user.username)
    .setRankColor('transparent', 'transparent')
    .setBackground('IMAGE','https://paraliveshub.com/wp-content/uploads/2019/07/header-discord-1024x410.jpg')
    .setDiscriminator(member.user.discriminator);

rank.build()
    .then(data => {
        const attachment = new MessageAttachment(data, "RankCard.png");
        message.channel.send({content:`Selam ${message.author}, level bilgilerin aşağı resim halinde gösteriliyor!`,files:[attachment]});
    });
  return;
  }
  

  
  }
 

exports.name = "level";