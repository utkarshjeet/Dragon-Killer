let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


const button1 = document.getElementById("btn-store");
const button2 = document.getElementById("btn-cave");
const button3 = document.getElementById("btn-dragon");
const text = document.getElementById("text");
const xpText = document.getElementById("xp");
const healthText = document.getElementById("health");
const goldText = document.getElementById("gold");
const monsterHealthText = document.getElementById("monsterHealth");
const weaponSelect = document.getElementById("weapon");
const monsterStat = document.getElementById("monsterStat");
const monsterNameText = document.getElementById("monsterName");
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        health: 10,
        power: 2
    },
    {
        name: "fwend",
        health: 20,
        power: 5
    },
    {
        name: "dragon",
        health: 100,
        power: 10
    }
];


const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says 'Store'."
    },

    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Sell weapon for 15 gold", "Go to Town Square"],
        "button functions": [buyHealth, sellWeapon, goTown],
        text: "You go to the store."
    },

    {
        name: "cave",
        "button text": ["Fight slime", "Fight fwend", "Run"],
        "button functions": [fightSlime, fightFwend, goTown],
        text: "You enter the cave. You see a dragon."
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;

}

function goTown() {
    update(locations[0]);
}


function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightDragon() {
    update(locations[3]);
}

function buyHealth() {

    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = "You don't have enough gold to buy health.";
    }

}

function sellWeapon() {

    if (inventory.length > 1) {
        gold += 15;
        health -= 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        inventory.pop();
        text.innerText = "You sold your weapon.";
    }
    else {
        text.innerText = "You don't have a weapon to sell.";
    }
}

function fightSlime() {
    update(locations[6]);
}

function fightFwend() {
    update(locations[7]);
}









