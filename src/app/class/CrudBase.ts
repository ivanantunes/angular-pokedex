import { CrudFilter, CrudSchema } from '../interfaces';

export abstract class CrudBase<X> {
  abstract get schema(): CrudSchema;

  abstract create(object: any): Promise<X>;

  abstract read(filter?: CrudFilter): Promise<X[]>;

  abstract update(object: any, id: number): Promise<X>;

  abstract delete(id: number): Promise<void>;
}
