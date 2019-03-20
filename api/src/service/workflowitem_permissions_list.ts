import { Ctx } from "../lib/ctx";
import * as Result from "../result";
import * as Cache from "./cache2";
import { ConnToken } from "./conn";
import { ServiceUser } from "./domain/organization/service_user";
import { Permissions } from "./domain/permissions";
import * as Project from "./domain/workflow/project";
import * as Subproject from "./domain/workflow/subproject";
import * as Workflowitem from "./domain/workflow/workflowitem";
import * as WorkflowitemPermissionsList from "./domain/workflow/workflowitem_permissions_list";

export { RequestData } from "./domain/workflow/project_create";

export async function listWorkflowitemPermissions(
  conn: ConnToken,
  ctx: Ctx,
  serviceUser: ServiceUser,
  projectId: Project.Id,
  subprojectId: Subproject.Id,
  workflowitemId: Workflowitem.Id,
): Promise<Permissions> {
  const result = await Cache.withCache(conn, ctx, async cache =>
    WorkflowitemPermissionsList.getAll(ctx, serviceUser, projectId, subprojectId, workflowitemId, {
      getWorkflowitem: async (pId, spId, wId) => {
        return cache.getWorkflowitem(pId, spId, wId);
      },
    }),
  );
  if (Result.isErr(result)) return Promise.reject(result);

  return result;
}
