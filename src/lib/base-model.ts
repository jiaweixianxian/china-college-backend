import * as _ from 'lodash';

export class BaseModel {
  id: number = null;

  toModel(jsonObj) {
    if (!jsonObj) {
      return;
    }
    _.forEach(jsonObj, (value, key) => {
      if (this.hasOwnProperty(key)) {
        this[key] = value;
      }
    });
    return this;
  }
}