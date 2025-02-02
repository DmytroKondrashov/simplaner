export class UpdateListDto {
  body: {
    id: number;
    name?: string;
    userId?: number;
  };
  token: string;
}
