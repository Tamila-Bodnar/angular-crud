import { ICarEntity } from './../../../core/interfaces/car-entity.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarOwnersService } from 'src/app/core/services/car-owners.service';
import { IOwnerEntity } from './../../../core/interfaces/owner-entity.interface';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit, OnDestroy {
  public type = 'create';
  public owner!: IOwnerEntity;
  public owners!: IOwnerEntity[];
  public getOwnerSubscription!: Subscription;
  public getOwnersSubscription!: Subscription;
  public editOwnerSubscription!: Subscription;
  public saveOwnerSubscription!: Subscription;
  public onlyOneCar = true;
  public allCarNumbers: string[] = [];
  private numberCarRegExp: RegExp = /^[A-Z]{2}[0-9]{4}[A-Z]{2}$/;
  public ownerForm!: FormGroup;
  public titleAlert = 'This field is required';

  constructor(
    private carOwnersService: CarOwnersService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.initForm();
    let aId: number = +this.route.snapshot.params.id;
    if (aId) {
      this.type = this.route.snapshot.queryParams.edit ? 'edit' : 'show';
      this.getOwnerById(aId);
    }
  }

  private initForm(): void {
    this.ownerForm = this.formBuilder.group({
      id: [''],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      cars: this.formBuilder.array([this.getCarItem()]),
    });
  }

  public getOwnerById(id: number): void {
    this.getOwnerSubscription = this.carOwnersService
      .getOwnerById(id)
      .subscribe((data) => {
        this.owner = data;
        let carsNumber = this.owner.cars.length;
        if (carsNumber > 1) {
          for (let i = 0; i < carsNumber - 1; i++) {
            this.addCar();
          }
        }
        this.ownerForm.patchValue(data);
      });
    this.getArrayNumbersFromOtherOwners(id);
  }

  public goBack(): void {
    this.location.back();
  }

  public save(value: IOwnerEntity): void {
    if (this.type === 'create') {
      this.saveOwnerSubscription = this.carOwnersService
        .createOwner(
          value.lastName,
          value.firstName,
          value.middleName,
          value.cars
        )
        .subscribe(() => this.goBack());
    } else {
      this.editOwnerSubscription = this.carOwnersService
        .editOwner(value)
        .subscribe(() => this.goBack());
    }
  }

  public getArrayNumbersFromOtherOwners(id: number): void {
    this.getOwnersSubscription = this.carOwnersService
      .getOwners()
      .subscribe((data) => {
        this.owners = data;
        for (let i = 0; i < this.owners.length; i++) {
          if (this.owner.id !== this.owners[i].id) {
            this.owners[i].cars.forEach((car) =>
              this.allCarNumbers.push(car.number)
            );
          }
        }
      });
  }

  public uniqNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.allCarNumbers.includes(control.value)) {
        return { custom: 'Please, enter uniq number' };
      }
      return null;
    };
  }

  public countCars(): number {
    return this.carsForms.length;
  }

  get carsForms(): FormArray {
    return this.ownerForm.get('cars') as FormArray;
  }

  get lastName(): FormControl {
    return this.ownerForm.get('lastName') as FormControl;
  }

  get firstName(): FormControl {
    return this.ownerForm.get('firstName') as FormControl;
  }

  get middleName(): FormControl {
    return this.ownerForm.get('middleName') as FormControl;
  }

  private getCarItem(): FormGroup {
    const car = this.formBuilder.group({
      number: [
        '',
        [
          Validators.required,
          Validators.pattern(this.numberCarRegExp),
          RxwebValidators.unique(),
          this.uniqNumberValidator(),
        ],
      ],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: [
        '',
        [Validators.required, Validators.max(2021), Validators.min(1990)],
      ],
    });

    return car;
  }

  public addCar(): void {
    this.onlyOneCar = false;
    this.carsForms.push(this.getCarItem());
  }

  public deleteCar(index: number): void {
    this.carsForms.removeAt(index);
    this.onlyOneCar = this.countCars() === 1;
  }

  public ngOnDestroy(): void {
    this.getOwnerSubscription ? this.getOwnerSubscription.unsubscribe : null;
    this.getOwnersSubscription ? this.getOwnersSubscription.unsubscribe : null;
    this.editOwnerSubscription ? this.editOwnerSubscription.unsubscribe : null;
  }
}
