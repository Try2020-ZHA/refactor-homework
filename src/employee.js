class Employee {
  constructor (name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  isEngineerOrManagerOrSalesman(type){
    return type==='engineer'||type==='manager'||type==='salesman';
  }

  validateType (type) {
    if (!this.isEngineerOrManagerOrSalesman(type)) {
      throw new Error(`Employee cannot be of type ${type}`);
    }
  }

  toString () {
    return `${this._name} (${this._type})`;
  }
}
