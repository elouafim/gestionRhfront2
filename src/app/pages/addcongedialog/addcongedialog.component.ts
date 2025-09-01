import { Component, Inject, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addcongedialog',
  templateUrl: './addcongedialog.component.html',
  styleUrls: ['./addcongedialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddcongedialogComponent implements AfterViewInit {

  congeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddcongedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const conge = this.data?.conge;

    this.congeForm = this.fb.group({
      dateRange: this.fb.group({
        start: [conge?.dateDebut || '', Validators.required],
        end: [conge?.dateFin || '', Validators.required],
      }),
      typeConge: [conge?.typeConge || '', Validators.required],
    });
  }

  ngAfterViewInit() {}

  submit() {
    if (this.congeForm.valid) {
      const formValues = this.congeForm.value;
      this.dialogRef.close({
        dateDebut: formValues.dateRange.start,
        dateFin: formValues.dateRange.end,
        typeConge: formValues.typeConge
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
