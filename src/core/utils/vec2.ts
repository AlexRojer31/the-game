export class Vec2 {
  public x!: number;
  public y!: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    Object.freeze(this);
  }

  public add(otherVec: Vec2) {
    return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
  }

  public subtract(otherVec: Vec2) {
    return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
  }

  public scale(scalar: number) {
    return new Vec2(scalar * this.x, scalar * this.y);
  }

  public magnitude() {
    return Math.sqrt(this.dot(this));
  }

  public normalize() {
    const magnitude = this.magnitude();
    return new Vec2(this.x / magnitude, this.y / magnitude);
  }

  public dot(otherVector: Vec2) {
    return this.x * otherVector.x + this.y * otherVector.y;
  }
}
