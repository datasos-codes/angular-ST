import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OverdueSourcesApi } from '../../../api';
import { OverdueSourcesResponse } from './../../../models/overduesourcesresponse';
import { SortEvent } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-overdue-sources',
  templateUrl: './overdue-sources.component.html',
  styleUrls: ['./overdue-sources.component.scss']
})
export class OverdueSourcesComponent implements OnInit {
  overdueSources: OverdueSourcesResponse[];
  cols: { field: string; header: string; }[];

  constructor(
    private spinner: NgxSpinnerService,
    private overdueSourcesApi: OverdueSourcesApi
  ) { }

  ngOnInit(): void {
    this.getOverdueSources();
    this.cols = [
      { field: 'stateAbbreviation', header: 'State' },
      { field: 'sourceName', header: 'Data Source' },
      { field: 'sourceRec', header: 'Source Provider' },
      { field: 'updateFrequency', header: 'Update Frequency' },
      { field: 'dateReceived', header: 'Last Recevied' },
      { field: 'expectedDate', header: 'Expected Date' }
    ];
  }

  private getOverdueSources() {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value: any) => {
      this.overdueSourcesApi.getAllOverdueSources().subscribe(res => {
        if (res && res['flag'] === 1) {
          this.overdueSources = res['data'];
          this.spinner.hide();
        }
      });
    });
  }

  exportToExcel(args: any): void {
    this.spinner.show();
    this.overdueSourcesApi.exportToExcelOverDuesReports().subscribe(res => {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });
      promise.then((value: any) => {
        const blob = new Blob([res], { type: res.type });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'overdue_sources_reports';
        link.click();
        this.spinner.hide();
      });
    });
  }

  customSortForOverdueSourcesTable(event: SortEvent) {
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
        const test = value1.substr(2, 1);

        const date1 = moment(value1, 'MM-DD-YYYY');
        const date2 = moment(value2, 'MM-DD-YYYY');
        if (test === '-' || test === '/') {
          result = date1.diff(date2, 'days');
        } else {
          result = value1.localeCompare(value2);
        }
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }

      return (event.order * result);
    });
  }
}
