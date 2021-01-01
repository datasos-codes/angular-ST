import { EditchildsourceComponent } from './../editchildsource/editchildsource.component';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SourcesStatusApi } from '../../../api';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DialogService } from 'primeng/dynamicdialog';
import { EditSourceComponent } from './../edit-source/edit-source.component';
import { ParentSourceResponse, ChildSourceResponse } from './../../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortEvent, MessageService } from 'primeng/api';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sources-page',
  templateUrl: './sources-page.component.html',
  styleUrls: ['./sources-page.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})

export class SourcesPageComponent implements OnInit {
  @ViewChild('sourcesPageTable') sourcesPageTable: Table;

  parentSourcesListResponse: ParentSourceResponse[];
  rowGroupMetadata: ChildSourceResponse[];
  cols: { field: string; header: string; }[];
  tempId = 0;
  updateFrequencys: { label: string; value: string; }[];
  sourceTypes: { label: string; value: string; }[];
  fileTypes: { label: string; value: string; }[];
  HasPhotos: { label: string; value: string; }[];
  statusData: { label: string; value: string; }[];
  ownerNames: any;
  stateNames: any;
  sourceListPageForm: FormGroup;
  selectedstatusData: { label: string; value: string; };
  rowGroupMetadataTest: any;
  checkIndex = 0;
  filteredValuesLength: any;

  constructor(
    private sourcesStatusApi: SourcesStatusApi,
    public dialogService: DialogService,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.staticDropDowns();
    this.getAllParentSourcesList();
    this.getAllStateNameList();
    this.getAllOwnersList();
    this.sourceListPageForm = this.fb.group({
      selectedStatus: ['']
    });
  }

  private staticDropDowns() {
    this.cols = [
      { field: '', header: '' },
      { field: 'stateAbbreviation', header: 'State' },
      { field: 'sourceName', header: 'Source Name' },
      { field: 'owner', header: 'Owner' },
      { field: 'updateFrequency', header: 'Update Frequency' },
      { field: 'fileType', header: 'File Type' },
      { field: 'sourcetype', header: 'Source Type' },
      { field: 'lastRecivedDate', header: 'Last Recived Date' },
      { field: 'hasPhoto', header: 'Has Photos?' },
      { field: 'status', header: 'Status' }
    ];

    this.updateFrequencys = [
      { label: 'Weekly', value: 'Weekly' },
      { label: 'Bi-Weekly', value: 'Bi-Weekly' },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Bi-Monthly', value: 'Bi-Monthly' },
      { label: 'Quarterly', value: 'Quarterly' },
      { label: 'Semi-Annual', value: 'Semi-Annual' },
      { label: 'Daily', value: 'Daily' },
      { label: 'Never', value: 'Never' },
    ];

    this.sourceTypes = [
      { label: 'SOR', value: 'SOR' },
      { label: 'DOC', value: 'DOC' },
      { label: 'DPS', value: 'DPS' },
      { label: 'AOC', value: 'AOC' },
      { label: 'County', value: 'County' },
    ];

    this.fileTypes = [
      { label: 'Update', value: 'Update' },
      { label: 'Full', value: 'Full' }
    ];

    this.HasPhotos = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];

    this.statusData = [
      { label: 'Active', value: 'Active' },
      { label: 'InActive', value: 'InActive' }
    ];
    this.selectedstatusData = this.statusData[0];
  }

  getAllParentSourcesList(): void {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value) => {
      // Promise returns after 1.5 second!
      this.sourcesStatusApi.getParentSourceDetails().subscribe(res => {
        if (res && res['flag'] === 1) {
          this.parentSourcesListResponse = res['data']['internalSourceInfoDto']; // parent data of sources
          this.spinner.hide();
        } else if (res && res['flag'] === 0) {
          this.spinner.hide();
          this.notifyService.showError(res['message']);
        }
      }, error => {
        console.log(error);
      });
    });
  }

  editParentSourceModal(args: any, id: number): void {
    this.sourcesStatusApi.displayParentSourcesBySourceId(id).subscribe(res => {
      if (res && res['flag'] === 1) {
        const ref = this.dialogService.open(EditSourceComponent, {
          header: 'Edit Source Information',
          data: { editParentSource: res },
          closeOnEscape: true,
          baseZIndex: 5000,
          styleClass: 'displayParentSourceDialogStyle',
          width: '43%'
        });
        ref.onClose.subscribe(() => {
          this.getAllParentSourcesList();
        });
      } else {
        this.notifyService.showError(res['message']);
      }
    }, error => {
      console.log(error);
    });
  }

  getChildSourceData(args: any, id: number, index?: number): void {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.checkIndex = index;
        this.tempId = id;
        resolve(id);
      }, 1500);
    });

    promise.then((value: any) => {
      // Promise returns after 1.5 second!
      this.sourcesStatusApi.getChildSourceDetailsBySourceId(value).subscribe(res => {
        if (res && res['flag'] === 1) {
          this.rowGroupMetadata = res.data;
          this.spinner.hide();
        }
      }, error => {
        console.log(error);
      });
    });
  }

  editChildSourceModal(args: any, id: number, isDate: any): void {
    const checkDate = this.datepipe.transform(isDate, 'yyyy-MM-dd');
    const toDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    const frDate = moment(toDate).subtract(2, 'months').format('YYYY-MM-DD');
    if (checkDate >= frDate && checkDate <= toDate) {
      if (id && id > 0 || id !== undefined) {
        this.sourcesStatusApi.displayChildSourcesBySourceUpdateId(id).subscribe(res => {
          if (res && res['flag'] === 1) {
            const ref = this.dialogService.open(EditchildsourceComponent, {
              header: res['data'].sourceName,
              data: { editChildSource: res },
              closeOnEscape: true,
              baseZIndex: 6000,
              styleClass: 'displayChildSourceDialogStyle'
            });
            ref.onClose.subscribe(() => {
              this.getAllParentSourcesList();
              this.getChildSourceData(null, this.tempId, this.checkIndex);
            });
          } else {
            this.notifyService.showError(res['message']);
          }
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.notifyService.showError('Cannot edit files older than 2 months.');
    }
  }

  getAllStateNameList(): void {
    this.sourcesStatusApi.getAllStateName().subscribe(stateNameRes => {
      if (stateNameRes && stateNameRes['flag'] === 1) {
        stateNameRes.data.map((stateData) => {
          stateData.label = stateData.stateAbbreviation;
          stateData.value = stateData.stateAbbreviation;
        });
        this.stateNames = stateNameRes.data;
      }
    }, error => {
      console.log(error);
    });
  }

  getAllOwnersList(): void {
    this.sourcesStatusApi.getAllOwners().subscribe(ownersRes => {
      if (ownersRes && ownersRes['flag'] === 1) {
        if (ownersRes.data && ownersRes.data.length > 0) {
          ownersRes.data.map((ownersData) => {
            ownersData.label = ownersData.ownerName;
            ownersData.value = ownersData.ownerName;
          });
          this.ownerNames = ownersRes.data;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  customSortForParentTable(event: SortEvent) {
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

  customSortForChildTable(event: SortEvent) {
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

  onFilter(event: any, dt: any) {
    setTimeout(() => {
      this.filteredValuesLength = event.filteredValue.length; // count of displayed rows
    }, 100);
  }

  deleteChildSourceModal(args: any, id: number, isDate?: any): void {
    this.messageService.clear('');
    const checkDate = this.datepipe.transform(isDate, 'yyyy-MM-dd');
    const toDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    const frDate = moment(toDate).subtract(2, 'months').format('YYYY-MM-DD');
    if (checkDate >= frDate && checkDate <= toDate) {
      if (id && id > 0 || id !== undefined) {
        this.messageService.add({
          key: 'deleteChildSourceKey', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed', data: id
        });
      }
    } else {
      this.notifyService.showError('Cannot delete files older than 2 months.');
    }
  }

  deleteChildSource(id: number) {
    this.sourcesStatusApi.deleteChildSourceBySourceUpdateId(id).subscribe(res => {
      if (res && res['flag'] === 1) {
        this.messageService.clear('deleteChildSourceKey');
        this.notifyService.showSuccess(res['message']);
        this.getAllParentSourcesList();
        this.getChildSourceData(null, this.tempId, this.checkIndex);
      } else {
        this.notifyService.showError(res['message']);
      }
    }, error => {
      console.log(error);
    });
  }

  onReject() {
    this.messageService.clear('deleteChildSourceKey');
  }
}
