import { produce as withCopy } from "immer";
import Joi = require("joi");
import isEqual = require("lodash.isequal");
import { VError } from "verror";

import { Ctx } from "../../../lib/ctx";
import * as Result from "../../../result";
import { BusinessEvent } from "../business_event";
import { InvalidCommand } from "../errors/invalid_command";
import { NotAuthorized } from "../errors/not_authorized";
import { NotFound } from "../errors/not_found";
import { Identity } from "../organization/identity";
import { ServiceUser } from "../organization/service_user";
import * as UserRecord from "../organization/user_record";
import * as NotificationCreated from "./notification_created";
import * as Project from "./project";
import * as Subproject from "./subproject";
import * as Workflowitem from "./workflowitem";
import * as WorkflowitemUpdated from "./workflowitem_updated";

export type RequestData = WorkflowitemUpdated.Modification;
export const requestDataSchema = WorkflowitemUpdated.modificationSchema;

export function validate(input: any): Result.Type<RequestData> {
  const { value, error } = Joi.validate(input, requestDataSchema);
  return !error ? value : error;
}

interface Repository {
  getWorkflowitem(
    projectId: Project.Id,
    subprojectId: Subproject.Id,
    workflowitemId: Workflowitem.Id,
  ): Promise<Result.Type<Workflowitem.Workflowitem>>;
  getUsersForIdentity(identity: Identity): Promise<UserRecord.Id[]>;
}

export async function updateWorkflowitem(
  ctx: Ctx,
  issuer: ServiceUser,
  projectId: Project.Id,
  subprojectId: Subproject.Id,
  workflowitemId: Workflowitem.Id,
  data: RequestData,
  repository: Repository,
): Promise<Result.Type<{ newEvents: BusinessEvent[]; workflowitem: Workflowitem.Workflowitem }>> {
  let workflowitem = await repository.getWorkflowitem(projectId, subprojectId, workflowitemId);

  if (Result.isErr(workflowitem)) {
    return new NotFound(ctx, "workflowitem", workflowitemId);
  }

  const newEvent = WorkflowitemUpdated.createEvent(
    ctx.source,
    issuer.id,
    projectId,
    subprojectId,
    workflowitemId,
    data,
  );
  if (Result.isErr(newEvent)) {
    return new VError(newEvent, "failed to create event");
  }

  // Check authorization (if not root):
  if (
    issuer.id !== "root" &&
    !Workflowitem.permits(workflowitem, issuer, ["workflowitem.update"])
  ) {
    return new NotAuthorized(ctx, issuer.id, newEvent);
  }

  try {
    // Update a draft/copy of the workflowitem, leaving the original workflowitem
    // unchanged for comparison:
    workflowitem = withCopy(workflowitem, draft => {
      // Check that the new event is indeed valid:
      const result = WorkflowitemUpdated.apply(ctx, newEvent, draft);
      if (Result.isErr(result)) {
        throw new InvalidCommand(ctx, newEvent, [result]);
      }

      // Ignore the update if it doesn't change anything:
      if (isEqual(workflowitem, result)) {
        throw { newEvents: [], workflowitem };
      }

      return result;
    });
  } catch (result) {
    return result;
  }

  // Create notification events:
  let notifications: NotificationCreated.Event[] = [];
  if (workflowitem.assignee !== undefined && workflowitem.assignee !== issuer.id) {
    const recipients = await repository.getUsersForIdentity(workflowitem.assignee);
    notifications = recipients.map(recipient =>
      NotificationCreated.createEvent(ctx.source, issuer.id, recipient, newEvent, projectId),
    );
  }

  return { newEvents: [newEvent, ...notifications], workflowitem };
}
