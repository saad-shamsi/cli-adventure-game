import inquirer from "inquirer";
import chalk from "chalk";
async function main() {
    var running = true;
    var health = 100;
    var attackDamage = 50;
    var numHealthPotions = 3;
    var healthPotionsAmount = 30;
    var healthPotionDropChance = 50;
    var enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    var maxenemyHealth = 75;
    var enemyAttackDamage = 25;
    console.log("Welcome to the Dungeon");
    while (running) {
        console.log("-------------------------------------------------");
        var randomNumber = Math.random();
        var enemyHealth = Math.floor(randomNumber * maxenemyHealth);
        var indexOfEnemy = Math.floor(Math.random() * enemies.length);
        var enemy = enemies[indexOfEnemy];
        console.log("\t# " + enemy + " appeared!  #\n");
        while (enemyHealth > 0 && health > 0) {
            console.log("\tYour HP : " + health);
            console.log("\t" + enemy + "'s HP: " + enemyHealth);
            const selected = await inquirer.prompt([
                {
                    type: "rawlist",
                    name: "category",
                    message: "\n\tWhat would you like to do?",
                    choices: ["attack", "Drink Health Potion", "Run!"],
                },
            ]);
            const input = selected.category;
            if (input === "attack") {
                var damageDelt = Math.floor(randomNumber * attackDamage);
                var damageTaken = Math.floor(randomNumber * enemyAttackDamage);
                enemyHealth -= damageDelt;
                health -= damageTaken;
                console.log("\t> You strike the " + enemy + " for " + damageDelt + " damage.");
                console.log("\t> You receive " + damageTaken + " in retaliation!");
                if (health < 1) {
                    console.log("\t You have taken too much damage, you are too weak to go on!");
                    break;
                }
            }
            else if (input === "Drink Health Potion") {
                if (numHealthPotions > 0) {
                    if (health < 100) {
                        health += healthPotionsAmount;
                        numHealthPotions--;
                        if (health > 100) {
                            health = 100;
                        }
                        console.log("\t> You drink a health potion, healing yourself for " +
                            healthPotionsAmount +
                            "\n\t>You now have " +
                            health +
                            " HP." +
                            "\n\t> You have " +
                            numHealthPotions +
                            " health potions left.\n");
                    }
                    else {
                        console.log("You have sufficient health");
                    }
                }
                else {
                    console.log("\t> No more health potions available! Defeat enemies for a chance to get one");
                }
            }
            else if (input === "Run!") {
                console.log("You ran away from the " + enemy + "!");
                break;
            }
            else {
                console.log(`\tInvalid Command`);
            }
        }
        if (health < 1) {
            console.log("You limp out of the dungeon, weak from battle.");
            break;
        }
        console.log("--------------------------------------------");
        console.log(" # The " + enemy + " was defeated #");
        console.log(" # You have " + health + " HP left. #");
        var newRandomNumber = Math.random() * 100;
        if (newRandomNumber < healthPotionDropChance) {
            numHealthPotions++;
            console.log(" # The " + enemy + " dropped a health potion # ");
            console.log(" # You have " + numHealthPotions + " health potions! #");
        }
        console.log("------------------------------------");
        const inputAgain = await inquirer.prompt([
            {
                type: "list",
                name: "again",
                choices: ["Continue Fighting", "Exit Dungeon"],
                message: "What would you like to do now!",
            },
        ]);
        if (inputAgain.again === "Exit Dungeon") {
            console.log("You exit the dungeon, successful from your adventures!");
            running = false;
        }
        else if (inputAgain.again === "Continue Fighting") {
            console.log("You continue on your adventure!");
        }
    }
    console.log(chalk.blueBright("#######################"));
    console.log(chalk.redBright("# THANKS FOR PLAYING! #"));
    console.log(chalk.blueBright("#######################"));
}
export default main;
