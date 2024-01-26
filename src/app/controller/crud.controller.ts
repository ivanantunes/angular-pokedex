import { CrudSchema } from '../interfaces';
import { DatabaseService } from '../services';
import { CrudBase } from '../class';
import { FavoriteView } from '../view';

export class CrudController {

  private views: CrudBase<any>[] = []

  constructor(
    private databaseService: DatabaseService
  ) {
    this.views = [
      new FavoriteView(this.databaseService)
    ]
  }

  public get schemas(): CrudSchema[] {
    return this.views.map((view) => view.schema);
  }

  public get tables(): { [X: string]: string } {
    return Object.assign({}, ...this.schemas.map((schema) => {
      return { [schema.tablename]: schema.columns };
    }))
  }
}
