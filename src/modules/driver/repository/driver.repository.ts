import { Driver } from '../interfaces/driver';

export type ISaveResponse = {
  driver_id: number;
  name: string;
};

export type IFindALlFilter = {
  name?: string;
  pageInfo: {
    page: number;
    limit: number;
  };
};
export interface IDriverRepo {
  save(data: Driver): Promise<ISaveResponse>;
  exists<T>(value: T, key: string): Promise<Partial<Driver> | undefined>;
  update(driver_id: number, data: Partial<Omit<Driver, 'driver_id'>>): Promise<Driver>;
  remove(driver_id: number): Promise<void>;
  findAll(filter: IFindALlFilter): Promise<Driver[]>;
}
