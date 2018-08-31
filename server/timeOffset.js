// The server and database are set to UTC time.
    // Therefore we need to offset the time to PST Time
    // Depending on daylight savings, this number can be 7 or 8
module.exports = { UTCToPSTHourOffset: 8 }