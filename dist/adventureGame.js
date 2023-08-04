import inquirer from "inquirer";
import chalk from "chalk";
async function main() {
    // system Objects
    var randomNumber = Math.floor(Math.random());
    // Player Varibales
    var health = 100;
    var attackDamage = 50;
    var numHealthPotions = 3;
    var healthPotionsAmount = 30;
    var healthPotionDropChance = 50;
    //   Game Variables
    var enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    var maxenemyHealth = 75;
    var enemyAttackDamage = 25;
    var runnung = true;
    console.log("Welcome to the Dungeon");
    GAME: while (runnung) {
        console.log("-------------------------------------------------");
        let enemyHealth = Math.floor(randomNumber * maxenemyHealth);
        let indexOfEnemy = randomNumber * enemies.length;
        console.log(indexOfEnemy);
        let enemy = enemies[indexOfEnemy];
        console.log("\t# " + enemy + " appeared!  #\n");
        while (enemyHealth > 0) {
            console.log("\tYour HP : " + health);
            console.log("\t " + enemy + "'s HP: " + enemyHealth);
            const mainfunc = async () => {
                const selected = await inquirer.prompt([
                    {
                        type: "rawlist",
                        name: "category",
                        message: "\n\tWhat would you like to do?",
                        choices: ["attack", "Drink Health Potion", "Run!"],
                    },
                ]);
                return selected.category;
            };
            let input = await mainfunc();
            console.log(input);
            if (input == "attack") {
                let damageDelt = randomNumber * attackDamage;
                let damageTaken = randomNumber * enemyAttackDamage;
                enemyHealth -= damageDelt;
                console.log("\t> You strike the " + enemy + " for " + damageDelt + " damage.");
                console.log("\t> You  recieve " + damageTaken + " in retaliation!");
                if (health < 1) {
                    console.log("\t You have taken too much damage, you are tooo weak to go on!");
                    break;
                }
            }
            else if (input == "Drink Health Potion") {
                if (numHealthPotions > 0) {
                    if (health < 100) {
                        health += healthPotionsAmount;
                        numHealthPotions--;
                        if (health > 100) {
                            health = 100;
                        }
                        console.log("\t> You drink a health potiion, healing yourself for " +
                            healthPotionsAmount +
                            "\n\t>You now have " +
                            health +
                            "HP." +
                            "\n\t> You have " +
                            numHealthPotions +
                            "health potions left.\n");
                    }
                    else {
                        console.log("You have suffiecient health");
                    }
                }
                else {
                    console.log("\t> No more health potions available! Defeat enemies for a chance to get one ");
                }
            }
            else if (input == "Run!") {
                console.log("You ran away from the " + enemy + "!");
                continue GAME;
            }
            else {
                console.log(`\tInvalid Command`);
            }
        }
        if (health < 1) {
            console.log("You limp out of the dungeon, weak fom battle.");
            break;
        }
        console.log("--------------------------------------------");
        console.log(" # The " + enemy + "was defeated #");
        console.log(" # You have " + health + " HP left. #");
        let newRandomNumber = randomNumber * 100;
        if (newRandomNumber < healthPotionDropChance) {
            numHealthPotions++;
            console.log(" # The " + enemy + "dropped a health protien # ");
            console.log(" # You have " + numHealthPotions + " health pation! #");
        }
        console.log("------------------------------------");
        const askAgain = async () => {
            const userReply = await inquirer.prompt([
                {
                    type: "list",
                    name: "again",
                    choices: ["Continue Fighting", "Exit Dungeon"],
                    message: "What would you like to do now!",
                },
            ]);
            return userReply.again;
        };
        let input = await askAgain();
        if (input == "Exit Dungeon") {
            console.log("you exit the dungeon, successful from you adventures!");
            break;
        }
        else if (input == "Continue Fighting") {
            console.log("You continue on your adventure!");
        }
    }
    console.log(chalk.blueBright("#######################"));
    console.log(chalk.redBright("# THANKS FOR PLAYING! #"));
    console.log(chalk.blueBright("#######################"));
}
export default main;
