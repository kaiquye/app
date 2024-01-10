export abstract class UseCase<Input, Output> {
  abstract execute(data: Input): Promise<Output>;
}
