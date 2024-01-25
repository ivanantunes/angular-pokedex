import { Injectable } from '@angular/core';
import Dexie, { Collection, IndexableType, PromiseExtended, WhereClause } from 'dexie';
import { CrudController } from '../controller';
import { CrudFilter } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  private crudController = new CrudController(this);

  constructor() {
    super('database_pokedex');

    this.version(1).stores(this.crudController.tables);
  }

  private makeComparer(whereClause: WhereClause<any, IndexableType>, key: string, value: any): Collection<any, IndexableType> {
    const type = typeof value;

    if (type === 'number') {
      return whereClause.equals(Number(value));
    } else if (type === 'string') {
      return whereClause.startsWithIgnoreCase(value);
    } else {
      return whereClause.equalsIgnoreCase(value);
    }
  }

  public create(tablename: string, value: any): PromiseExtended<IndexableType> {
    return super.table(tablename).add(value)
  }

  public read(tablename: string, filter: CrudFilter | undefined): PromiseExtended<any[]> {
    const table = super.table(tablename);

    if (!filter) {
      return table.toArray();
    }

    let query: Dexie.Collection<any,any>;

    if (filter.where) {
      query = Object.keys(filter.where).reduce((previous, current) => {
        return this.makeComparer(previous.or(current), current, filter.where[current]);
      }, this.makeComparer(table.where('id'), 'id', ''))
    } else {
      query = table.toCollection();
    }

    if (filter.order === 'DESC') {
      query.reverse();
    }

    query.offset(filter.pageSize * filter.pageIndex);
    query.limit(filter.pageSize);

    return filter.orderBy ? query.sortBy(filter.orderBy) : query.toArray();
  }

  public async update(tablename: string, object: any, id: number): Promise<number> {
    return super.table(tablename).update(id, object);
  }

  public async deleteRow(tablename: string, id: number) : Promise<void> {
    return super.table(tablename).delete(id);
  }
}
