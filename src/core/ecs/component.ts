export class Component {
  protected _id!: string;

  protected _isDeleted: boolean = false;

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
