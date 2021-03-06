import Joi = require("joi");
import { VError } from "verror";

import * as Result from "../../../result";
import { Identity } from "../organization/identity";
import * as UserRecord from "../organization/user_record";
import * as Notification from "./notification";

type eventTypeType = "notification_marked_read";
const eventType: eventTypeType = "notification_marked_read";

export interface Event {
  type: eventTypeType;
  source: string;
  time: string; // ISO timestamp
  publisher: Identity;
  notificationId: Notification.Id;
  // Not strictly required, also storing the recipient allows to filter the
  // notification-stream's events by user ID:
  recipient: UserRecord.Id;
}

export const schema = Joi.object({
  type: Joi.valid(eventType).required(),
  source: Joi.string()
    .allow("")
    .required(),
  time: Joi.date()
    .iso()
    .required(),
  publisher: Joi.string().required(),
  notificationId: Notification.idSchema.required(),
  recipient: UserRecord.idSchema,
});

export function createEvent(
  source: string,
  publisher: Identity,
  notificationId: Notification.Id,
  recipient: UserRecord.Id,
  time: string = new Date().toISOString(),
): Event {
  const event = {
    type: eventType,
    source,
    time,
    publisher,
    notificationId,
    recipient,
  };

  const validationResult = validate(event);
  if (Result.isErr(validationResult)) {
    throw new VError(validationResult, `not a valid ${eventType} event`);
  }
  return event;
}

export function validate(input: any): Result.Type<Event> {
  const { error, value } = Joi.validate(input, schema);
  return !error ? value : error;
}
