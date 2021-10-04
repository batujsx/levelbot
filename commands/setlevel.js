const {MessageEmbed,Permissions} = require('discord.js');
const guilds = require("../models/guild");
exports.run = async (client, message, args) => {

if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send({content: 'Bu komutu kullanmak için yeterli yetkiniz yok'})
 
  let role = message.mentions.roles.first();
  if(!role) return message.channel.send({content: 'Bir rol etiketlemelisiniz.'})
  if(!args[1]) return message.channel.send({content: 'Level belirtmelisiniz.'})
  await guilds.updateOne({ guildID: message.guild.id }, {$push: { roles: { roleID: role.id, level: Number(args[1]) } } }, { upsert: true })
  const levelEmbed = new MessageEmbed()
  .setTitle(`Rol Ayarlandı`)
  .setDescription(`Artık Kullanıcılar **${args[1]}** leveline ulaşınca **${role}** rolüne sahip olucaklar`)
  message.channel.send({embeds: [levelEmbed]})
};

exports.name = "levelset";