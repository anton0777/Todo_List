import { ValueOf } from 'type-fest';

export const WSMessageType = {
  FILE_PROCESSING_STARTED: 'file_processing_started',
  FILE_PROCESSING_COMPLETE: 'file_processing_complete',
} as const;

export type WSMessage<T = unknown> = {
  type: ValueOf<typeof WSMessageType> | (string & {});
  payload?: T;
};

export interface IWSService {
  broadcast<T>(msg: WSMessage<T>): void;

  sendToUser<T>(userId: number | string, msg: WSMessage<T>): void;
}
