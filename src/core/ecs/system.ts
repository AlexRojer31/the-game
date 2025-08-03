import { Component } from "./component";

export class System {
  protected _components: Component[] = [];

  constructor() {}

  public update(): void {}

  public deleteStaleComponents(): void {
    this._components = this._components.filter(
      (c: Component) => !c.isDeleted(),
    );
  }
}
