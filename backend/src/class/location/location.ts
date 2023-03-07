import { Dimension } from "./dimension";
import { World } from "./world";
import { GameServer } from "./game_server";

export class Location {
  get server(): GameServer {
    return this._server;
  }

  set server(value: GameServer) {
    this._server = value;
  }
  get world(): World {
    return this._world;
  }

  set world(value: World) {
    this._world = value;
  }
  get dimension(): Dimension {
    return this._dimension;
  }

  set dimension(value: Dimension) {
    this._dimension = value;
  }
  get z(): number {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
  }
  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }
  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }
  constructor(
    location: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 },
    dimension: Dimension = new Dimension("Unknown"),
    world: World = new World("Unknown"),
    server: GameServer = new GameServer("Unknown", "unknown")
  ) {
    this._x = location.x;
    this._y = location.y;
    this._z = location.z;

    this._dimension = dimension;
    this._world = world;
    this._server = server;
  }

  private _x: number = 0;
  private _y: number = 0;
  private _z: number = 0;

  private _dimension: Dimension;
  private _world: World;
  private _server: GameServer;
}
