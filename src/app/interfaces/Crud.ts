export interface CrudFilter {
  search?: string;
  pageSize: number;
  pageIndex: number;
  where?: any;
  order?: 'ASC' | 'DESC';
  orderBy?: string;
}

export interface CrudSchema {
  tablename: string;
  columns: string;
}

export interface CrudError {
  message: string;
  log: any
}

export interface Favorite {
  id: number;
  pokemonId: number;
}
