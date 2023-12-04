class FlightBookingSystem {
    constructor(agencyName) {
        this.agencyName = agencyName;
        this.flights = [];
        this.bookings = [];
        this.bookingsCount = 0;
    }

    addFlight(flightNumber, destination, departureTime, price) {
        const flight = this.flights.find((f) => f.flightNumber === flightNumber);
        if (flight) {
            return `Flight ${flightNumber} to ${destination} is already available.`;
        }
        this.flights.push({flightNumber, destination, departureTime, price});
        return `Flight ${flightNumber} to ${destination} has been added to the system.`;
    }

    bookFlight(passengerName, flightNumber) {
        const flight = this.flights.find((f) => f.flightNumber === flightNumber);
        if (!flight) {
            return `Flight ${flightNumber} is not available for booking.`;
        }
        this.bookings.push({passengerName, flightNumber});

        this.bookingsCount += 1;
        return `Booking for passenger ${passengerName} on flight ${flightNumber} is confirmed.`;
    }

    cancelBooking(passengerName, flightNumber) {
        this.bookings.map((x) => console.log(x));
        // const pasenger = this.bookings.find((f) => f.hasOwnProperty(passengerName));
        // console.log(JSON.stringify(pasenger, null, 2));
        // console.log(pasenger["flightNumber"]);
        // if (!pasenger || pasenger["flightNumber"] !== flightNumber) {
        //     throw new Error(`Booking for passenger ${passengerName} on flight ${flightNumber} not found.`);
        // }
        // delete this.bookings.hasOwnProperty(passengerName);
        // this.bookingsCount -= 1;
        // return `Booking for passenger ${passengerName} on flight ${flightNumber} is cancelled.`;
    }
    showBookings(criteria) {
        return this.bookings;
    }
}

const system = new FlightBookingSystem("TravelWorld");
console.log(system.addFlight("AA101", "Los Angeles", "09:00 AM", 250));
console.log(system.addFlight("BB202", "New York", "10:30 AM", 180));
console.log(system.bookFlight("Alice", "AA101"));
console.log(system.bookFlight("Bob", "BB202"));
console.log(system.cancelBooking("Alice", "AA101"));
