import { Peripheral } from "../peripheral";

export class InductionMatrix extends Peripheral {
  constructor(code: string, name: string, joulesToRf: number) {
    super(code, name);
    this._joulesToRf = joulesToRf;
  }
  private readonly _joulesToRf: number = 2.5;
  getMaxEnergy() {
    // language=Lua
    return `tostring(peripheral.find("${this._peripheral_code}").getMaxEnergy() / ${this._joulesToRf})`;
  }

  getEnergy() {
    // language=Lua
    return `tostring(peripheral.find("${this._peripheral_code}").getEnergy() / ${this._joulesToRf})`;
  }

  getPercentage() {
    // language=lua
    return `tostring(peripheral.find("${this._peripheral_code}").getPercentage())`;
  }

  getLastInput() {
    // language=lua
    return `tostring(peripheral.find("${this._peripheral_code}").getLastInput() / ${this._joulesToRf})`;
  }
  getLastOutput() {
    // language=lua
    return `tostring(peripheral.find("${this._peripheral_code}").getLastOutput() / ${this._joulesToRf})`;
  }
}
