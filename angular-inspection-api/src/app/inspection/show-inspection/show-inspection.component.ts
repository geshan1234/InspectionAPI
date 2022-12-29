import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/services/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit{

  constructor(private service: InspectionApiService) { }

  inspectionsList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any[] = [];

  //Map to display data associate with ForeignKeys
  inspectionTypesMap:Map<number, string> = new Map();



  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.inspectionsList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.refreshInspectionTypesMap();
  }

  //Method to raise Map from ngOnInit 
  refreshInspectionTypesMap () {
    this.service.getInspectionTypesList().subscribe( (data) => {
      this.inspectionTypesList = data;

      for(let i=0; i < data.length; i++) {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, this.inspectionTypesList[i].inspectionName);
      }
    });
  }

  // properties
  modalTitle: string = '';
  activateAddEditInspectionComponent: boolean = false;
  activateDeleteInspectionComponent:any;
  inspection = {
    id: 0,
    status:'',
    comments:'',
    inspectionTypeId: 0
  };
;
  //triggered by addInspection btn
  addModal () {
    this.inspection = {
      id:0,
      status:'',
      comments:'',
      inspectionTypeId:0
    };

    this.modalTitle = 'Add Inspection';
    this.activateAddEditInspectionComponent = true;
  }

  //triggered by updateInspection btn
  editModal (data: any) {
    this.inspection = data;
    this.modalTitle = 'Edit Inspection';
    this.activateAddEditInspectionComponent = true;
  }

  //triggered by add button in modal through close btn 
  closeAddEditModal () {

    this.activateAddEditInspectionComponent = false;
    this.inspectionsList$ = this.service.getInspectionList();
    console.log(this.inspectionsList$)

    }

    deleteModal (data: any) {
      this.inspection = data;
    }

    closeDeleteModal () {
      this.inspectionsList$ = this.service.getInspectionList();
      console.log(this.inspectionsList$)
      }

}
