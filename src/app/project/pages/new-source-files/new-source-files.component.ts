import { Component, OnInit } from '@angular/core';
import { NotificationService, AuthenticationService } from '../../services';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SourcesStatusApi, NewSourcefilesApi } from '../../api';
import { DatePipe } from '@angular/common';
import { NgxFileDropEntry, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { NewSourceFileRequest } from '../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from 'primeng/dynamicdialog';
import { DragDropErrorsComponent } from '../other/drag-drop-errors/drag-drop-errors.component';

@Component({
  selector: 'app-new-source-files',
  templateUrl: './new-source-files.component.html',
  styleUrls: ['./new-source-files.component.scss'],
  entryComponents: [DragDropErrorsComponent]
})
export class NewSourceFilesComponent implements OnInit {

  newSourceFilesForm: FormGroup;
  addRowsForm: FormGroup;
  newSourceFilesArr: FormArray;
  sourceProvidersDropdown: { label: string; value: string; }[];
  stateNames: any;
  systemDate = new Date();
  files: NgxFileDropEntry[] = [];
  selectedsourceProvider: any;
  sourceList: any = [];
  UserId: any;
  testData: any;
  newSourceFileRequestObj: NewSourceFileRequest;
  submitted = false;
  btnLoader: boolean = false;
  valueChangeInFormArray: boolean;
  showAddSourceMessage: any;
  valuesInRowIndex: any = [];
  valuesNotInRowIndex: any = [];
  selectedState: any;
  fileNames: any = [];
  getHighestIndex: any = [];
  allSourceName: any;
  maxDate: Date;
  countOfSourceName: number = 0;

  constructor(
    private notifyService: NotificationService,
    private fb: FormBuilder,
    private sourcesStatusApi: SourcesStatusApi,
    private newSourcefilesApi: NewSourcefilesApi,
    private authenticationService: AuthenticationService,
    public datepipe: DatePipe,
    private spinner: NgxSpinnerService,
    public dialogService: DialogService,
  ) {
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.newSourceFileRequestObj = new NewSourceFileRequest();
  }

  ngOnInit(): void {
    this.UserId = this.authenticationService.IsUserId();
    this.sourceProvidersDropdown = [
      { label: 'BC', value: 'BC' },
      { label: 'Cathy', value: 'Cathy' },
      { label: 'ROB', value: 'ROB' }
    ];
    this.selectedsourceProvider = this.sourceProvidersDropdown[0];
    this.spinner.show();
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
    promise.then((value) => {
      this.getAllStateNameList();
      this.allActiveSourceNames();
      this.spinner.hide();
    });
    this.newSourceFilesForm = this.fb.group({
      newSourceFilesArr: this.fb.array([this.newSourceFilesControlsValidation()])
    });
    this.addRowsForm = this.fb.group({
      rowNumber: [null]
    });
  }

  get f() { return this.newSourceFilesForm.controls; }
  get t() { return this.f.newSourceFilesArr as FormArray; }

  getAllStateNameList(): void {
    this.sourcesStatusApi.getAllStateName().subscribe(stateNameRes => {
      if (stateNameRes && stateNameRes.flag === 1) {
        stateNameRes.data.map((stateData) => {
          stateData.label = stateData.stateAbbreviation;
          stateData.value = stateData.stateId;
        });
        stateNameRes.data.unshift({ label: 'Select', value: null });
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

  newSourceFilesControlsValidation() {
    return this.fb.group({
      stateId: [''],
      sourceNameOptions: [''],
      sourceId: [''],
      date: [''],
      provider: [''],
      note: [''],
      flag: [''],
      message: ['']
    });
  }

  addNewRows(valueFromInput, event) {
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
            this.notifyService.showSuccess(valueFromInput + ' ' + 'row(s) added successfully.');
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

  addNewSource() {
    this.newSourceFilesArr = this.newSourceFilesForm.get('newSourceFilesArr') as FormArray;
    this.newSourceFilesArr.push(this.newSourceFilesControlsValidation());
  }

  removeSource(i) {
    this.countOfSourceName = (this.countOfSourceName > 0 ? this.countOfSourceName - 1 : this.countOfSourceName);
    const remove = this.newSourceFilesForm.get('newSourceFilesArr') as FormArray;
    remove.removeAt(i);
  }

  clearRowsNumber() {
    this.addRowsForm.reset();
  }

  clearAddSourceFiles() {
    const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
    newSourceFilesArr.controls = [];
    this.countOfSourceName = 0;
    this.addNewSource();
  }

  changeStateForShowLoader(stateId: any, i: any) {
    if (stateId !== null) {
      this.testData = this.allSourceName.filter(id => id.stateId === stateId);
      this.testData.map((sourceData) => {
        sourceData.label = sourceData.sourceName;
        sourceData.value = sourceData.sourceId;
      });
      const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
      newSourceFilesArr['controls'][i]['controls']['sourceNameOptions'].setValue(this.testData);
      this.setValidationError(i);
    } else {
      this.clearValidation();
    }
  }

  onChangeSourceName(sourceNameId: any, i: any) {
    if (sourceNameId > 0) {
      this.countOfSourceName = this.countOfSourceName + 1;
    } else {
      this.countOfSourceName = 0;
    }
  }

  private setValidationError(i: any) {
    const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
    const sourceNameControl = newSourceFilesArr['controls'][i]['controls']['sourceId'];
    sourceNameControl.setValidators([Validators.required]);
    sourceNameControl.updateValueAndValidity();
    const dateControl = newSourceFilesArr['controls'][i]['controls']['date'];
    dateControl.setValidators([Validators.required]);
    dateControl.updateValueAndValidity();
    const providerControl = newSourceFilesArr['controls'][i]['controls']['provider'];
    providerControl.setValidators([Validators.required]);
    providerControl.updateValueAndValidity();
    const noteControl = newSourceFilesArr['controls'][i]['controls']['note'];
    noteControl.setValidators([Validators.required]);
    noteControl.updateValueAndValidity();
  }

  private clearValidation() {
    this.submitted = false;
    this.t.clear();
    this.addNewSource();
  }

  onSubmitNewSourceFilesForm() {
    this.submitted = true;
    if (this.newSourceFilesForm.invalid) {
      return;
    } else {
      this.btnLoader = false;
      if (this.newSourceFilesForm.controls.newSourceFilesArr.value && this.newSourceFilesForm.controls.newSourceFilesArr.value.length > 0) {
        this.newSourceFilesForm.controls.newSourceFilesArr.value.forEach((element, i) => {
          const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
          if ((newSourceFilesArr['controls'][i]['controls']['stateId'].value !== '' &&
            newSourceFilesArr['controls'][i]['controls']['stateId'].value !== null) &&
            (newSourceFilesArr['controls'][i]['controls']['sourceId'].value !== '' &&
              newSourceFilesArr['controls'][i]['controls']['sourceId'].value !== null) &&
            (newSourceFilesArr['controls'][i]['controls']['date'].value !== '' &&
              newSourceFilesArr['controls'][i]['controls']['date'].value !== null) &&
            (newSourceFilesArr['controls'][i]['controls']['provider'].value !== '' &&
              newSourceFilesArr['controls'][i]['controls']['provider'].value !== null) &&
            (newSourceFilesArr['controls'][i]['controls']['note'].value !== '' &&
              newSourceFilesArr['controls'][i]['controls']['note'].value !== null)) {
            this.valuesInRowIndex.push(element);
          }
        });

        this.btnLoader = true;
        if (this.valuesInRowIndex && this.valuesInRowIndex.length > 0) {
          this.valuesInRowIndex.forEach(element => {
            element.source = element.sourceNameOptions.filter(data => data.sourceId === element.sourceId)[0].label;
            element.provider = element.provider.label;
            element.loggedInUserId = this.UserId;
            element.note = element.note;
            delete element.flag;
            delete element.message;
            delete element.sourceNameOptions;
          });

          this.newSourceFileRequestObj = this.valuesInRowIndex;
          this.newSourcefilesApi.insertMultipleSourceFiles(this.newSourceFileRequestObj).subscribe(res => {
            if (res && res.flag === 1) {
              setTimeout(() => {
                this.submitted = false;
                this.btnLoader = false;
                const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
                newSourceFilesArr.controls = [];
                this.valuesInRowIndex = []; this.newSourceFileRequestObj = null; // blank fill row array after submit
                this.addNewSource();
                this.notifyService.showSuccess(res.message);
              }, 1000);
            } else {
              this.btnLoader = false;
              this.notifyService.showWarning(res.message);
            }
          }, error => {
            console.log(error);
          });
        } else {
          this.notifyService.showWarning('Please fill up atleast one row.');
          this.btnLoader = false;
          return;
        }
      }
    }
  }

  dropped(files: NgxFileDropEntry[]) {
    this.spinner.show();
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        if (fileEntry.name.split('.').pop() === 'rar') {
          this.fileNames.push(droppedFile.relativePath);
        }
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
    if (this.fileNames && this.fileNames.length > 0) {
      this.newSourcefilesApi.dragAndDropFiles(this.fileNames).subscribe(res => {
        if (res && res.flag === 1) {
          this.setFileResInSourceFileForm(res.data);
          this.fileNames = [];
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this.notifyService.showError(res.message);
        }
      }, error => {
        console.log(error);
      });
    } else {
      this.spinner.hide();
      this.notifyService.showWarning('Please add only RAR files.');
    }
  }

  setFileResInSourceFileForm(filesRes) {
    this.countOfSourceName = filesRes.filter(sId => sId.sourceId !== null).length;
    const errorMessageArr = [];
    filesRes.forEach((fileResData) => {
      if (fileResData.flag === true && fileResData.message === '') { // if file has data
        const control = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
        const arrLength = this.newSourceFilesForm.controls.newSourceFilesArr.value.length;
        this.dropDataInNewSourceFile(fileResData.stateId, arrLength);
        control.push(
          this.fb.group({
            stateId: [fileResData.stateId],
            sourceNameOptions: [''],
            sourceId: [fileResData.sourceId],
            date: [fileResData.dateReceived],
            provider: [fileResData.provider],
            note: [fileResData.note],
            flag: [fileResData.flag],
            message: [fileResData.message]
          })
        );
      } else if (fileResData.flag === false && fileResData.message !== null) { // if error
        errorMessageArr.push(fileResData.message);
      } else if (fileResData.flag === true && fileResData.message !== null) { // if warning
        const control = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
        const arrLength = this.newSourceFilesForm.controls.newSourceFilesArr.value.length;
        this.dropDataInNewSourceFile(fileResData.stateId, arrLength);
        control.push(
          this.fb.group({
            stateId: [fileResData.stateId],
            sourceNameOptions: [''],
            sourceId: [fileResData.sourceId],
            date: [fileResData.dateReceived],
            provider: [fileResData.provider],
            note: [fileResData.note],
            flag: [fileResData.flag],
            message: [fileResData.message]
          })
        );
      }
    });
    if (errorMessageArr && errorMessageArr.length > 0) {
      const ref = this.dialogService.open(DragDropErrorsComponent, {
        header: 'Errors',
        data: { draganddroperrorMesageData: errorMessageArr },
        width: '43%',
        styleClass: 'dragdropErrorsDialogStyle',
        closeOnEscape: true,
        baseZIndex: 9000,
      });
      ref.onClose.subscribe(() => {
      });
    }
  }

  dropDataInNewSourceFile(stateId, arrLength) {
    if (stateId !== null) {
      setTimeout(() => {
        this.testData = this.allSourceName.filter(id => id.stateId === stateId);
        this.testData.map((sourceData) => {
          sourceData.label = sourceData.sourceName;
          sourceData.value = sourceData.sourceId;
        });
        const newSourceFilesArr = this.newSourceFilesForm.controls.newSourceFilesArr as FormArray;
        newSourceFilesArr['controls'][arrLength]['controls']['sourceNameOptions'].setValue(this.testData);
      }, 200);
    }
  }
}
