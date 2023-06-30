const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii().setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./Commands/").forEach((dir) => {
        const commands = readdirSync(`./Commands/${dir}/`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            const command = require(`../Commands/${dir}/${file}`);

            if (command.name) {
                client.commands.set(command.name, command);
                table.addRow(file, "✅ SUCCESSFUL");
            } else {
                table.addRow(file, "❌ -> missing a command.name, or command.name is not a string.");
                continue;
            }
        }
    });

    console.log(table.toString());
}
