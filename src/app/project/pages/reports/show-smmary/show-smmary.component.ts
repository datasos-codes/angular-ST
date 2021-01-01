import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-show-smmary',
  templateUrl: './show-smmary.component.html',
  styleUrls: ['./show-smmary.component.scss']
})
export class ShowSmmaryComponent implements OnInit {
  displayData: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.displayData = this.config.data.showSummaryDetails;
  }

}
