import Events = require('events');

const CHANGE_EVENT = 'change';

class NotifyChange {
  private _emitter: Events.EventEmitter = new Events.EventEmitter();


  protected emitChange() {
    this._emitter.emit(CHANGE_EVENT);
  }

  public addChangeListener(callback:()=>void): void {
    this._emitter.addListener(CHANGE_EVENT, callback);
  }

  public removeChangeListener(callback: ()=>void): void {
    this._emitter.removeListener(CHANGE_EVENT, callback);
  }
}

export default  NotifyChange;
