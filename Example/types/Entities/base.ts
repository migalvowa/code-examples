export interface IEntity {
  id: string // uuid
}

export interface ITitledEntity extends IEntity {
  title: string
}

export interface IHideableEntity extends IEntity {
  active: boolean
}

export interface IDatedEntity extends IEntity {
  dateCreated: string // ISO date
  dateUpdated: string // ISO date
}

export interface IDependentEntity<Deps extends string> extends IEntity {
  dependencies: Record<Deps, number>
}

export interface IBaseEntity
  extends ITitledEntity,
    IHideableEntity,
    IDatedEntity {}
