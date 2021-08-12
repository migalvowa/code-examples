import { IEntity } from "@core/core/types";

import { createCrudAPIPaths } from "../createCrudAPIPaths";
import {
  IDefaultEntityPayload,
  IDefaultEntityQuery,
  IDefaultEntitySchema,
  IEntityCrudAPI,
} from "../types";

import { BaseCrudApiSet } from "./Base";

export abstract class CrudApiSet<
    T extends IEntity = IEntity,
    L extends IEntity = T,
    Schema = IDefaultEntitySchema<T>,
    CreatePayload = IDefaultEntityPayload<T>,
    UpdatePayload = CreatePayload
  >
  extends BaseCrudApiSet<T, L, Schema, CreatePayload, UpdatePayload>
  implements IEntityCrudAPI<T, L, Schema, CreatePayload, UpdatePayload>
{
  createPaths({ basename }: { basename: string }) {
    return createCrudAPIPaths(basename);
  }

  // ---

  async getList(query?: IDefaultEntityQuery<T>) {
    const response = await this.api.get(this.getPaths().list(), {
      params: this.composeQuery(query),
    });
    const { total, items } = this.parseListResponse(response.data);
    return { total, items: items.map(this.parseListItem) };
  }

  async getById(id: T["id"]) {
    const response = await this.api.get(this.getPaths().details(id));
    return this.parseItem(this.parseItemResponse(response.data));
  }

  async update(id: T["id"], data: UpdatePayload) {
    const response = await this.api.put(
      this.getPaths().details(id),
      this.composeUpdatePayload(data)
    );
    return this.parseItem(this.parseItemResponse(response.data));
  }

  async create(data: CreatePayload) {
    const response = await this.api.post(
      this.getPaths().create(),
      this.composeCreatePayload(data)
    );
    return this.parseItem(this.parseItemResponse(response.data));
  }

  async removeOne(id: T["id"]) {
    await this.api.delete(this.getPaths().details(id));
  }

  async removeMany(ids: T["id"][]) {
    await this.api.patch(this.getPaths().removeMany(), {
      data: ids.map((id) => ({ id })),
    });
  }

  abstract async getSchema(): Promise<Schema>;
}
