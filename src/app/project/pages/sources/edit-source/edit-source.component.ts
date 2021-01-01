import { NotificationService } from './../../../services/notification.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { SourcesStatusApi } from '../../../api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UpdateParentSourceRequest } from './../../../models';

@Component({
  selector: 'app-edit-source',
  templateUrl: './edit-source.component.html',
  styleUrls: ['./edit-source.component.scss']
})
export class EditSourceComponent implements OnInit {

  editParentSourceForm: FormGroup;
  submitted = false;
  updateFrequencys: { label: string; value: number; }[];
  sourceTypes: { label: string; value: number; }[];
  UpdateTypes: { label: string; value: string; }[];
  ProcessAts: { label: string; value: string; }[];
  statusData: { label: string; value: string; }[];
  ownerNames: any = [];
  editParentSource: UpdateParentSourceRequest;
  parentSourceDetails: any;
  currentSourceId: number;

  constructor(
    private sourcesStatusApi: SourcesStatusApi,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notifyService: NotificationService

  ) {
    this.editParentSource = new UpdateParentSourceRequest();
  }

  ngOnInit(): void {
    this.staticDropDowns();
    this.getAllOwnersList();
    this.editParentSourceValidationControls();
    this.displayParentSourceDetails();
  }

  displayParentSourceDetails() {
    this.parentSourceDetails = this.config.data.editParentSource;
    if (this.parentSourceDetails && this.parentSourceDetails.data !== undefined) {
      this.editParentSource = this.parentSourceDetails.data;
      this.currentSourceId = this.editParentSource.sourceId;
    }
  }

  private editParentSourceValidationControls() {
    this.editParentSourceForm = this.formBuilder.group({
      sourceName: ['', Validators.compose([Validators.required,
      Validators.pattern('^[a-z|A-Z_-]+(?: [a-z|A-Z_-]+)*$')])],
      sourceNo: [''],
      dbSourceNO: [''],
      ownerId: ['', Validators.required],
      publicStatusCommnent: ['', Validators.required],
      frequencyId: ['', Validators.required],
      sourceTypeId: ['', Validators.required],
      updateType: ['', Validators.required],
      processedAt: ['', Validators.required],
      isActive: ['', Validators.required],
      hasPhoto: [''],
      photoPath: [''],
      description: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get editParentControls() { return this.editParentSourceForm.controls; }

  checkValue(event: any) {
    if (event.target.checked) {
      this.editParentSourceForm.get('photoPath').setValidators(Validators.required);
      this.editParentSourceForm.get('photoPath').updateValueAndValidity();
    } else {
      this.editParentSourceForm.get('photoPath').clearValidators();
      this.editParentSourceForm.get('photoPath').updateValueAndValidity();
    }
  }

  onSubmitEditParentSourceDetails() {
    this.submitted = true;
    if (this.editParentSourceForm.invalid) {
      return;
    } else {
      this.editParentSource = this.editParentSourceForm.value;
      this.editParentSource.sourceId = this.currentSourceId;
      this.editParentSource.updateFrequency = this.updateFrequencys.
        filter(val => val.value === this.editParentSourceForm.value.frequencyId)[0].label;
      if (this.editParentSource.hasPhoto === false) {
        this.editParentSource.photoPath = '';
      }
      this.sourcesStatusApi.updateParentSourcesBySourceId(this.editParentSource).subscribe(res => {
        if (res && res['flag'] === 1 && res['status'] === 'Success') {
          this.notifyService.showSuccess(res['message']);
          this.ref.close();
        }
      }, error => {
        console.log(error);
      });
    }
  }

  private staticDropDowns() {
    this.updateFrequencys = [
      { label: 'Weekly', value: 1 },
      { label: 'Bi-Weekly', value: 2 },
      { label: 'Monthly', value: 3 },
      { label: 'Bi-Monthly', value: 4 },
      { label: 'Quarterly', value: 5 },
      { label: 'Semi-Annual', value: 6 },
      { label: 'Daily', value: 7 },
      { label: 'Never', value: 8 },
    ];

    this.sourceTypes = [
      { label: 'SOR', value: 1 },
      { label: 'DOC', value: 2 },
      { label: 'DPS', value: 3 },
      { label: 'AOC', value: 4 },
      { label: 'County', value: 5 },
    ];

    this.UpdateTypes = [
      { label: 'Update', value: 'Update' },
      { label: 'Full', value: 'Full' }
    ];

    this.ProcessAts = [
      { label: 'BC', value: 'BC' },
      { label: 'Chapin', value: 'Chapin' }
    ];

    this.statusData = [
      { label: 'Active', value: 'Active' },
      { label: 'InActive', value: 'InActive' }
    ];
  }

  getAllOwnersList(): void {
    this.sourcesStatusApi.getAllOwners().subscribe(ownersRes => {
      if (ownersRes && ownersRes.flag === 1) {
        if (ownersRes.data && ownersRes.data.length > 0) {
          ownersRes.data.map((ownersData) => {
            ownersData.value = ownersData.ownerId;
            ownersData.label = ownersData.ownerName;
          });
          this.ownerNames = ownersRes.data;
        }
      }
    }, error => {
      console.log(error);
    });
  }

}
