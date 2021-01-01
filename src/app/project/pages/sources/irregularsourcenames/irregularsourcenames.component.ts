import { AddeditirregularsourcenamesComponent } from './addeditirregularsourcenames/addeditirregularsourcenames.component';
import { IrregularSourcesResponse } from './../../../models/irregularsourcesresponse';
import { SourcestatusService } from './../../../services/sourcestatus.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SortEvent } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-irregularsourcenames',
  templateUrl: './irregularsourcenames.component.html',
  styleUrls: ['./irregularsourcenames.component.scss']
})
export class IrregularsourcenamesComponent implements OnInit {
  cols: { field: string; header: string; }[];
  irregularSourceNamesData: IrregularSourcesResponse[];
  isNeedToRenderAddEditIrregularSourcesDialog = false;

  constructor(
    private spinner: NgxSpinnerService,
    private sourcestatusService: SourcestatusService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value) => {
      this.getIrregularSourceNamesList();
      this.spinner.hide();
    });
  }

  private getIrregularSourceNamesList() {
    this.cols = [
      { field: 'stateAbbreviation', header: 'State' },
      { field: 'sourceName', header: 'Data Source' },
      { field: 'filePattern', header: 'File Pattern' },
      { field: 'status ', header: 'Status ' }
    ];

    this.sourcestatusService.getIrregularSources().subscribe(res => {
      this.irregularSourceNamesData = res['data'];
    });
  }

  addEditIrrgularSource(arg: any, irregularSourceData?: any): void {
    const ref = this.dialogService.open(AddeditirregularsourcenamesComponent, {
      header: (irregularSourceData === undefined ? 'Add Irregular Source' : 'Edit Irregular Source'),
      data: (irregularSourceData === undefined ? null : irregularSourceData),
      closeOnEscape: true,
      baseZIndex: 5000,
      styleClass: 'viewSourceDialogStyle',
      width: '43%',
    });
    ref.onClose.subscribe(() => {
      this.getIrregularSourceNamesList();
    });
  }

  customSortForirregularSourceNamesTable(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.field];
      const value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === 'string' && typeof value2 === 'string') {
        result = value1.localeCompare(value2);
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.order * result);
    });
  }
}
