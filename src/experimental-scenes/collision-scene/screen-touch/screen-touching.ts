import { GetApp } from "../../../core/app/run";
import { System } from "../../../core/ecs/system";
import { ISceneSize } from "../../../core/loaders/scene-loader/i-scene";
import { GetSceneLoader } from "../../../core/loaders/scene-loader/run";
import Rectangable from "../../trainee-move-scene/draw/rectangle/rectangable";
import ScreenTouchable from "./screen-touchable";

export default class ScreenTouching extends System<ScreenTouchable> {
  private _width: number = GetApp().screen.width;
  private _height: number = GetApp().screen.height;

  public update(): void {
    const currentSize: ISceneSize = GetSceneLoader()
      .getCurrentScene()!
      .getCurrentSize();
    this._width = currentSize.width;
    this._height = currentSize.height;

    for (const component of this.getComponents()) {
      component.rightTouch = false;
      component.leftTouch = false;
      component.bottomTouch = false;
      component.topTouch = false;

      if (
        component.rectangable.width +
          component.rectangable.flatMovable.position.x >=
        this._width
      ) {
        component.rightTouch = true;
      }

      if (component.rectangable.flatMovable.position.x <= 0) {
        component.leftTouch = true;
      }

      if (
        component.rectangable.height +
          component.rectangable.flatMovable.position.y >=
        this._height
      ) {
        component.bottomTouch = true;
      }

      if (component.rectangable.flatMovable.position.y <= 0) {
        component.topTouch = true;
      }
    }
  }

  public createScreenTouchable(rectangable: Rectangable): ScreenTouchable {
    const component = new ScreenTouchable(rectangable);
    this.pushComponents(component);
    return component;
  }
}
