import { toast } from 'react-toastify';
import { messagesCodesValues } from '../messages/messagesCodesValues';
import { SUCCESS, UNKNOWN_MESSAGE } from '../messages/messagesCodes';
import { UNKNOWN_ERROR } from '../errors/errorsCodes';
import { errorsCodesValues } from '../errors/errorsCodesValues';

type TNotifyTypes = 'success' | 'info' | 'error' | 'warning' | 'dark' | 'warn';

export const notify = (type: TNotifyTypes, message: string): void => {
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
