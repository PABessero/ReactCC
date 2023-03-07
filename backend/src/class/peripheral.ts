export class Peripheral {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  constructor(code, name) {
    this._peripheral_code = code;
    this._name = name;
  }
  protected readonly _peripheral_code: string;
  private _name: string;
}
