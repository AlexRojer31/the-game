import { Component } from "./component";

export class Entity<T extends Component> {
  private _id!: string;

  private _components: T[] = [];

  constructor() {
    this._id = crypto.randomUUID();
  }

  public attachComponents(...components: T[]) {
    this._components = [...this._components, ...components];
  }

  public deleteComponents() {
    this._components.forEach((c: T) => c.delete());
  }

  public getID(): string {
    return this._id;
  }
}
