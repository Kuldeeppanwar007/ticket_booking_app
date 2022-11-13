const ticketController = require("../controllers/ticket.controller");
module.exports = app => {

  app.get("/ticket/available", ticketController.checkAvailableSeats);
  app.post("/ticket/book", ticketController.bookTicket);
  app.get("/ticket/booked", ticketController.checkBookedSeats);
  app.delete("/ticket/cancel/:ticketNo", ticketController.cancelTicket);
  app.get("/ticket/canceled", ticketController.checkCanceledSeats);

};

  