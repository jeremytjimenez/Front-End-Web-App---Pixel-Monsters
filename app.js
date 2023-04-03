let pixelMonsterImg = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=";
let pixelMonsterImg2 = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=";

let pixelMonsterSizes = {
    m1: 190,
    m2: 200
}

let monsterForm = document.querySelector("#monsterform form");
let monster1name = document.querySelector("#m1name");
let monster1warrior = document.querySelector("#m1warrior");
let monster1caster = document.querySelector("#m1caster");
let monster1archer = document.querySelector("#m1archer");

let monster2name = document.querySelector("#m2name");
let monster2warrior = document.querySelector("#m2warrior");
let monster2caster = document.querySelector("#m2caster");
let monster2archer = document.querySelector("#m2archer");

let m1action = document.querySelector("#m1fight");
let m2action = document.querySelector("#m2fight");

let infoSplash = document.querySelector("#infosplash");

function fetchAPI(url, callback) {
    fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          callback(response);
        })
        .catch((error) => {
          console.log(error);
        })
}

function bgGenerator() {
    let r = getRandomInt(0, 255);
    let g = getRandomInt(0, 255);
    let b = getRandomInt(0, 255);
    let tiles = getRandomInt(1, 50);
    let tileSize = getRandomInt(1, 20);
    let borderWidth = getRandomInt(0, 15);
    let mode = 1;

    let PHPBackgroundAPI = `https://php-noise.com/noise.php?r=${r}&g=${g}&b=${b}&tiles=${tiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&mode=${mode}&json`;

    fetchAPI(PHPBackgroundAPI, (response) => {
        let imgLink = response.uri;

        document.querySelector("body").style["background-image"] = `url("${imgLink}")`;
    })
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

let monsterAttributes = {
    m1attributes : {
        HP: 0,
        stats: {
            STR: 0,
            AGI: 0,
            INT: 0
        },
        name: "",
        class: ""
    },
    m2attributes : {
        HP: 0,
        stats: {
            STR: 0,
            AGI: 0,
            INT: 0
        },
        name: "",
        class: ""
    }
};

function assignStatsAndName(monster) {
    const statsObj = {
        HP: 100,
        stats: {
            STR: 10,
            AGI: 10,
            INT: 10
        },
        name: "",
        class: ""
    };

    let monsterWarrior = `#` + monster + `warrior`;
    let monsterCaster = `#` + monster + `caster`;
    let monsterArcher = `#` + monster + `archer`;
    let monsterName = `#` + monster + `name`;
    let monsterAction = `#` + monster + `fight`;

    if (document.querySelector(monsterWarrior).checked) {
        statsObj.HP += getRandomInt(30, 40);

        statsObj.stats.STR += getRandomInt(8, 12);
        statsObj.stats.AGI += getRandomInt(4, 6);
        statsObj.stats.INT += getRandomInt(2, 4);

        statsObj.class = "warrior";

        let attack = document.createElement("option");
        attack.setAttribute("value", "bludgeon");
        attack.textContent = "Bludgeon";
        document.querySelector(monsterAction).prepend(attack);
    } else if (document.querySelector(monsterCaster).checked) {
        statsObj.HP += getRandomInt(20, 30);

        statsObj.stats.STR += getRandomInt(3, 6);
        statsObj.stats.AGI += getRandomInt(3, 5);
        statsObj.stats.INT += getRandomInt(7, 14);

        statsObj.class = "caster";

        let attack = document.createElement("option");
        attack.setAttribute("value", "Fireball");
        attack.textContent = "Fireball";
        document.querySelector(monsterAction).prepend(attack);
    } else if (document.querySelector(monsterArcher).checked) {
        statsObj.HP += getRandomInt(25, 35);

        statsObj.stats.STR += getRandomInt(5, 8);
        statsObj.stats.AGI += getRandomInt(8, 15);
        statsObj.stats.INT += getRandomInt(3, 5);

        statsObj.class = "caster";

        let attack = document.createElement("option");
        attack.setAttribute("value", "Shoot");
        attack.textContent = "Shoot";
        document.querySelector(monsterAction).prepend(attack);
    }

    statsObj.name = document.querySelector(monsterName).value;

    for (let attribute in statsObj) {
        if (attribute === "stats") {
            monsterAttributes[`${monster}attributes`]["stats"].STR = statsObj[attribute].STR
            monsterAttributes[`${monster}attributes`]["stats"].AGI = statsObj[attribute].AGI
            monsterAttributes[`${monster}attributes`]["stats"].INT = statsObj[attribute].INT
        } else {
            monsterAttributes[`${monster}attributes`][`${attribute}`] = statsObj[`${attribute}`];
        }
    }
}

let attackValueObj = {
    m1attack: 0,
    m2attack: 0
};

function fightMechanic() {
    if (monsterAttributes.m1attributes.class === "warrior") {
        attackValueObj.m1attack += getRandomInt(8, 12) + (Math.floor(monsterAttributes.m1attributes.stats.STR * getRandomInt(.25, .40)));
    } 

    if (monsterAttributes.m1attributes.class === "caster") {
        attackValueObj.m1attack += getRandomInt(6, 14) + (Math.floor(monsterAttributes.m1attributes.stats.INT * getRandomInt(.25, .50)));
    }

    if (monsterAttributes.m1attributes.class === "archer") {
        attackValueObj.m1attack += getRandomInt(9, 11) + (Math.floor(monsterAttributes.m1attributes.stats.AGI * getRandomInt(.30, .40)));
    }

    if (monsterAttributes.m2attributes.class === "warrior") {
        attackValueObj.m2attack += getRandomInt(8, 12) + (Math.floor(monsterAttributes.m2attributes.stats.STR * getRandomInt(.25, .40)));
    } 

    if (monsterAttributes.m2attributes.class === "caster") {
        attackValueObj.m2attack += getRandomInt(6, 14) + (Math.floor(monsterAttributes.m2attributes.stats.INT * getRandomInt(.25, .50)));
    }

    if (monsterAttributes.m2attributes.class === "archer") {
        attackValueObj.m2attack += getRandomInt(9, 11) + (Math.floor(monsterAttributes.m2attributes.stats.AGI * getRandomInt(.30, .40)));
    }
}

monsterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    infoSplash.textContent = "";

    document.querySelector("#m1stats").style.visibility = "visible"
    document.querySelector("#m2stats").style.visibility = "visible"

    if (!(monster1name.value) || !(monster2name.value)) {
        infoSplash.style.display = "grid";
        infoSplash.innerHTML = `<img src="./assets/Super_Angry_Face_Emoji_ios10_1024x1024.png">Monsters must have a name!`;
    } else {
        infoSplash.textContent = "";
        infoSplash.style.display = "none";

        document.querySelector("#combatlog").style.display = "grid";

        assignStatsAndName("m1");
        assignStatsAndName("m2");

        document.querySelector("#m1 img").setAttribute("src", `${pixelMonsterImg}${pixelMonsterSizes.m1}`);
        document.querySelector("#m2 img").setAttribute("src", `${pixelMonsterImg2}${pixelMonsterSizes.m2}`);

        document.querySelector("#m1str").textContent = `STR: ${monsterAttributes.m1attributes.stats.STR}`;
        document.querySelector("#m1agi").textContent = `AGI: ${monsterAttributes.m1attributes.stats.AGI}`;
        document.querySelector("#m1int").textContent = `INT: ${monsterAttributes.m1attributes.stats.INT}`;

        document.querySelector("#m1hp").innerHTML = `HP: ${monsterAttributes.m1attributes.HP}`;

        document.querySelector("#m1boxname").textContent = `${monsterAttributes.m1attributes.name}`;

        document.querySelector("#m2str").textContent = `STR: ${monsterAttributes.m2attributes.stats.STR}`;
        document.querySelector("#m2agi").textContent = `AGI: ${monsterAttributes.m2attributes.stats.AGI}`;
        document.querySelector("#m2int").textContent = `INT: ${monsterAttributes.m2attributes.stats.INT}`;

        document.querySelector("#m2hp").innerHTML = `HP: ${monsterAttributes.m2attributes.HP}`;

        document.querySelector("#m2boxname").textContent = `${monsterAttributes.m2attributes.name}`;

        document.querySelector("#monsterform").style.display = "none";
        document.querySelector("#fightform").style.display = "grid";
        document.querySelector(".fight").style.display = "grid";

        pixelMonsterSizes.m1--
        pixelMonsterSizes.m2--
    }

    monsterForm.reset();
})

document.querySelector("#fightbutton button").addEventListener("click", (event) => {
    event.preventDefault();

    attackValueObj.m1attack = 0;
    attackValueObj.m2attack = 0;

    fightMechanic();

    if (m1action.value === "evade") {
        let dodgeChance = getRandomInt(60, 70) + monsterAttributes.m1attributes.stats.AGI

        if (dodgeChance > 80) {
            attackValueObj.m2attack = 0;
        }

        attackValueObj.m1attack = 0;
    } 
    
    if (m1action.value === "defend") {
        attackValueObj.m2attack -= getRandomInt(5, 10) + (Math.floor(monsterAttributes.m1attributes.stats.STR * .1));

        attackValueObj.m1attack = 0;
    }

    if (m2action.value === "evade") {
        let dodgeChance = getRandomInt(60, 70) + monsterAttributes.m2attributes.stats.AGI

        if (dodgeChance > 80) {
            attackValueObj.m1attack = 0;
        }

        attackValueObj.m2attack = 0;
    } 
    
    if (m2action.value === "defend") {
        attackValueObj.m1attack -= getRandomInt(5, 10) + (Math.floor(monsterAttributes.m2attributes.stats.STR * .1));

        attackValueObj.m2attack = 0;
    }

    if (attackValueObj.m1attack < 0) {
        attackValueObj.m1attack = 0;
    }

    if (attackValueObj.m2attack < 0) {
        attackValueObj.m2attack = 0;
    }

    monsterAttributes.m1attributes.HP -= attackValueObj.m2attack
    monsterAttributes.m2attributes.HP -= attackValueObj.m1attack

    let combatLogStr = ``;

    if (m1action.value === "evade" && attackValueObj.m2attack === 0) {
        let m1ActionStr = `${monsterAttributes.m1attributes.name} evaded ${monsterAttributes.m2attributes.name}'s attack!`;
        combatLogStr += m1ActionStr;

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px green, 0px 5px 20px green";
    } else if (m1action.value === "evade" && attackValueObj.m2attack !== 0) {
        let m1ActionStr = `${monsterAttributes.m1attributes.name} tried to evade ${monsterAttributes.m2attributes.name}'s attack, but failed and received ${attackValueObj.m2attack} points of damage.`;
        combatLogStr += m1ActionStr;

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px red, 0px 5px 20px red";
    } else if (m1action.value === "defend") {
        let m1ActionStr = `${monsterAttributes.m1attributes.name} defended against ${monsterAttributes.m2attributes.name}'s attack and only received ${attackValueObj.m2attack} points of damage.`;
        combatLogStr += m1ActionStr;

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px yellow, 0px 5px 20px yellow";
    } else {
        let m1ActionStr = `${monsterAttributes.m1attributes.name} attacked ${monsterAttributes.m2attributes.name} for ${attackValueObj.m1attack} points of damage.`;
        combatLogStr += m1ActionStr;

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px aliceblue, 0px 5px 20px aliceblue";
    }

    if (m2action.value === "evade" && attackValueObj.m1attack === 0) {
        let m2ActionStr = ` ${monsterAttributes.m2attributes.name} evaded ${monsterAttributes.m1attributes.name}'s attack!`;
        combatLogStr += m2ActionStr;

        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px green, 0px 5px 20px green";
    } else if (m2action.value === "evade" && attackValueObj.m1attack !== 0) {
        let m2ActionStr = ` ${monsterAttributes.m2attributes.name} tried to evade ${monsterAttributes.m1attributes.name}'s attack, but failed and received ${attackValueObj.m1attack} points of damage.`;
        combatLogStr += m2ActionStr;

        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px red, 0px 5px 20px red";
    } else if (m2action.value === "defend") {
        let m2ActionStr = ` ${monsterAttributes.m2attributes.name} defended against ${monsterAttributes.m1attributes.name}'s attack and only received ${attackValueObj.m1attack} points of damage.`;
        combatLogStr += m2ActionStr;

        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px yellow, 0px 5px 20px yellow";
    } else {
        let m2ActionStr = ` ${monsterAttributes.m2attributes.name} attacked ${monsterAttributes.m1attributes.name} for ${attackValueObj.m2attack} points of damage.`;
        combatLogStr += m2ActionStr;

        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px aliceblue, 0px 5px 20px aliceblue";
    }

    document.querySelector("#m1hp").innerHTML = `HP: ${monsterAttributes.m1attributes.HP}`;
    document.querySelector("#m2hp").innerHTML = `HP: ${monsterAttributes.m2attributes.HP}`;

    let combatLogLi = document.createElement("li");
    combatLogLi.textContent = `${combatLogStr}`;
    document.querySelector("#loglist").append(combatLogLi);

    if (monsterAttributes.m1attributes.HP <= 0 && monsterAttributes.m2attributes.HP <= 0) {
        document.querySelector("#m1hp").textContent = "HP: 0";
        document.querySelector("#m2hp").textContent = "HP: 0";

        document.querySelector("#m1 img").setAttribute("src", `./assets/skull-crossbone-png.png`);
        document.querySelector("#m2 img").setAttribute("src", `./assets/skull-crossbone-png.png`);

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px black, 0px 5px 20px black";
        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px black, 0px 5px 20px black";

        let drawStr = `It's a draw!`;
        let drawLi = document.createElement("li");
        drawLi.textContent = `${drawStr}`;

        document.querySelector("#loglist").append(drawLi);

        document.querySelector(".fight").style.display = "none";
        document.querySelector("#resetbutton").style.display = "inline";
    } else if (monsterAttributes.m1attributes.HP <= 0) {
        document.querySelector("#m1hp").textContent = "HP: 0";

        document.querySelector("#m1 img").setAttribute("src", `./assets/skull-crossbone-png.png`);

        document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px black, 0px 5px 20px black";

        let winStr = `${monsterAttributes.m2attributes.name} has won the battle!`;
        let winLi = document.createElement("li");
        winLi.textContent = `${winStr}`;

        document.querySelector("#loglist").append(winLi);

        document.querySelector(".fight").style.display = "none";
        document.querySelector("#resetbutton").style.display = "inline";
    } else if (monsterAttributes.m2attributes.HP <= 0) {
        document.querySelector("#m2hp").textContent = "HP: 0";

        document.querySelector("#m2 img").setAttribute("src", `./assets/skull-crossbone-png.png`);

        document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px black, 0px 5px 20px black";

        let winStr = `${monsterAttributes.m1attributes.name} has won the battle!`;
        let winLi = document.createElement("li");
        winLi.textContent = `${winStr}`;

        document.querySelector("#loglist").append(winLi);

        document.querySelector(".fight").style.display = "none";
        document.querySelector("#resetbutton").style.display = "inline";
    }
})

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

document.querySelector("#resetbutton button").addEventListener("click", (event) => {
    pixelMonsterSizes.m1++
    pixelMonsterSizes.m2++

    document.querySelector("#m1stats").style.visibility = "hidden"
    document.querySelector("#m2stats").style.visibility = "hidden"

    document.querySelector("#resetbutton").style.display = "none";

    removeAllChildNodes(document.querySelector("#loglist"));

    document.querySelector("#combatlog").style.display = "none";

    document.querySelector("#monsterform").style.display = "grid";

    document.querySelector("#m1 img").setAttribute("src", `./assets/Black_question_mark.png`);
    document.querySelector("#m2 img").setAttribute("src", `./assets/Black_question_mark.png`);

    document.querySelector("#m1str").textContent = `STR: ???`;
    document.querySelector("#m1agi").textContent = `AGI: ???`;
    document.querySelector("#m1int").textContent = `INT: ???`;

    document.querySelector("#m1hp").innerHTML = `HP: <span id="m1hpnumber">???</span>`;

    document.querySelector("#m1boxname").textContent = `???`;

    document.querySelector("#m2str").textContent = `STR: ???`;
    document.querySelector("#m2agi").textContent = `AGI: ???`;
    document.querySelector("#m2int").textContent = `INT: ???`;

    document.querySelector("#m2hp").innerHTML = `HP: <span id="m2hpnumber">???</span>`;

    document.querySelector("#m2boxname").textContent = `???`;

    document.querySelector("#m1").style["box-shadow"] = " 0px 0px 15px aliceblue, 0px 5px 20px aliceblue"
    document.querySelector("#m2").style["box-shadow"] = " 0px 0px 15px aliceblue, 0px 5px 20px aliceblue"
})

infoSplash.addEventListener("click", (event) => {
    infoSplash.textContent = "";
})

bgGenerator()