import Joi = require("joi");
import { VError } from "verror";

import * as Result from "../../../result";
import { Identity } from "../organization/identity";
import { Permissions, permissionsSchema } from "../permissions";
import * as Project from "./project";
import { ProjectedBudget, projectedBudgetListSchema } from "./projected_budget";
import * as Subproject from "./subproject";

type eventTypeType = "subproject_created";
const eventType: eventTypeType = "subproject_created";

interface InitialData {
  id: Subproject.Id;
  status: "open" | "closed";
  displayName: string;
  description: string;
  assignee?: Identity;
  currency: string;
  billingDate?: string;
  projectedBudgets: ProjectedBudget[];
  permissions: Permissions;
  // Additional information (key-value store), e.g. external IDs:
  additionalData: {};
  // TODO: remove!
  amount?: string;
  exchangeRate?: string;
}

const initialDataSchema = Joi.object({
  id: Subproject.idSchema.required(),
  status: Joi.string()
    .valid("open", "closed")
    .required(),
  displayName: Joi.string().required(),
  description: Joi.string()
    .allow("")
    .required(),
  assignee: Joi.string(),
  currency: Joi.string().required(),
  billingDate: Joi.date().iso(),
  projectedBudgets: projectedBudgetListSchema.required(),
  permissions: permissionsSchema.required(),
  additionalData: Joi.object().required(),
  // TODO: remove!
  amount: Joi.string(),
  exchangeRate: Joi.string(),
});

export interface Event {
  type: eventTypeType;
  source: string;
  time: string; // ISO timestamp
  publisher: Identity;
  projectId: Project.Id;
  subproject: InitialData;
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
  projectId: Project.idSchema.required(),
  subproject: initialDataSchema.required(),
});

export function createEvent(
  source: string,
  publisher: Identity,
  projectId: Project.Id,
  subproject: InitialData,
  time: string = new Date().toISOString(),
): Event {
  const event = {
    type: eventType,
    source,
    publisher,
    projectId,
    subproject,
    time,
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