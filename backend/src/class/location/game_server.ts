export class GameServer {
  constructor(name, address) {
    this._name = name;
    this._address = address;
  }
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  listPeripherals() {
    //language=lua
    return `tostring(peripheral.getNames())`;
  }

  private _name: string;
  private _address: string;
}
