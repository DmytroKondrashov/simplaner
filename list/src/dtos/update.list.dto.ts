export class UpdateListDto {
  body: {
    id: number;
    name?: string;
    userId?: number;
    items?: any[];
  };
  token: string;
}
