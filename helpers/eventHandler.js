const messages = require('../config/messages');

class EventHandler {
  completeCVCreation(io) {
    io.emit('completeCVCreation', { data: messages.cvCreationCompleted });
  }

  failCVCreation(io) {
    io.emit('failCVCreation', { data: messages.cvCreationFailed });
  }
}

module.exports = new EventHandler();
