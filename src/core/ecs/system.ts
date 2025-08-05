import { Component } from "./component";

export class System<T extends Component> {
  private _components: T[] = [];

  public update(): void {}

  public pushComponents(...items: T[]): void {
    this._components.push(...items);
  }

  public getComponents(): T[] {
    return this._components;
  }

  public deleteStaleComponents(): void {
    this._components = this._components.filter((c: T) => !c.isDeleted());
  }
}
