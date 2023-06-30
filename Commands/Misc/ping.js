module.exports = {
    name: "ping",
    alias: ["p"],
    description: "Ping command",
    category: "Misc",

    async execute(msg, args, client) {
        await msg.reply("Pong!");
    }
}