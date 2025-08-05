export class Component {
  private _id!: string;

  private _isDeleted: boolean = false;

  constructor() {
    this._id = crypto.randomUUID();
  }

  public delete() {
    this._isDeleted = true;
  }

  public getID(): string {
    return this._id;
  }

  public isDeleted(): boolean {
    return this._isDeleted;
  }
}
