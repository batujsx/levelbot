const { MessageEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
  let prefix = process.env.PREFIX;
  const embed = new MessageEmbed()
  .setDescription(`> ${prefix}sıralama => Sıralamadaki 10 kişiyi gösterir. \n> ${prefix}level - Etiketlenen kullanıcının level bilgisini gösterir. \n \nBelirtilen komutlar sizin yetkinize göre listelenir, yetkinizin yetmediği komutları göstermez.`)
  .setThumbnail(message.author.avatarURL())
  .setColor('BLUE')
  message.channel.send({embeds: [embed]})

};

exports.name = "yardım";
