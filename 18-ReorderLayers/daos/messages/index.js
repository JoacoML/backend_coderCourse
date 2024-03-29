console.log('Exporting Messages Dao');

const messagesContainer = process.env.MESSAGES_CONTAINER
let moduleToExport;

switch(messagesContainer) {
    case 'archive':
        moduleToExport = require('./messagesArchiveDao')
        break;
    case 'mongoOnline':
        moduleToExport = require('./messagesMongoDao')
        break;
    case 'mongoLocal':
        moduleToExport = require('./messagesMongoDao')
        break;
    default:
        moduleToExport = require('./messagesArchiveDao')
        break;
}

module.exports = moduleToExport