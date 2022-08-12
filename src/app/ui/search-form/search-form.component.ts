import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FhirSearchFn } from '@red-probeaufgabe/types';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent {
  
  searchForm = this.fb.group({
    term: this.fb.control('', [
      patternValidator
    ]),
    profile: this.fb.control(FhirSearchFn.SearchAll)
  })

  profileFilterOptions: FhirSearchFn[] = [
    FhirSearchFn.SearchAll,
    FhirSearchFn.SearchPatients,
    FhirSearchFn.SearchPractitioners
  ]

  @Output() search$ = this.searchForm.valueChanges.pipe(
    filter(() => this.searchForm.valid)
  )

  public get searchTermFormControl(): FormControl {
    return this.searchForm.controls['term'] as FormControl;
  }


  public get profileFormControl(): FormControl {
    return this.searchForm.controls['profile'] as FormControl;
  }

  constructor(private fb: FormBuilder) {}

}


function patternValidator(control: AbstractControl) {
  if (control && control.value) {
    const value: string = control.value;

    if (value.trim().match(/[äüö]/g)) {
      return { charsNotAllowed: 'äüö not allowed' }
    }
    if (value.trim().match(/\s/g)) {
      return { whiteSpacesNotAllowed: 'White Spaces not allowed'}
    }
  }
  return null;
}