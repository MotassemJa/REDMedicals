import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FhirUtilService } from '@red-probeaufgabe/search';
import { IFhirPatient, IFhirPractitioner, IPreparedIFhirPatient, IPreparedIFhirPractitioner } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-dialog-detail-row',
  templateUrl: './dialog-detail-row.component.html',
  styleUrls: ['./dialog-detail-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogDetailRowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) 
    private data: IFhirPatient | IFhirPractitioner, 
    private formatter: FhirUtilService) {}

  public get displayData(): IPreparedIFhirPatient | IPreparedIFhirPractitioner {
    console.log(this.formatter.prepareData(this.data));
    
    return (this.formatter.prepareData(this.data) as any)?.entry;
  }
}
