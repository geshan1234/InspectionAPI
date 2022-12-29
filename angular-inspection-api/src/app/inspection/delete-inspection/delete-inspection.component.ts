import { style } from '@angular/animations';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { InspectionApiService } from 'src/app/services/inspection-api.service';

@Component({
  selector: 'app-delete-inspection',
  templateUrl: './delete-inspection.component.html',
  styleUrls: ['./delete-inspection.component.css']
})
export class DeleteInspectionComponent implements OnInit, OnChanges {

  constructor(private service: InspectionApiService) { }

  @Input() inspection:any;
  id!:number;

  ngOnChanges(): void {
    this.id = this.inspection.id;
  }

  ngOnInit(): void {
    // this.id = this.inspection.id;
    // this.status = this.inspection.status;
    // this.comments = this.inspection.comments;
    // this.inspectionTypeId = this.inspection.inspectionTypeId;
  }

  deleteInspection() {
    this.service.deleteInspection(this.id).subscribe( res => {
      var closeButton = document.getElementById('delete-modal-close');
      if (closeButton) {
        closeButton.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if (showDeleteSuccess) {
        showDeleteSuccess.style.display = 'block'
      }

      setTimeout(function() {
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'none'
        }
      }, 4000);

    });
  }

}
