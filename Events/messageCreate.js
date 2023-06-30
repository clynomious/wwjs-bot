const chalk = require("chalk");

function printLog(cmdName, isCmd, pushName, numberId, gcName, isGc) {
    let time = new Date().toLocaleTimeString()
    
	if (isCmd && isGc) {
		return console.log("\n" + chalk.white.bgBlue(`[${time}]`) + chalk.black.bgGreen( "", cmdName, "by", pushName + " : " + numberId.split("@")[0], "in", gcName, ""));
	}
	if (isCmd && !isGc) {
		return console.log("\n" + chalk.white.bgBlue(`[${time}]`) + chalk.black.bgGreen( "", cmdName, "by", pushName + " : " + numberId.split("@")[0], "" ));
	}
}

module.exports = messageCreate = async (msg, client) => {
  try {
    if (msg.fromMe) return;
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const pushName = contact.pushname;
    const numberId = contact.id._serialized

    const isCmd = msg.body.startsWith(client.config.prefix);
    const isGroup = chat.isGroup;
    const gcName = isGroup ? chat.name : "";

    const args = msg.body.slice(client.config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

    if (!cmd) return;

    printLog( command, isCmd, pushName, numberId, gcName, isGroup);

    try {
      cmd.execute(msg, args, client);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};
