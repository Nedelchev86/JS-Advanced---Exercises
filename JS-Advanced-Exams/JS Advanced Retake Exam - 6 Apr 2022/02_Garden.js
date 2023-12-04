class Garden {
    plants = [];
    storage = [];
    constructor(spaceAvailable) {
        this.spaceAvailable = spaceAvailable;
    }

    addPlant(plantName, spaceRequired) {
        if (spaceRequired > this.spaceAvailable) {
            throw new Error("Not enough space in the garden.");
        } else {
            this.plants.push({plantName, spaceRequired, ripe: false, quantity: 0});
            this.spaceAvailable -= spaceRequired;
            return `The ${plantName} has been successfully planted in the garden.`;
        }
    }

    ripenPlant(plantName, quantity) {
        const plant = this.plants.find((x) => x.plantName === plantName);
        if (!plant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (plant.ripe) {
            throw new Error(`The ${plantName} is already ripe.`);
        }
        if (quantity <= 0) {
            throw new Error(`The quantity cannot be zero or negative.`);
        }
        if (quantity === 1) {
            plant.ripe = true;
            plant.quantity += quantity;
            return `${quantity} ${plantName} has successfully ripened.`;
        } else {
            plant.ripe = true;
            plant.quantity += quantity;
            return `${quantity} ${plantName}s have successfully ripened.`;
        }
    }

    harvestPlant(plantName) {
        const plant = this.plants.find((x) => x.plantName === plantName);
        if (!plant) {
            throw new Error(`There is no ${plantName} in the garden.`);
        }
        if (!plant.ripe) {
            throw new Error(`The ${plantName} cannot be harvested before it is ripe.`);
        }
        this.storage.push({plantName: plant.plantName, quantity: plant.quantity});
        this.spaceAvailable += plant.spaceRequired;
        this.plants.splice(this.plants.indexOf(plant), 1);
        return `The ${plantName} has been successfully harvested.`;
    }

    generateReport() {
        const result = [];
        result.push(`The garden has ${this.spaceAvailable} free space left.`);

        const sortedPlant = this.plants
            .sort((a, b) => a.plantName.localeCompare(b.plantName))
            .map((a) => a.plantName)
            .join(", ");
        result.push(`Plants in the garden: ${sortedPlant}`);

        if (this.plants.length === 0) {
            result.push("Plants in storage: The storage is empty.");
        } else {
            const storePlants = this.storage
                .sort((a, b) => a.plantName.localeCompare(b.plantName))
                .map((a) => `${a.plantName} (${a.quantity})`)
                .join(", ");
            result.push(`Plants in storage: ${storePlants}`);
        }
        return result.join("\n");
    }
}

const myGarden = new Garden(250);
console.log(myGarden.addPlant("apple", 20));
console.log(myGarden.addPlant("orange", 200));
console.log(myGarden.addPlant("raspberry", 10));
console.log(myGarden.ripenPlant("apple", 10));
console.log(myGarden.ripenPlant("orange", 1));
console.log(myGarden.harvestPlant("orange"));
console.log(myGarden.generateReport());
