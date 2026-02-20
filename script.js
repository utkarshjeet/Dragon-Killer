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
        health: 15,
        level: 2
    },
    {
        name: "fwend",
        health: 60,
        level: 8
    },
    {
        name: "dragon",
        health: 300,
        level: 20
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
    },

    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },

    {
        name: "win",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [goTown, goTown, goTown],
        text: "The Monster screams 'Arg!' and collapses. You gain XP and Gold ."
    },

    {
        name: "lose",
        "button text": ["Replay?", "Replay?", "Replay?"],
        "button functions": [restart, restart, restart],
        text: "You die."
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function update(location) {
    mosterStats.style.display = "none";
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

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "You bought a " + newWeapon + ".";
            weaponSelect.innerText = newWeapon;
            text.innerText += " You now have " + inventory.join(", ") + ".";
        }
        else {
            text.innerText = "You don't have enough gold to buy a weapon.";
        }
    }
    else {
        text.innerText = "You already have the best weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}



function sellWeapon() {

    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let soldWeapon = inventory.shift();
        text.innerText = "You sold a " + soldWeapon + ".";
        weaponSelect.innerText = inventory[0];
    }
    else {
        text.innerText = "You don't have a weapon to sell.";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightFwend() {
    fighting = 1;
    goFight();

}


function fightDragon() {
    fighting = 2;
    goFight();
}


function goFight() {
    update(locations[3]);
    monsterHealthText.innerText = monsters[fighting].health;
    mosterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    monsterStat.innerText = "Level: " + monsters[fighting].level;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + ".";
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    health -= monsters[fighting].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    }
    if (monsterHealth <= 0) {
        winFight();
    }
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function winFight() {
    text.innerText = "You defeated the " + monsters[fighting].name + ".";
    gold += monsters[fighting].level * 10;
    goldText.innerText = gold;
    xp += monsters[fighting].level;
    xpText.innerText = xp;
    mosterStats.style.display = "none";
    button1.innerText = "Go to Town Square";
    button1.onclick = goTown;
    button2.innerText = "Go to Cave";
    button2.onclick = goCave;
    button3.innerText = "Fight Dragon";
    button3.onclick = fightDragon;
}
