import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusRoute } from 'src/app/models/data/bus-route';
import { BoardingPointEditModel } from 'src/app/models/viewmodels/edit/boarding-point-edit-model';
import { BusRouteEditModel } from 'src/app/models/viewmodels/edit/bus-route-edit-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BusRouteService } from 'src/app/services/data/bus-route.service';

@Component({
  selector: 'app-bus-route-edit',
  templateUrl: './bus-route-edit.component.html',
  styleUrls: ['./bus-route-edit.component.css']
})
export class BusRouteEditComponent implements OnInit {
  data!:BusRoute;
  pointNames:string[] = [];
  //model data
  busRoute:BusRouteEditModel = {
    busRouteId:undefined,
    from:'',
    to:'',
    boardingPoints:[]
  };
  //form
  editForm: FormGroup= new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    boardingPoints: new FormArray([])
  });
  constructor(
    private busRouteService:BusRouteService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
  ) { }
  //properties
  get boardingPoints(){
    return this.editForm.controls["boardingPoints"] as FormArray;
  }
  //methods
  addBoardingPointWithValue(data:BoardingPointEditModel){
    this.boardingPoints.push(new FormGroup({
      boardingPointId: new FormControl(data.boardingPointId),
      pointName: new FormControl(data.pointName, Validators.required),
      address:new FormControl(data.address)
    }));
  }
//handlers
addBoardingPoint(){
  this.boardingPoints.push(new FormGroup({
    boardingPointId: new FormControl(0),
    pointName: new FormControl('', Validators.required),
    address:new FormControl('')
  }));
}
removeBoardingPoint(index:number){
  this.boardingPoints.removeAt(index);
}
save(){
  if(this.editForm.invalid) return;
   console.log(this.editForm.value);
   let editData:BusRouteEditModel = {
     busRouteId:this.busRoute.busRouteId,
     from:'',
     to:'',
     boardingPoints: []
   };
   Object.assign(editData, this.editForm.value);
   console.log(editData);
   this.busRouteService.updateWithPoints(editData)
   .subscribe({
     next: r=>{
       this.notifyService.success("Data saved successfully", "DISMISS");
       this.editForm.markAsPristine();
       this.editForm.markAsUntouched();
     }
   })

}
//lifecycle
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params["id"];
    this.busRouteService
    .getWithPointsById(id)
    .subscribe({
      next:r=> {
        this.data= r;
        Object.assign(this.busRoute, this.data);
        
        this.editForm.controls["from"].patchValue(this.busRoute.from);
        this.editForm.controls["to"].patchValue(this.busRoute.to);
        this.busRoute.boardingPoints.forEach(b=>{
          this.addBoardingPointWithValue(b);
        });
        console.log(this.editForm.value);
      },
      error:err=>{
        this.notifyService.fail('Failed to bous route data', 'DISMISS');
      }
    });
    this.busRouteService.getBordingPoints()
    .subscribe({
      next:r=>{
        this.pointNames = r;
        console.log(this.pointNames);
      },
      error: err=>{
        this.notifyService.fail("Failed to load boarding points", "DISMISS");
      }
    });
  }

}
