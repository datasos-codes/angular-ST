import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-drag-drop-errors',
  templateUrl: './drag-drop-errors.component.html',
  styleUrls: ['./drag-drop-errors.component.scss']
})
export class DragDropErrorsComponent implements OnInit {

  errorMessageData: any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }
  ngOnInit() {
    this.errorMessageData = this.config.data.draganddroperrorMesageData;
  }

}
