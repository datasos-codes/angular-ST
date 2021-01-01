import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SourcesStatusApi } from '../../../api';
import { NotificationService } from '../../../services';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AddNewSourceRequest } from '../../../models';
import { NgxSpinnerService } from 'ngx-spinner';

// view-information-dialog
@Component({
  templateUrl: './view-state-sources-dialog.html',
})
export class ViewStateSourcesDialogComponent implements OnInit {
  stateSourcesData: any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  ngOnInit() {
    this.stateSourcesData = this.config.data.sourceListResData;
  }
}

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.scss'],
  providers: [DialogService],
})
export class AddSourceComponent implements OnInit {
  addSourceForm: FormGroup;
  sourcesArr: FormArray;
  submitted = false;
  updateFrequencys: any = [];
  sourceTypes: any = [];
  UpdateTypes: any = [];
  ProcessAts: any = [];
  statusData: any = [];
  stateNames: SelectItem[];
  ownerNames: any = [];
  selectedState: any;
  nextSourceNo: any;
  addRowsForm: FormGroup;
  getReportsFrom: FormGroup;
  btnLoader: boolean = false;
  addSourceRequest: AddNewSourceRequest;
  err: string;
  tabSeparatedObj: any = [];
  defaultFrequency: any;
  defaultSourceType: any;
  defaultUpdateType: any;
  bindOwnerName: any;
  reservedStateSourcesArry: { sNo: string; sName: string; }[];
  fTest: any[] = [];
  takeMaxVal: number;
  lastSelectedLength: any = 0;
  selectedStateId: any;
  changeStateIndex: any;
  stateChanged: boolean = false;
  addTabseparetedData: boolean = false;
  addSingleRow: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogService: DialogService,
    private sourcesStatusApi: SourcesStatusApi,
    private notifyService: NotificationService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.addSourceRequest = new AddNewSourceRequest();
  }

  ngOnInit() {
    this.addSourceForm = this.fb.group({
      sourcesArr: this.fb.array([this.createNewSource()])
    });
    this.addRowsForm = this.fb.group({
      rowNumber: [null]
    });
    this.getReportsFrom = this.fb.group({
      tabSeparatedData: [null]
    });
    this.getAllStateNameList();
    this.getAllOwnersList();
    this.staticDropDowns();
  }

  get f() { return this.addSourceForm.controls; }
  get t() { return this.f.sourcesArr as FormArray; }

  private staticDropDowns() {
    this.reservedStateSourcesArry = [
      { sNo: '0', sName: 'Sex Offender' },
      { sNo: '2', sName: 'Dept of Corrections' },
      { sNo: '4', sName: 'Admin Office of Courts' },
      { sNo: '50', sName: 'P.R.I.O.R.S.' },
      { sNo: '99', sName: 'Additional Priors Data' },
    ];

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
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 }
    ];

    this.defaultFrequency = this.updateFrequencys[2].value;
    this.defaultSourceType = this.sourceTypes[4].value;
    this.defaultUpdateType = this.UpdateTypes[0].value;
  }

  getAllStateNameList(): void {
    this.spinner.show();
    this.sourcesStatusApi.getAllStateName().subscribe(stateNameRes => {
      if (stateNameRes && stateNameRes.flag === 1) {
        if (stateNameRes.data.length > 0) {
          stateNameRes.data.map((stateData) => {
            stateData.label = stateData.stateAbbreviation;
            stateData.value = stateData.stateId;
          });
          if (stateNameRes.data[0].value === undefined) {
            stateNameRes.data.shift();
          }
          this.stateNames = stateNameRes.data;
          this.getSelectedStateIdOrSourceNumber();
          setTimeout(() => {
            this.spinner.hide();
          }, 2000);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getSelectedStateIdOrSourceNumber() {
    const obj = {
      stateId: this.stateNames[0]['stateId'],
      nextSourceNo: this.stateNames[0]['nextSourceNo'],
      value: { stateId: this.stateNames[0]['stateId'], sourceNo: this.stateNames[0]['nextSourceNo'] }
    };
    this.fTest.push(obj);
    const newSourceFilesArr = this.addSourceForm.controls.sourcesArr as FormArray;
    newSourceFilesArr['controls'][this.lastSelectedLength]['controls']['sourceNo'].setValue(this.stateNames[0]['nextSourceNo']);
    this.selectedStateId = this.stateNames[0].value;
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
          this.bindOwnerName = this.ownerNames.filter(dso => dso.defaultSourceOwner === true)[0]['value'];
        }
      }
    }, error => {
      console.log(error);
    });
  }

  addNewSource() {
    this.sourcesArr = this.addSourceForm.get('sourcesArr') as FormArray;
    this.sourcesArr.push(this.createNewSource());
    this.autoIncrementSourceNoByPlusIcon();
  }

  createNewSource() {
    return this.fb.group({
      stateId: ['', Validators.required],
      sourceName: ['', Validators.compose([Validators.required,
      Validators.pattern('^[a-z|A-Z_-]+(?: [a-z|A-Z_-]+)*$')])],
      sourceNo: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]*$')])],
      updateFrequencyId: ['', Validators.required],
      ownerId: [''],
      sourceTypeId: ['', Validators.required],
      updateType: ['', Validators.required],
      active: [''],
      processedAt: [''],
      hasPhotos: [false],
      photoPath: [''],
    });
  }

  autoIncrementSourceNoByPlusIcon() {
    this.addSingleRow = true;
    this.addTabseparetedData = false;
    this.stateChanged = false;
    const changeStateArr = [];
    const changeStateObj = {
      nextSourceNo: this.stateNames[0]['nextSourceNo'],
      stateId: this.stateNames[0]['stateId'],
    };
    changeStateArr.push(changeStateObj);
    this.setSourceDetailInAddsourceForm(changeStateArr);
  }

  bindSourceNumberBySourceID(index: number, userDataObj: any) {
    this.stateChanged = true;
    this.addTabseparetedData = false;
    this.addSingleRow = false;
    this.changeStateIndex = index;
    const changeStateArr = [];
    const changeStateObj = {
      nextSourceNo: this.stateNames.filter(id => id['stateId'] === userDataObj.stateId.value)[0]["nextSourceNo"],
      sourceName: userDataObj.sourceName.value,
      stateId: userDataObj.stateId.value
    };
    changeStateArr.push(changeStateObj);
    this.setSourceDetailInAddsourceForm(changeStateArr);
  }

  addTabSeparatedData(tsdValue: any, event: any): void {
    if (tsdValue && tsdValue !== null) {
      const stringArray = tsdValue.trim().split(/[\r\n]+/);
      this.addTabseparetedData = true;
      this.stateChanged = false;
      this.addSingleRow = false;
      for (const line of stringArray) {
        if (line !== null && line !== '') {
          const ABR = line.substring(0, 2);
          const SN = line.replace(ABR, '').trim();
          const obj = {
            stateId: this.stateNames.filter(l => l.label === ABR)[0]['stateId'],
            sourceName: SN,
            nextSourceNo: this.stateNames.filter(l => l.label === ABR)[0]['nextSourceNo']
          };
          this.tabSeparatedObj.push(obj);
        }
      }
      if (this.tabSeparatedObj && this.tabSeparatedObj.length > 0) {
        this.setSourceDetailInAddsourceForm(this.tabSeparatedObj);
        this.notifyService.showSuccess(this.tabSeparatedObj.length + ' Row(s) added successfully.');
        this.clearTabSeparatedData();
      }
    } else {
      this.notifyService.showWarning('Please enter tab separated source information.');
    }
    event.preventDefault();
  }

  setSourceDetailInAddsourceForm(sourceDetailsRes: any) {
    this.autoIncrementSourceNumberByTabSeparatedData(sourceDetailsRes);
    const control = this.addSourceForm.controls.sourcesArr as FormArray;
    sourceDetailsRes.forEach((sourceDetailsData, i) => {
      this.manageControlsForAddSource(control, sourceDetailsData);
    });
  }

  private autoIncrementSourceNumberByTabSeparatedData(sourceDetailsRes: any) {
    if (sourceDetailsRes && sourceDetailsRes.length > 0) {
      for (const val of sourceDetailsRes) {
        const obj = {
          stateId: val.stateId,
          nextSourceNo: val.nextSourceNo,
          value: null
        };
        if (this.fTest !== null && this.fTest.map(d => d.value.stateId).includes(val.stateId)) {
          this.takeMaxVal = Math.max(...this.fTest.filter(d => d.value.stateId === val.stateId).map(v => v.value.sourceNo));
          obj.value = { stateId: obj.stateId, sourceNo: this.takeMaxVal + 1 };
          if (this.stateChanged === true) {
            const newSourceFilesArr = this.addSourceForm.controls.sourcesArr as FormArray;
            newSourceFilesArr['controls'][this.changeStateIndex]['controls']['sourceNo'].setValue(obj.value.sourceNo);
            this.fTest[this.changeStateIndex] = obj;
          } else {
            this.fTest.push(obj);
          }
        } else {
          if (this.stateChanged === true) {
            const newSourceFilesArr = this.addSourceForm.controls.sourcesArr as FormArray;
            newSourceFilesArr['controls'][this.changeStateIndex]['controls']['sourceNo'].setValue(obj.nextSourceNo);
            this.fTest[this.changeStateIndex].value.stateId = obj.stateId;
            this.fTest[this.changeStateIndex].value.sourceNo = obj.nextSourceNo;
          } else {
            obj.value = { stateId: obj.stateId, sourceNo: obj.nextSourceNo };
            this.fTest.push(obj);
          }
        }
      }
    }
  }

  private manageControlsForAddSource(control: FormArray, sourceDetailsData: any) {
    if (this.fTest && this.fTest.length > 0) {
      const newArr = this.addSourceForm.get('sourcesArr') as FormArray;
      if (this.addTabseparetedData === true) {
        for (var i = newArr.value.length - 1; i >= 0; i--) {
          if (newArr['controls'][i]['controls']['sourceName'].value === '') {
            newArr.removeAt(i);
            this.fTest.splice(i, 1);
          }
        }
        control.push(
          this.fb.group({
            stateId: [this.fTest[newArr.length]['value']['stateId'], Validators.required],
            sourceName: [sourceDetailsData.sourceName, Validators.compose([Validators.required,
            Validators.pattern('^[a-z|A-Z_-]+(?: [a-z|A-Z_-]+)*$')])],
            sourceNo: [this.fTest[newArr.length]['value']['sourceNo'],
            Validators.compose([
              Validators.required,
              Validators.pattern('^[1-9][0-9]*$')]
            )],
            updateFrequencyId: ['', Validators.required],
            ownerId: [this.bindOwnerName],
            sourceTypeId: ['', Validators.required],
            updateType: ['', Validators.required],
            active: [this.statusData[0].value],
            processedAt: [this.ProcessAts[1].value],
            hasPhotos: [false],
            photoPath: [''],
          })
        );
      } else if (this.addSingleRow === true) {
        const newSourceFilesArr = this.addSourceForm.controls.sourcesArr as FormArray;
        newSourceFilesArr['controls'][newArr.length - 1]['controls']['sourceNo'].
          setValue(this.fTest[newArr.length - 1]['value']['sourceNo']);
      }
    }
  }

  removeSource(i: number, deleteSourceObj: any) {
    const remove = this.addSourceForm.get('sourcesArr') as FormArray;
    remove.removeAt(i);
    const newObj = this.fTest.filter(data =>
      (data.value.stateId === deleteSourceObj.stateId.value && data.value.sourceNo === deleteSourceObj.sourceNo.value))[0];
    const index = this.fTest.indexOf(newObj);
    this.fTest.splice(index, 1);
    this.lastSelectedLength = this.lastSelectedLength - 1;
  }

  viewStateSources(e: any, stateValue: any) {
    this.sourcesStatusApi.getSourceListByStateId(stateValue.stateId.value).subscribe(sourceListRes => {
      if (sourceListRes && sourceListRes.flag === 1) {
        const ref = this.dialogService.open(ViewStateSourcesDialogComponent, {
          header: 'Existing State Sources',
          data: { sourceListResData: sourceListRes.data },
          width: '50%',
          styleClass: 'viewSourceDialogStyle',
          closeOnEscape: true,
          baseZIndex: 8000,
        });
        ref.onClose.subscribe(() => {
        });
      }
    }, error => {
      console.log(error);
    });
    e.preventDefault();
  }

  isPhotoPathValidation(event: any, i: any) {
    if (event.target.checked === true) {
      const newSourcesArr = this.addSourceForm.controls.sourcesArr as FormArray; // validation on change
      const photoPathControl = newSourcesArr['controls'][i]['controls']['photoPath'];
      photoPathControl.setValidators([Validators.required]);
      photoPathControl.updateValueAndValidity();
    } else {
      const newSourcesArr = this.addSourceForm.controls.sourcesArr as FormArray; // validation on change
      const photoPathControl = newSourcesArr['controls'][i]['controls']['photoPath'];
      photoPathControl.clearValidators();
      photoPathControl.updateValueAndValidity();
    }
  }

  onSubmitAddSourceForm() {
    this.submitted = true;
    if (this.addSourceForm.invalid) {
      this.btnLoader = false;
      return;
    } else {
      this.btnLoader = true;
      if (this.addSourceForm.controls.sourcesArr.value && this.addSourceForm.controls.sourcesArr.value.length > 0) {
        this.addSourceForm.controls.sourcesArr.value.forEach((sourceData, i) => {
          sourceData.sourceNo = parseInt(sourceData.sourceNo, 10);
          sourceData.stateId = sourceData.stateId;
          sourceData.processedAt = this.ProcessAts[1].value;
          sourceData.active = this.statusData[0].value;
          sourceData.ownerId = this.bindOwnerName;
          sourceData.updateFrequency = this.updateFrequencys.filter(d => d.value === sourceData.updateFrequencyId)[0].label;
          if (sourceData.hasPhotos === false) {
            sourceData.photoPath = '';
          }
        });
      }
      this.addSourceRequest = this.addSourceForm.controls.sourcesArr.value;
      this.sourcesStatusApi.insertMultipleSources(this.addSourceRequest).subscribe(res => {
        if (res && res.flag === 1) {
          setTimeout(() => {
            this.btnLoader = false;
            this.router.navigate(['/sources/list']);
            this.notifyService.showSuccess(res['message']);
          }, 1000);
        } else {
          this.btnLoader = false;
          this.notifyService.showError(res['message']);
        }
      }, error => {
        console.log(error);
      });
    }
  }

  clearAddSourceInformation() {
    this.submitted = false;
    this.t.clear();
    this.fTest = [];
    this.lastSelectedLength = 0;
    this.sourcesArr = this.addSourceForm.get('sourcesArr') as FormArray;
    this.sourcesArr.push(this.createNewSource());
    this.getSelectedStateIdOrSourceNumber();
  }

  clearRowsNumber() {
    this.addRowsForm.reset();
  }

  clearTabSeparatedData(): void {
    this.tabSeparatedObj = [];
    this.getReportsFrom.reset();
  }

  addNewRows(valueFromInput: any, event: any) {
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value) => {
      // Promise returns after 1.5 second!
      const numbers = /^[0-9]+$/;
      if (valueFromInput) {
        if (valueFromInput.match(numbers)) {
          if (valueFromInput === '0' || valueFromInput === '00') {
            this.notifyService.showError('Please enter number greater than 0.');
          } else {
            for (let i = 0; i < valueFromInput; i++) {
              this.addNewSource();
            }
            this.notifyService.showSuccess(valueFromInput + ' ' + 'Row(s) added successully.');
          }
        } else if (valueFromInput.includes('-')) {
          this.notifyService.showError('Please enter number greater than 0.');
          this.addRowsForm.reset();
          this.spinner.hide();
        } else {
          this.notifyService.showError('Please input numeric characters only.');
        }
        this.addRowsForm.reset();
        this.spinner.hide();
      } else {
        this.notifyService.showError('Please input numeric characters only.');
        this.addRowsForm.reset();
        this.spinner.hide();
      }
    });
    event.preventDefault();
  }
}
