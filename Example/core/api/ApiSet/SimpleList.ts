import { IEntity } from "@core/core/types";

import { createCrudAPIPaths } from "../createCrudAPIPaths";
import { IDefaultEntityQuery, IEntityListAPI, IItemsListData } from "../types";

import { BaseListApiSet } from "./Base";
import { CrudApiSet } from "./Crud";

export abstract class SimpleListApiSet<T extends IEntity = IEntity>
  extends BaseListApiSet<T>
  implements IEntityListAPI<T>
{
  createPaths({ basename }: { basename: string }) {
    const { list } = createCrudAPIPaths(basename);
    return { list };
  }

  // ---

  async getList(query?: IDefaultEntityQuery<T>): Promise<IItemsListData<T>> {
    return CrudApiSet.prototype.getList.call(this, query);
  }
}
