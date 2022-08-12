import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AbstractSearchFacadeService, SearchFacadeService, SearchModule } from '@red-probeaufgabe/search';
import { UiModule } from '@red-probeaufgabe/ui';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, UiModule, SearchModule, DashboardRoutingModule],
  exports: [DashboardComponent],
  providers: [
    // When AbstractSearchFacadeService is needed, use SearchFacadeService instead
    {
      provide: AbstractSearchFacadeService,
      useClass: SearchFacadeService
    }
  ]
})
export class DashboardModule {}
