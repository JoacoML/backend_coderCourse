import {
  normalizeMessages,
  denormalizeMessages,
} from "../../utils/normalize.js";
import { Loggers } from "../../loggers/loggers.js";
import { MessageDao } from "../../Dao/index.js";

const addMessage = async (message) => {
  console.log("mensaje", message);
  const daoCall = await MessageDao.getAll();
  const response = daoCall[0];
  if (response) {
    const relevantData = {
      entities: response.entities,
      result: response.result[0],
    };
    const { messages } = denormalizeMessages(relevantData);

    messages.push(message);

    const { normalizedData } = normalizeMessages(messages);

    const objectToStore = {
      messagesDataId: 1,
      ...normalizedData,
    };

    const updateResponse = await MessageDao.updateById(
      response.id,
      objectToStore
    );

    return true;
  } else {
    const { normalizedData } = normalizeMessages([message]);

    const objectToStore = {
      messagesDataId: 1,
      ...normalizedData,
    };
  
    const saveResponse = await MessageDao.save(objectToStore);

    Loggers.logDebug("--- message save Response ---");
    Loggers.logDebug(saveResponse);

    return true;
  }
};

const getMessages = async () => {
  const daoCall = await MessageDao.getAll();
  const response = daoCall[0];

  if (!response) {
    return;
  }

  const relevantData = {
    entities: response.entities,
    result: response.result[0],
  };
  const { messages } = denormalizeMessages(relevantData);
  const a = JSON.stringify(response).length;
  const b = JSON.stringify(messages).length;

  return { normalizedData: response, compression: a / b };
};

export const MessageController = {
  addMessage,
  getMessages,
};