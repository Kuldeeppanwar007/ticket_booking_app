require("dotenv").config();
let db = require("../db/connToDb");
const sequelize = require("sequelize");
const logger = require("../logger");

const checkAvailableSeats = async (totalSeats, date, slotId, screenId) => {
  logger.info("req come at checkAvailableTicket() controller started");
  const checkBookedSeats = await db.models.tickets.findAll({
    attributes: ["seatNo"],
    where: {
      slotId,
      screenId,
      date,
      isCancled:false
    },
  });
  let bookedSheet = JSON.parse(JSON.stringify(checkBookedSeats));
  let totalSeat = parseInt(totalSeats.dataValues.availableSheets);
  let arr = Array(totalSeat)
    .fill()
    .map((_, i) => i + 1);
  let availableSheets = arr.filter(
    s => !bookedSheet.some(bs => parseInt(bs.seatNo) === parseInt(s))
  );
  logger.info("req come at checkAvailableTicket() controller ended");
  return availableSheets;
};

exports.bookTicket = async (req, res) => {
  try {
  logger.info("req come at bookTicket() controller started");
  const { date, slotId, screenId, seatNo } =req.body;
  if (!date || !slotId || !screenId || !seatNo) {
    res.status(400).json({ error: `invalid parameters` });
    logger.info("req come at bookTicket() controller - Invalid parameters");
    return;
  }
 
  const totalSeats = await db.models.screens.findOne({
    attributes: ["availableSheets"],
    where: { screenId },
  });
  const checkBookedSeats = await db.models.tickets.findAll({
    attributes: [[sequelize.fn("COUNT", sequelize.col("Id")), "bookedSeats"]],
    where: {
      slotId,
      screenId,
      date,
      isCancled:false

    },
  });

  let totalSeat = parseInt(totalSeats.dataValues.availableSheets);
  let bookedSeat = parseInt(checkBookedSeats[0].dataValues.bookedSeats);
 
  if (totalSeat > bookedSeat) {
    const checkSeatAvaibility = await db.models.tickets.findOne({
      where: {
        screenId,
        slotId,
        date,
        seatNo,
        isCancled:false
      },
    });
    if (!checkSeatAvaibility) {
      if (totalSeat >= seatNo) {
        let data = req.body;
        data.ticketNo = `${new Date().valueOf()}`; 
        const resp = await db.models.tickets.create(data);
        res.send(resp);
      } else {
        const availableSeats = await checkAvailableSeats(
          totalSeats,
          date,
          slotId,
          screenId
        );
        res.status(400).json({
          message: `invalid seat no ${seatNo}, please choose another seat`,
          availableSeats,
        });
      }
    } else {
      const availableSeats = await checkAvailableSeats(
        totalSeats,
        date,
        slotId,
        screenId
      );
      res.status(400).json({
        message: `seat no ${seatNo} is already booked. please choose another seat`,
        availableSeats,
      });
      logger.info("req come at bookTicket() controller Ended");
      return;
    }
  } else {
    logger.info("req come at bookTicket() controller Ended");
    res.status(400).send(`all seats are booked. please choose show`);
  }
} catch (error) {
  logger.error("req come at bookTicket() - Error Occured");
  res.status(400).send("something went wrong!");
  return;
}
};

exports.checkAvailableSeats = async (req, res) => {
  try {
    logger.info("req come at checkAvailableSeats() controller started");
    const { date, slotId, screenId } = req.query;
    if (!date || !slotId || !screenId) {
      res.status(400).json({ error: `invalid parameters` });
      logger.error("req come at checkAvailableSeats() controller - Invalid Parameters");
      return;
    }
    const totalSeats = await db.models.screens.findOne({
      attributes: ["availableSheets"],
      where: { screenId },
    });
    const availableSeats = await checkAvailableSeats(
      totalSeats,
      date,
      slotId,
      screenId,
      
    );
    logger.info("req come at checkAvailableSeats() controller ended");
    res.json({
      message: "please check this seats are available",
      seats: availableSeats,
    });
    return;
  } catch (error) {
    logger.error("req come at checkAvailableSeats() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};

exports.checkBookedSeats = async (req, res) => {
  try {
    logger.info("req come at checkBookedTicket() controller started");
    const { date, slotId, screenId } = req.query;
    if (!date || !slotId || !screenId ) {
      logger.info("req come at checkBookedTicket() controller - Invalid Parameters");
      res.status(400).json({ error: `invalid parameters` });
      return;
    }
    const bookedSeats = await db.models.tickets.findAll({
      where: {
        slotId,
        screenId,
        date,
        isCancled:false
      },
    });
    logger.info("req come at checkBookedTicket() controller Ended");
    res.json({
      message: "successfully fetch booked seats",
       bookedSeats,
    });
    return;
  } catch (error) {
    logger.error("req come at checBookedTicket() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};

exports.checkCanceledSeats = async (req, res) => {
  try {
    logger.info("req come at checkCanceledTicket() controller started");
    const { date, slotId, screenId } = req.query;
    if (!date || !slotId || !screenId ) {
      logger.error("req come at checkCanceledTicket() controller - Invalid Parameters");
      res.status(400).json({ error: `invalid parameters` });
      return;
    }
    const cancledSeats = await db.models.tickets.findAll({
      where: {
        slotId,
        screenId,
        date,
        isCancled:true
      },
    });
    res.json({
      message: "successfully fetch canceled seats",
      cancledSeats,
    });
    logger.info("req come at checkCanceledTicket() controller Ended");
    return;
  } catch (error) {
    logger.error("req come at checkCanceledTicket() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    logger.info("req come at cancelTicket() controller started");
  
   const ticketNo = req.params.ticketNo
 
    if (!ticketNo) {
      logger.error("req come at cancelTicket() - Invalid Ticket");
      res.status(400).json({ error: `invalid ticketNo` });
      return;
    }
    const canceledSeats = await db.models.tickets.update({ isCancled: true },{
      
      where: {
    ticketNo
      },
    });
    res.json({
      message: "successfully canceled ticket",
      canceledSeats,
    });
    logger.info("req come at cancelTicket() controller ended");
    return;
  } catch (error) {
    logger.error("req come at cancelTicket() - Error Occured");
    res.status(400).send("something went wrong!");
    return;
  }
};