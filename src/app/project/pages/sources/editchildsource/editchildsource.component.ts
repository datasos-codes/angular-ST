import { Component, OnInit } from '@angular/core';
import { SourcesStatusApi } from 'src/app/project/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NotificationService, AuthenticationService } from '../../../services';
import { UpdateChildSourceRequest } from './../../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editchildsource',
  templateUrl: './editchildsource.component.html',
  styleUrls: ['./editchildsource.component.scss']
})
export class EditchildsourceComponent implements OnInit {

  editChildSource: UpdateChildSourceRequest;
  editChildSourceForm: FormGroup;
  submitted = false;
  statusList: any;
  childSourceDetails: any;
  currentSourceUpdateedId: number;
  currentSourceId: number;
  userId: any;
  currentUpdateType: string;
  currentSourceName: string;
  currentUpdateNoteId: any;
  checkReceivedDate: any;

  constructor(
    private sourcesStatusApi: SourcesStatusApi,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notifyService: NotificationService,
    private authenticationService: AuthenticationService,
    public datepipe: DatePipe
  ) {
    this.editChildSource = new UpdateChildSourceRequest();
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.IsUserId();
    this.getAllStatusList();
    this.editChildSourceValidationControls();
    this.displayChildSourceDetails();
  }

  displayChildSourceDetails() {
    this.childSourceDetails = this.config.data.editChildSource;
    if (this.childSourceDetails && this.childSourceDetails.data !== undefined) {
      this.editChildSource = this.childSourceDetails.data;
      this.checkReceivedDate = this.editChildSource.receivedDate;
      this.editChildSource.TreceivedDate = this.editChildSource.receivedDate;
      this.currentUpdateNoteId = this.editChildSource.updateNoteId;
      this.currentSourceUpdateedId = this.editChildSource.sourceUpdateId;
      this.currentSourceId = this.editChildSource.sourceId;
      this.currentUpdateType = this.editChildSource.updateType;
      this.currentSourceName = this.editChildSource.sourceName;
    }
  }

  editChildSourceValidationControls(): void {
    this.editChildSourceForm = this.formBuilder.group({
      statusId: ['', Validators.required],
      TreceivedDate: ['', Validators.required],
      note: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get editChildControls() { return this.editChildSourceForm.controls; }

  getAllStatusList(): void {
    this.sourcesStatusApi.getAllStatusForChildSource().subscribe(res => {
      if (res && res.flag === 1) {
        if (res.data && res.data.length > 0) {
          res.data.map((data) => {
            data.value = data.statusId;
            data.label = data.status;
          });
          this.statusList = res.data;
        }
      }
    }, error => {
      console.log(error);
    });
  }

  onSubmitEditChildSourceDetails(): void {
    this.submitted = true;
    if (this.editChildSourceForm.invalid) {
      return;
    } else {
      this.editChildSource = this.editChildSourceForm.value;
      this.editChildSource.sourceId = this.currentSourceId;
      this.editChildSource.sourceUpdateId = this.currentSourceUpdateedId;
      this.editChildSource.updateNoteId = this.currentUpdateNoteId;
      this.editChildSource.status = this.statusList.filter(id => id.value === this.editChildSourceForm.value.statusId)[0].label;
      if (navigator.userAgent.indexOf('Firefox') !== -1) {
        if (this.checkReceivedDate !== this.editChildSourceForm.value.TreceivedDate) {
          this.editChildSource.receivedDate = this.datepipe.transform(this.editChildSourceForm.value.TreceivedDate, 'yyyy-MM-dd');
        } else {
          this.editChildSource.receivedDate = this.editChildSourceForm.value.TreceivedDate;
        }
      } else {
        this.editChildSource.receivedDate = this.datepipe.transform(this.editChildSource.TreceivedDate, 'yyyy-MM-dd');
      }
      this.editChildSource.updateType = this.currentUpdateType;
      this.editChildSource.sourceName = this.currentSourceName;
      this.editChildSource.userId = this.userId;
      this.sourcesStatusApi.updateChildSourcesBySourceUpdateId(this.editChildSource).subscribe(res => {
        if (res && res['flag'] === 1 && res['status'] === 'Success') {
          this.notifyService.showSuccess(res['message']);
          this.ref.close();
        }
      }, error => {
        console.log(error);
      });
    }
  }
}
