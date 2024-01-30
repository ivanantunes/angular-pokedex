import { CrudBase } from '../class';
import { CrudError, CrudFilter, CrudSchema, Favorite } from '../interfaces';
import { DatabaseService } from '../services/database.service';

export class FavoriteView implements CrudBase<Favorite> {

  constructor(
    private database: DatabaseService
  ) { }

  get schema(): CrudSchema {
    return {
      tablename: 'tb_favorite',
      columns: '++id, pokemonId'
    }
  }

  async create(object: any): Promise<Favorite> {
    try {
      const response = await this.database.create(this.schema.tablename, object);
      return Promise.resolve({...object, id: response});
    } catch (error) {
      const crudError: CrudError = { message: 'Failed to Create Favorite Pokemon', log: error };
      return Promise.reject(crudError);
    }
  }

  async read(filter?: CrudFilter | undefined): Promise<Favorite[]> {
    try {
      const result = await this.database.read(this.schema.tablename, filter);
      return Promise.resolve(result);
    } catch (error) {
      const crudError: CrudError = { message: 'Failed to Read Favorite Pokemon', log: error };
      return Promise.reject(crudError);
    }
  }

  async update(object: any, id: number): Promise<Favorite> {
    try {
      await this.database.update(this.schema.tablename, object, id);
      return Promise.resolve({...object, id});
    } catch (error) {
      const crudError: CrudError = { message: 'Failed to Update Favorite Pokemon', log: error };
      return Promise.reject(crudError);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.database.deleteRow(this.schema.tablename, id);
      return Promise.resolve();
    } catch (error) {
      const crudError: CrudError = { message: 'Failed to Delete Favorite Pokemon', log: error };
      return Promise.reject(crudError);
    }
  }
}
