export class UserIdGenerator {

  private static _nextId = 1;

  public static nextId(): number {
    return UserIdGenerator._nextId++;
  }

}
