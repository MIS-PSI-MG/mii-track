import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TrackingService } from '../tracking.service';
import { map, Observable, startWith } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SaisieService } from './saisie.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saisie',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatError,
    MatSelectModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
    MatCardModule,
    MatToolbarModule,
    RouterLink,
  ],
  templateUrl: './saisie.component.html',
  styleUrl: './saisie.component.scss',
})
export class SaisieComponent {
  userForm: FormGroup;
  tracking = inject(TrackingService);
  saisieService = inject(SaisieService);

  @ViewChild('codeInput') codeInput: ElementRef | undefined;
  tempOperation: string = '';
  tempDestination: string = '';
  tempType: string = '';
  tempLot: string = '';
  tempQte: number = 50;
  tempNumCamion: string = '';

  destinationOptions = this.saisieService.destinationOptions;

  typeOperations = [
    { id: 1, option: 'Entrée' },
    { id: 2, option: 'Sortie' },
  ];

  typeCaracteristiques = this.saisieService.typeCaracteristiques;
  filteredDestinations: Observable<{ id: number; option: string }[]>;

  constructor() {
    this.userForm = new FormGroup({
      dateSub: new FormControl(new Date(), Validators.required),
      operation: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lot: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      caracteristique: new FormControl('', Validators.required),
      quantite: new FormControl(50, Validators.required),
      numCamion: new FormControl('', Validators.required),
    });

    this.filteredDestinations = this.userForm.controls[
      'destination'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.destinationOptions.filter((option) =>
      option.option.toLowerCase().includes(filterValue),
    );
  }

  updateValidations(): void {
    const formList = [
      'code',
      'operation',
      'lot',
      'destination',
      'caracteristique',
      'quantite',
      'numCamion',
    ];
    if (this.tracking.isa() !== 1) {
      // this.userForm.get('destination')?.setValidators(null);
      this.userForm.get('destination')?.setValue(this.tempDestination);
      this.userForm.get('caracteristique')?.setValue(this.tempType);
      this.userForm.get('lot')?.setValue(this.tempLot);
      this.userForm.get('numCamion')?.setValue(this.tempNumCamion);
      this.userForm.get('quantite')?.setValue(this.tempQte);
      this.userForm.get('operation')?.setValue(this.tempOperation);
      this.userForm.get('dateSub')?.setValue(new Date());
      // this.userForm.controls['code'].valueChanges.subscribe(() => {
      //   this.submit();
      // });
    } else {
      formList.map((el) =>
        this.userForm.get(el)?.setValidators(Validators.required),
      );
    }
    formList.map((el) => this.userForm.get(el)!.updateValueAndValidity());
  }

  setTemp() {
    this.tempDestination = this.userForm.get('destination')?.value;
    this.tempType = this.userForm.get('caracteristique')?.value;
    this.tempLot = this.userForm.get('lot')?.value;
    this.tempNumCamion = this.userForm.get('numCamion')?.value;
    this.tempQte = this.userForm.get('quantite')?.value;
    this.tempOperation = this.userForm.get('operation')?.value;
  }

  submit() {
    if (this.tracking.isa() < 3) {
      this.tracking.incIsa();
      console.log('submit izao');
      this.setTemp();
    } else {
      this.tracking.incLot();
      this.tracking.resetIsa();
    }
    console.log(this.userForm.value);
    this.userForm.reset();
    this.updateValidations();
    this.codeInput!.nativeElement.focus();
  }
}
