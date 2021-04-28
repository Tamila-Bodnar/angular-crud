import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICarEntity } from '../interfaces/car-entity.interface';
import { ICarOwnersService } from '../interfaces/car-owners-service.interface';
import { IOwnerEntity } from '../interfaces/owner-entity.interface';

@Injectable({
  providedIn: 'root',
})
export class CarOwnersService implements ICarOwnersService {
  public httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  public ownersUrl = 'api/owners';
  constructor(private http: HttpClient) {}

  public getOwners(): Observable<IOwnerEntity[]> {
    return this.http.get<IOwnerEntity[]>(this.ownersUrl).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  public getOwnerById(aId: number): Observable<IOwnerEntity> {
    const url = `${this.ownersUrl}/${aId}`;

    return this.http.get<IOwnerEntity>(url).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  public createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: ICarEntity[]
  ): Observable<IOwnerEntity> {
    let aId = Number(Date.now() + (Math.random() * 100000).toFixed());
    let newOwner = {
      id: aId,
      lastName: aLastName,
      firstName: aFirstName,
      middleName: aMiddleName,
      cars: [...aCars],
    };

    return this.http
      .post<IOwnerEntity>(this.ownersUrl, newOwner, this.httpOptions)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  public editOwner(aOwner: IOwnerEntity): Observable<IOwnerEntity> {
    return this.http
      .put<IOwnerEntity>(this.ownersUrl, aOwner, this.httpOptions)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  public deleteOwner(aOwnerId: number): Observable<IOwnerEntity[]> {
    const url = `${this.ownersUrl}/${aOwnerId}`;

    return this.http.delete<IOwnerEntity[]>(url, this.httpOptions).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
