import { Component } from "./component";

export class Entity {
  private _id!: string;

  private _components: Component[] = [];

  constructor() {
    this._id = crypto.randomUUID();
  }

  public attachComponents(...components: Component[]) {
    this._components = [...this._components, ...components];
  }

  public deleteComponents() {
    this._components.forEach((c: Component) => c.delete());
  }

  public getID(): string {
    return this._id;
  }
}
