import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrapeDeliveryApi } from '../../../api';
import { NotificationService } from './../../../services/notification.service';
import { DatePipe } from '@angular/common';
import { ScrapeDeliveryReportResponse } from './../../../models';
import { DialogService } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ShowSmmaryComponent } from '../show-smmary/show-smmary.component';
import * as moment from 'moment';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-scrape-delivery',
  templateUrl: './scrape-delivery.component.html',
  styleUrls: ['./scrape-delivery.component.scss'],
  entryComponents: [ShowSmmaryComponent]
})
export class ScrapeDeliveryComponent implements OnInit {

  getReportsFrom: FormGroup;
  newScrapesData: ScrapeDeliveryReportResponse[];
  scrapeExecutionsData: ScrapeDeliveryReportResponse[];
  newScrapesLength: any;
  scrapeExecutionsLength: any;
  cols: { field: string; header: string; }[];
  firstDay: any;
  lastDay: any;
  currentDate = new Date();
  filterObj: any;

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private notifyService: NotificationService,
    private scrapeDeliveryApi: ScrapeDeliveryApi,
    public datepipe: DatePipe,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.spinnerShowHide();
    this.firstDay = this.datepipe.transform(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1), 'MM/dd/yyyy');
    this.lastDay = this.datepipe.transform(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0), 'MM/dd/yyyy');
    this.getReportsFrom = this.fb.group({
      receivedDates: new FormControl([
        this.firstDay,
        this.lastDay
      ])
    });
    this.cols = [
      { field: 'stateabb', header: 'State' },
      { field: 'sourcename', header: 'Data Source' },
      { field: 'dateReceived', header: 'Received Date' },
      { field: 'note', header: 'Initial Note(s)' }
    ];
  }

  private spinnerShowHide() {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value: any) => {
      this.spinner.hide();
    });
  }

  getAllReports(dateValue: any, arg: any) {
    if (dateValue && dateValue !== null) {
      this.spinner.show();
      const fDate = this.datepipe.transform(dateValue.split(' ', 3)[0], 'MM-dd-yyyy');
      const tDate = this.datepipe.transform(dateValue.split(' ', 3)[2], 'MM-dd-yyyy');
      this.scrapeDeliveryApi.getAllReportsByReceivedDates(fDate, tDate).subscribe(res => {
        if (res && res['flag'] === 1) {
          const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 1500);
          });
          promise.then((value: any) => {
            this.newScrapesData = res['data']['newScrapes'];
            this.newScrapesLength = '- ' + res['data']['newScrapes'].length;
            this.scrapeExecutionsData = res['data']['scrapeExecutions'];
            this.scrapeExecutionsLength = '- ' + res['data']['scrapeExecutions'].length;
            this.spinner.hide();
          });
        }
      });
    } else {
      this.notifyService.showWarning('Please select received dates.');
    }
  }

  exportToExcelReports(args: any) {
    const takeVal = this.getReportsFrom.get('receivedDates').value;
    if (takeVal && takeVal.length > 0) {
      this.spinner.show();
      this.filterObj = {
        fromDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd'),
        toDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd')
      };
      // if (navigator.userAgent.indexOf('Firefox') !== -1) {
      //   this.filterObj = {
      //     fromDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd'),
      //     toDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd')
      //   };
      // } else {
      //   this.filterObj = {
      //     fromDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd'),
      //     toDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd')
      //   };
      // }
      this.scrapeDeliveryApi.exportToExcelScrapeDeliveryReports(this.filterObj).subscribe(res => {
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
          link.download = 'scrape_delivery_reports';
          link.click();
          this.spinner.hide();
        });
      });
    } else {
      this.notifyService.showWarning('Please select received dates.');
    }
  }

  showSummaryOfReports(args: any) {
    const takeVal = this.getReportsFrom.get('receivedDates').value;
    if (takeVal && takeVal.length > 0) {
      this.spinner.show();
      this.filterObj = {
        fromDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd'),
        toDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd')
      };
      // if (navigator.userAgent.indexOf('Firefox') !== -1) {
      //   this.filterObj = {
      //     fromDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd'),
      //     toDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd')
      //   };
      // } else {
      //   this.filterObj = {
      //     fromDate: this.datepipe.transform(takeVal[0], 'yyyy-MM-dd'),
      //     toDate: this.datepipe.transform(takeVal[1], 'yyyy-MM-dd')
      //   };
      // }
      console.log('2', this.filterObj);
      this.scrapeDeliveryApi.showSummaryForScrapeDeliveryReports(this.filterObj).subscribe(res => {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 1500);
        });
        promise.then((value: any) => {
          const ref = this.dialogService.open(ShowSmmaryComponent, {
            header: 'Show Summary',
            data: {
              showSummaryDetails: res
            },
            closeOnEscape: true,
            width: '30%',
            baseZIndex: 8000,
            styleClass: 'displayChildSourceDialogStyle'
          });
          ref.onClose.subscribe(() => { });
          this.spinner.hide();
        });
      });
    } else {
      this.notifyService.showWarning('Please select received dates.');
    }
  }

  customSortForNewScrapeTable(event: SortEvent) {
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

  customSortForScrapeExecutionTable(event: SortEvent) {
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
