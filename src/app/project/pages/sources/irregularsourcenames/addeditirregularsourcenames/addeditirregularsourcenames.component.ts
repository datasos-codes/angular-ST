import { IrregularSourcesResponse } from './../../../../models/irregularsourcesresponse';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SourcesStatusApi, NewSourcefilesApi } from '../../../../api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationService } from '../../../../services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addeditirregularsourcenames',
  templateUrl: './addeditirregularsourcenames.component.html',
  styleUrls: ['./addeditirregularsourcenames.component.scss']
})
export class AddeditirregularsourcenamesComponent implements OnInit, AfterViewInit {
  addEditIrregularSourceFrm: FormGroup;
  submitted = false;
  stateNames: any;
  allSourceName: any;
  testData: any;
  editIrregularSource: IrregularSourcesResponse;
  statusData: { label: string; value: string; }[];
  irregularSourceData: any;
  currentIrregularSourceId: number;

  constructor(
    private sourcesStatusApi: SourcesStatusApi,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notifyService: NotificationService,
    private newSourcefilesApi: NewSourcefilesApi,
    private spinner: NgxSpinnerService
  ) {
    this.editIrregularSource = new IrregularSourcesResponse();
  }

  ngOnInit(): void {
    this.addEditIrregularSourceValidationControls();
    this.allActiveSourceNames();
    this.statusData = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' }
    ];
    this.getAllStateNameList();
  }

  ngAfterViewInit(): void {
    this.displayIrregularSourceDetails();
  }

  displayIrregularSourceDetails() {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 4000);
    });
    promise.then((value) => {
      this.irregularSourceData = this.config.data;
      if (this.irregularSourceData && this.irregularSourceData !== undefined) {
        this.editIrregularSource = this.irregularSourceData;
        this.currentIrregularSourceId = this.editIrregularSource.id;
        this.bindSourceNameBasedonState(this.editIrregularSource.stateId);
      }
      this.spinner.hide();
    });
  }

  getAllStateNameList(): void {
    this.sourcesStatusApi.getAllStateName().subscribe(stateNameRes => {
      if (stateNameRes && stateNameRes.flag === 1) {
        stateNameRes.data.map((stateData) => {
          stateData.label = stateData.stateAbbreviation;
          stateData.value = stateData.stateId;
        });
        if (stateNameRes.data[0].value === undefined) {
          stateNameRes.data.shift();
        }
        this.stateNames = stateNameRes.data;
      }
    }, error => {
      console.log(error);
    });
  }

  allActiveSourceNames(): void {
    this.newSourcefilesApi.getAllActiveSourceNames().subscribe(res => {
      if (res && res.flag === 1) {
        this.allSourceName = res.data;
      }
    }, error => {
      console.log(error);
    });
  }

  bindSourceNameBasedonState(stateId: any) {
    if (stateId !== null) {
      this.testData = this.allSourceName.filter(id => id.stateId === stateId);
      this.testData.map((sourceData) => {
        sourceData.label = sourceData.sourceName;
        sourceData.value = sourceData.sourceId;
      });
    }
  }

  addEditIrregularSourceValidationControls(): void {
    this.addEditIrregularSourceFrm = this.formBuilder.group({
      stateId: ['', Validators.required],
      sourceId: ['', Validators.required],
      filePattern: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get editSourceControls() { return this.addEditIrregularSourceFrm.controls; }

  onSubmitaddEditIrregularSourceFrmDetails() {
    this.submitted = true;
    if (this.addEditIrregularSourceFrm.invalid) {
      return;
    } else {
      this.editIrregularSource = this.addEditIrregularSourceFrm.value;
      if (this.irregularSourceData && this.irregularSourceData !== undefined) {
        this.editIrregularSource.id = this.currentIrregularSourceId;
      }
      this.sourcesStatusApi.addEditIrregularSources(this.editIrregularSource).subscribe(res => {
        if (res && res['flag'] === 1) {
          this.notifyService.showSuccess(res['message']);
          this.ref.close();
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
