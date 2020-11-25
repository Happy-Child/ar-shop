import { toast } from 'react-toastify';
import { messagesCodesValues } from '../lib/messages/messagesCodesValues';
import { SUCCESS, UNKNOWN_MESSAGE } from '../lib/messages/messagesCodes';
import { UNKNOWN_ERROR } from '../lib/errors/errorsCodes';
import { errorsCodesValues } from '../lib/errors/errorsCodesValues';

type TNotifyTypes = 'success' | 'info' | 'error' | 'warning' | 'dark' | 'warn';

export const toastNotification = (type: TNotifyTypes, message: string): void => {
  let resultMessage = message;

  if (!resultMessage) {
    if (type === 'success') {
      resultMessage = messagesCodesValues[SUCCESS];
    } else if (type === 'error') {
      resultMessage = errorsCodesValues[UNKNOWN_ERROR];
    } else {
      resultMessage = messagesCodesValues[UNKNOWN_MESSAGE];
    }
  }

  toast[type](resultMessage);
};
