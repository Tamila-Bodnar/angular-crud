import { ICarEntity } from './car-entity.interface';

export interface IOwnerEntity {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  cars: ICarEntity[];
}
