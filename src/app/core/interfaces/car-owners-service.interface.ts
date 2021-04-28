import { Observable } from 'rxjs';
import { ICarEntity } from './car-entity.interface';
import { IOwnerEntity } from './owner-entity.interface';

export interface ICarOwnersService {
  getOwners(): Observable<IOwnerEntity[]>;
  getOwnerById(aId: number): Observable<IOwnerEntity>;
  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: ICarEntity[]
  ): Observable<IOwnerEntity>;
  editOwner(aOwner: IOwnerEntity): Observable<IOwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<IOwnerEntity[]>;
}
