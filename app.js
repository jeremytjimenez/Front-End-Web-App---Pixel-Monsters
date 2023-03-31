let pixelMonsterImg = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=200"
let pixelMonsterImg2 = "https://app.pixelencounter.com/api/basic/monsters/random/png?size=190"
let PHPBackgroundAPI = "https://php-noise.com/noise.php?r=${r}&g=${g}&b=${b}&tiles=${tiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&mode=${mode}&json"

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

function assignStats() {

}

function fightMechanic() {
    
}