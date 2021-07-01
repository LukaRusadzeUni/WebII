import { Upgrade } from "./Upgrade.mjs"

let upgrades = {
    clicks: new Upgrade("Clicks", 1, 1.1, 2, 1, false),
    workers: new Upgrade("Workers", 2000, 1.2, 250, 0, true),
    machines: new Upgrade("Machines", 30000, 1.2, 500, 0, true),
    factories: new Upgrade("Factories", 300000, 1.2, 750, 0, true)
}

window.onload = () => {

    Initialize()

    $(".game img").on('click', (event) => {
        increaseScore(upgrades.clicks.getAmount() * upgrades.clicks.getScoreMultiplier())
    })

    $(".purchaseBtn").on('click', (event) => {
        let purchaseID = event.target.id;
        let itemCounter = event.target.children[1];
        let itemCount = parseInt(itemCounter.innerHTML)
        let price = Math.ceil(upgrades[purchaseID].getPrice() * upgrades[purchaseID].getPriceMultiplier());

        upgrades[purchaseID].price = price
        upgrades[purchaseID].amount++;
        itemCounter.innerHTML = itemCount + 1;

        decreaseScore(price);
        calculateIdle()
        updatePriceDisplay();
        localStorage.setItem('upgrades', JSON.stringify(upgrades))
    })

    setInterval(() => {
        for (const [key, value] of Object.entries(upgrades)) {
            if (value.isIdle() && value.getAmount() > 0) {
                increaseScore(value.getAmount() * value.getScoreMultiplier())
            }
        }
    }, 1000);

    fortuneCookie();

}

function Initialize() {
    updatePriceDisplay();

    if (localStorage.getItem('score')) {
        $(".score").html(localStorage.getItem('score'));
    }
    if (localStorage.getItem('upgrades')) {
        let savedUpgrades = JSON.parse(localStorage.getItem('upgrades'))

        for (const [key, value] of Object.entries(upgrades)) {
            upgrades[key].loadSave(savedUpgrades[key]);
        }

        for (let item of $(".purchaseBtn")) {
            item.children[1].innerHTML = savedUpgrades[item.id].amount;
        }

        calculateIdle();
        checkPrices()
    }

}

function increaseScore(amount) {
    let output = numberWithCommas(parseInt(numberWithoutCommas($(".score").text())) + amount);
    $(".score").html(output);
    localStorage.setItem('score', output)
    checkPrices()
}

function decreaseScore(amount) {
    let output = numberWithCommas(parseInt(numberWithoutCommas($(".score").text())) - amount);
    $(".score").html(output);
    localStorage.setItem('score', output)
    checkPrices()
}

function checkPrices() {
    let currentScore = parseInt(numberWithoutCommas($(".score").text()));
    let buttons = [...$("button")];

    for (const [key, value] of Object.entries(upgrades)) {
        let button = buttons.filter(button => button.id === value.getName().toLowerCase())

        if (currentScore >= Math.ceil(value.getPrice() * value.getPriceMultiplier())) {
            button[0].disabled = false
        } else {
            button[0].disabled = true
        }
    }
}

function updatePriceDisplay() {
    for (let item of [...$(".price")]) {
        item.innerHTML = "Price: " + numberWithCommas(Math.ceil(upgrades[item.parentNode.parentNode.id].getPrice() * upgrades[item.parentNode.parentNode.id].getPriceMultiplier())) + " cookies";
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function numberWithoutCommas(x) {
    return x.toString().replaceAll(",", "");
}

function calculateIdle() {
    let updatedIdle = 0;
    for (const [key, value] of Object.entries(upgrades)) {
        if (value.isIdle() && value.getAmount() > 0) {
            updatedIdle += value.getAmount() * value.getScoreMultiplier()
        }
    }
    $(".idleDisplay").html(`
    Earning Every Second <br> ${numberWithCommas(updatedIdle)}
    `)
}

function fortuneCookie() {

    function getFortune() {
        $.ajax({
            url: "../fortunes.json",
            method: "GET",
        }).then(data => {
            $(".quotes").text((data[Math.floor(Math.random() * 545)]));
        })
    }

    getFortune();
    setInterval(getFortune, 10000);
}