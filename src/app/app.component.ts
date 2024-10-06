import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  seats: boolean[] = Array(80).fill(false); // false indicates available
  bookedSeats: number[] = [];
  rows = 11; // 10 rows of 7 seats and 1 row of 3 seats
  seatsPerRow = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 3]; // seat distribution per row

  // Pre-booked seats (example)
  preBookedSeats: number[] = [1, 2, 3, 15, 16, 23, 24, 25, 40, 41, 42, 72];

  constructor() {
    this.preBookedSeats.forEach((seat) => (this.seats[seat - 1] = true)); // Mark pre-booked seats
  }

  // Method to book seats
  bookSeats(requestedSeats: number): string {
    if (requestedSeats < 1 || requestedSeats > 7) {
      return 'You can only book between 1 and 7 seats.';
    }

    // Try to find a row with enough available seats
    for (let row = 0; row < this.rows; row++) {
      let availableSeatsInRow: number[] = [];
      for (let seatIndex = 0; seatIndex < this.seatsPerRow[row]; seatIndex++) {
        let seatNumber = row * 7 + seatIndex; // Calculate seat number
        if (!this.seats[seatNumber]) {
          availableSeatsInRow.push(seatNumber + 1);
        }
      }

      if (availableSeatsInRow.length >= requestedSeats) {
        // Book seats from availableSeatsInRow
        for (let i = 0; i < requestedSeats; i++) {
          this.seats[availableSeatsInRow[i] - 1] = true; // Mark seat as booked
          this.bookedSeats.push(availableSeatsInRow[i]); // Store booked seat
        }
        return `Seats booked: ${this.bookedSeats.join(', ')}`;
      }
    }

    // If not enough seats in one row, try to book nearby seats
    let bookedNearby: number[] = [];
    for (let seat = 0; seat < this.seats.length; seat++) {
      if (!this.seats[seat] && bookedNearby.length < requestedSeats) {
        this.seats[seat] = true; // Mark seat as booked
        bookedNearby.push(seat + 1); // Store booked seat
      }
    }

    if (bookedNearby.length > 0) {
      return `Nearby seats booked: ${bookedNearby.join(', ')}`;
    }

    return 'Not enough seats available.';
  }
}
