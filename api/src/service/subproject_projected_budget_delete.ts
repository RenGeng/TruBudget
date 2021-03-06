import { Ctx } from "../lib/ctx";
import * as Result from "../result";
import * as Cache from "./cache2";
import { ConnToken } from "./conn";
import { ServiceUser } from "./domain/organization/service_user";
import { CurrencyCode } from "./domain/workflow/money";
import * as Project from "./domain/workflow/project";
import { ProjectedBudget } from "./domain/workflow/projected_budget";
import * as Subproject from "./domain/workflow/subproject";
import * as SubprojectProjectedBudgetDelete from "./domain/workflow/subproject_projected_budget_delete";
import { store } from "./store";

export async function deleteProjectedBudget(
  conn: ConnToken,
  ctx: Ctx,
  serviceUser: ServiceUser,
  projectId: Project.Id,
  subprojectId: Subproject.Id,
  organization: string,
  currencyCode: CurrencyCode,
): Promise<ProjectedBudget[]> {
  const result = await Cache.withCache(conn, ctx, async cache =>
    SubprojectProjectedBudgetDelete.deleteProjectedBudget(
      ctx,
      serviceUser,
      projectId,
      subprojectId,
      organization,
      currencyCode,
      {
        getSubproject: async (pId, spId) => {
          return cache.getSubproject(pId, spId);
        },
      },
    ),
  );
  if (Result.isErr(result)) throw result;

  for (const event of result.newEvents) {
    await store(conn, ctx, event);
  }

  return result.projectedBudgets;
}
