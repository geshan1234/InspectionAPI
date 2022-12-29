import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/services/inspection-api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit, OnChanges {

  inspectionsList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;

  constructor(private service: InspectionApiService) { }

  @Input() inspection: any;
  id: number = 0;
  status: string = '';
  comments: string = '';
  inspectionTypeId!: number;

  ngOnChanges() {
    this.id = this.inspection.id
    this.status = this.inspection.status
    this.comments = this.inspection.comments
    this.inspectionTypeId = this.inspection.inspectionTypeId
    this.inspectionsList$ = this.service.getInspectionList()
    this.statusList$ = this.service.getStatusList()
    this.inspectionTypesList$ = this.service.getInspectionTypesList();

  }

  ngOnInit(): void {
    this.id = this.inspection.id
    this.status = this.inspection.status
    this.comments = this.inspection.comments
    this.inspectionTypeId = this.inspection.inspectionTypeId
    this.inspectionsList$ = this.service.getInspectionList()
    this.statusList$ = this.service.getStatusList()
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }

  addInspection () {
    var inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    }

    this.service.addInspection(inspection).subscribe( (res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }

      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
      }
    );
    

  }

  updateInspection() {
    var inspection = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId
    }

    this.service.updateInspection(inspection).subscribe( (res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }

      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none';
        }
      }, 4000);
      }
    );
  }

  

}
