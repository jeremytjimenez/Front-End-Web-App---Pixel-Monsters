let pixelMonsterImg = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=200"
let pixelMonsterImg2 = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=190"


let monsterForm = document.querySelector("#monsterform form")
let monster1name = document.querySelector("#m1name")
let monster1warrior = document.querySelector("#m1warrior")
let monster1caster = document.querySelector("#m1caster")
let monster1archer = document.querySelector("#m1archer")

let monster2name = document.querySelector("#m1name")
let monster2warrior = document.querySelector("#m1warrior")
let monster2caster = document.querySelector("#m1caster")
let monster2archer = document.querySelector("#m1archer")

let infoSplash = document.querySelector("#infosplash")


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
    let r = getRandomInt(0, 255)
    let g = getRandomInt(0, 255)
    let b = getRandomInt(0, 255)
    let tiles = getRandomInt(1, 50)
    let tileSize = getRandomInt(1, 20)
    let borderWidth = getRandomInt(0, 15)
    let mode = 1

    let PHPBackgroundAPI = `https://php-noise.com/noise.php?r=${r}&g=${g}&b=${b}&tiles=${tiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&mode=${mode}&json`

    fetchAPI(PHPBackgroundAPI, (response) => {
        let imgLink = response.uri

        document.querySelector("body").style["background-image"] = `url("${imgLink}")`
    })
}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

let m1attributes = {
    HP: 0,
    stats: {
        STR: 0,
        AGI: 0,
        INT: 0
    },
    name: "",
    state: {
        defending: false,
        evading: false
    }
}

let m2attributes = {
    HP: 0,
    stats: {
        STR: 0,
        AGI: 0,
        INT: 0
    },
    name: "",
    state: {
        defending: false,
        evading: false
    }
}

function assignStatsAndName(monster) {
    const statsObj = {
        HP: 100,
        stats: {
            STR: 10,
            AGI: 10,
            INT: 10
        },
        name: ""
    }

    let monsterWarrior = `#` + monster + `warrior`
    let monsterCaster = `#` + monster + `caster`
    let monsterArcher = `#` + monster + `archer`
    let monsterName = `#` + monster + `name`

    if (document.querySelector(monsterWarrior).checked) {
        statsObj.HP += getRandomInt(30, 40)

        statsObj.stats.STR += getRandomInt(8, 12)
        statsObj.stats.AGI += getRandomInt(4, 6)
        statsObj.stats.INT += getRandomInt(2, 4)
    } else if (document.querySelector((monsterCaster).checked)) {
        statsObj.HP += getRandomInt(20, 30)

        statsObj.stats.STR += getRandomInt(3, 6)
        statsObj.stats.AGI += getRandomInt(3, 5)
        statsObj.stats.INT += getRandomInt(7, 14)
    } else if (document.querySelector(monsterArcher).checked) {
        statsObj.HP += getRandomInt(25, 35)

        statsObj.stats.STR += getRandomInt(5, 8)
        statsObj.stats.AGI += getRandomInt(8, 15)
        statsObj.stats.INT += getRandomInt(3, 5)
    }

    console.log(document.querySelector(monsterName).value)

    statsObj.name = document.querySelector(monsterName).value

    let monsterAttributes = eval(monster + "attributes")

    for (let attribute in statsObj) {
        if (attribute === "stats") {
            monsterAttributes["stats"].STR = statsObj[attribute].STR
            monsterAttributes["stats"].AGI = statsObj[attribute].AGI
            monsterAttributes["stats"].INT = statsObj[attribute].INT
        } else {
            monsterAttributes[`${attribute}`] = statsObj[`${attribute}`]
        }
    }
}

function fightMechanic() {

}

monsterForm.addEventListener("submit", (event) => {
    event.preventDefault()

    infoSplash.textContent = ""

    if (!(monster1name.value) || !(monster2name.value)) {
        infoSplash.textContent = "Monsters must have a name!"
    } else {
        infoSplash.textContent = ""

        assignStatsAndName("m1")
        assignStatsAndName("m2")

        document.querySelector("#m1str").textContent = `STR: ${m1attributes.stats.STR}`
        document.querySelector("#m1agi").textContent = `AGI: ${m1attributes.stats.AGI}`
        document.querySelector("#m1int").textContent = `INT: ${m1attributes.stats.INT}`

        document.querySelector("#m1hp").textContent = `HP: ${m1attributes.HP}`

        document.querySelector("#m1boxname").textContent = `${m1attributes.name}`

        document.querySelector("#m2str").textContent = `STR: ${m2attributes.stats.STR}`
        document.querySelector("#m2agi").textContent = `AGI: ${m2attributes.stats.AGI}`
        document.querySelector("#m2int").textContent = `INT: ${m2attributes.stats.INT}`

        document.querySelector("#m2hp").textContent = `HP: ${m2attributes.HP}`

        document.querySelector("#m2boxname").textContent = `${m2attributes.name}`

        document.querySelector("#monsterform").style.display = "none"
        document.querySelector("#fightform").style.display = "grid"
    }

    monsterForm.reset()
})

bgGenerator()