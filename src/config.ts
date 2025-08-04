// import { ExampleSceneLoader } from "./modules/example-scene/example-scene-loader";
import { TraineeEcsSceneLoader } from "./modules/trainee-ecs-scene/trainee-ecs-scene-loader";

export const config = {
  firstScene: new TraineeEcsSceneLoader(),
};
