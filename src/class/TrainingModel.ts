export abstract class TrainingModel {
  abstract getModel(): Promise<any>;
  abstract getModelName(): string;
  abstract getModelDescription(): string;
  abstract getModelPrice(): number;
}
