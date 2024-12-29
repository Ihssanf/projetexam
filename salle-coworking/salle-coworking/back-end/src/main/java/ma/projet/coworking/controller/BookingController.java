package ma.projet.coworking.controller;

import lombok.RequiredArgsConstructor;
import ma.projet.coworking.exception.InvalidBookingRequestException;
import ma.projet.coworking.exception.ResourceNotFoundException;
import ma.projet.coworking.model.BookedRoom;
import ma.projet.coworking.model.Room;
import ma.projet.coworking.response.BookingResponse;
import ma.projet.coworking.response.RoomResponse;
import ma.projet.coworking.service.IBookingService;
import ma.projet.coworking.service.IRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @PostMapping("/room/{roomId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok(
                    "Room booked successfully, Your booking confirmation code is :"+confirmationCode);

        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try{
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        }catch (ResourceNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
    @GetMapping("/user/{email}/bookings")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        System.out.println("Fetching bookings for email: " + email);
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);
        System.out.println("Bookings found: " + bookings); // Log the bookings (before conversion to response)
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        System.out.println("Booking responses sent: " + bookingResponses); // Log the booking responses after conversion
        return ResponseEntity.ok(bookingResponses);
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    // NEW PUT METHOD FOR UPDATING A BOOKING
    @PutMapping("/booking/{bookingId}/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateBooking(@PathVariable Long bookingId,
                                           @RequestBody BookedRoom bookingRequest) {
        try {
            // Call the service to update the booking
            BookedRoom updatedBooking = bookingService.updateBooking(bookingId, bookingRequest);
            BookingResponse bookingResponse = getBookingResponse(updatedBooking);

            return ResponseEntity.ok(bookingResponse);

        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found for ID: " + bookingId);
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body("Invalid booking request: " + e.getMessage());
        }
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getPricePerHour());
        return new BookingResponse(
                booking.getId(), booking.getDate(),
                booking.getHeureDebut(),
                booking.getHeureFin(), booking.getClientFullName()
        );
    }
}
