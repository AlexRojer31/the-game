import { Component } from "./component";

export class System {
  private _components: Component[] = [];

  public update(): void {}

  public pushComponents(...items: Component[]): void {
    this._components.push(...items);
  }

  public getComponents(): Component[] {
    return this._components;
  }

  public deleteStaleComponents(): void {
    this._components = this._components.filter(
      (c: Component) => !c.isDeleted(),
    );
  }
}
