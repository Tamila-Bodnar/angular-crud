import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IOwnerEntity } from '../../../core/interfaces/owner-entity.interface';
import { CarOwnersService } from 'src/app/core/services/car-owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss'],
})
export class OwnersComponent implements OnInit, OnDestroy {
  public owners: IOwnerEntity[] = [];
  public getOwnersSubscription!: Subscription;
  public removeOwnerSubscription!: Subscription;
  public chosen = false;
  public selectedId = -1;
  public displayColumns: string[] = [
    'lastName',
    'firstName',
    'middleName',
    'numberCars',
  ];
  constructor(
    private carOwnersService: CarOwnersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOwners();
  }

  public trackById(index: number, item: IOwnerEntity): number {
    return item.id;
  }

  public getOwners(): void {
    this.getOwnersSubscription = this.carOwnersService
      .getOwners()
      .subscribe((data) => (this.owners = data));
  }

  public selectOwner(id: number): void {
    if (this.selectedId !== id) {
      this.selectedId = id;
      this.chosen = true;
    } else {
      this.selectedId = -1;
      this.chosen = false;
    }
  }

  public add(): void {
    this.router.navigate(['/add-owner']);
  }

  public show(id: number): void {
    this.router.navigate(['/owner', id]);
  }

  public edit(id: number): void {
    this.router.navigate(['/owner', id], { queryParams: { edit: 'true' } });
  }

  public remove(id: number): void {
    this.owners = this.owners.filter((owner) => owner.id !== id);
    this.removeOwnerSubscription = this.carOwnersService
      .deleteOwner(id)
      .subscribe();
    this.chosen = false;
  }

  public ngOnDestroy(): void {
    this.getOwnersSubscription
      ? this.getOwnersSubscription.unsubscribe()
      : null;
    this.removeOwnerSubscription
      ? this.removeOwnerSubscription.unsubscribe()
      : null;
  }
}
