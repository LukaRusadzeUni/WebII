export class Upgrade {
    constructor(name, price, priceMultiplier, scoreMultiplier, amount, idle) {
        this.name = name;
        this.price = price;
        this.priceMultiplier = priceMultiplier;
        this.scoreMultiplier = scoreMultiplier;
        this.amount = amount;
        this.idle = idle;
    }

    loadSave(object) {
        this.name = object.name;
        this.price = object.price;
        this.priceMultiplier = object.priceMultiplier;
        this.scoreMultiplier = object.scoreMultiplier;
        this.amount = object.amount;
        this.idle = object.idle;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getPriceMultiplier() {
        return this.priceMultiplier;
    }

    getScoreMultiplier() {
        return this.scoreMultiplier;
    }

    getAmount() {
        return this.amount;
    }

    isIdle() {
        return this.idle;
    }
}