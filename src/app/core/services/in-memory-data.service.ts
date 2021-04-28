import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IOwnerEntity } from '../interfaces/owner-entity.interface';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): object {
    const owners: IOwnerEntity[] = [
      {
        id: 15,
        lastName: 'Smith',
        firstName: 'Tom',
        middleName: 'James',
        cars: [
          {
            number: 'AB2341BB',
            brand: 'Chevrolet',
            model: 'Aveo',
            year: 2020,
          },
          {
            number: 'FB2871CB',
            brand: 'Chevrolet',
            model: 'Camaro',
            year: 2016,
          },
        ],
      },
      {
        id: 16,
        lastName: 'Johnson',
        firstName: 'Garry',
        middleName: 'Thomas',
        cars: [
          {
            number: 'AC7845AA',
            brand: 'Chevrolet',
            model: 'Alero',
            year: 2004,
          },
          {
            number: 'KC7741BB',
            brand: 'Chevrolet',
            model: 'Aveo',
            year: 2005,
          },
        ],
      },
      {
        id: 17,
        lastName: 'Williams',
        firstName: 'John',
        middleName: 'William',
        cars: [
          {
            number: 'BD4533BB',
            brand: 'Ford',
            model: 'MUSTANG MACH-E',
            year: 1990,
          },
          {
            number: 'BB5555BB',
            brand: 'Chevrolet',
            model: 'Cobalt',
            year: 2016,
          },
        ],
      },
      {
        id: 18,
        lastName: 'Brown',
        firstName: 'Bill',
        middleName: 'James',
        cars: [
          {
            number: 'NA2001AB',
            brand: 'Chevrolet',
            model: 'Aveo',
            year: 2014,
          },
        ],
      },
    ];

    return { owners };
  }
}
