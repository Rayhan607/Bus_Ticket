import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusRouteInputModel } from 'src/app/models/viewmodels/input/bus-route-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BusRouteService } from 'src/app/services/data/bus-route.service';

@Component({
  selector: 'app-bus-route-create',
  templateUrl: './bus-route-create.component.html',
  styleUrls: ['./bus-route-create.component.css']
})
export class BusRouteCreateComponent implements OnInit {
  //model data
  busRoute:BusRouteInputModel = {
    from:'',
    to:'',
    boardingPoints:[]
  };
  pointNames:string[] = [];
  //form
  createForm: FormGroup= new FormGroup({
    from: new FormControl('', Validators.required),
    to: new FormControl('', Validators.required),
    boardingPoints: new FormArray([])
  });
  constructor(
    private busRouteService:BusRouteService,
    private notifyService:NotifyService
  ) { }
  //properties
  get boardingPoints(){
    return this.createForm.controls["boardingPoints"] as FormArray;
  }
  //handlers
 addBoardingPoint(){
    this.boardingPoints.push(new FormGroup({
      pointName: new FormControl('', Validators.required),
      address:new FormControl('')
    }));
 }
 removeBoardingPoint(index:number){
   this.boardingPoints.removeAt(index);
 }
 save(){
   if(this.createForm.invalid) return;
   console.log(this.createForm.value);
   Object.assign(this.busRoute, this.createForm.value);
   console.log(this.busRoute);
   this.busRouteService.insertWithPoints(this.busRoute)
   .subscribe({
     next: r=>{
       this.notifyService.success("Data saved", "DISMISS");
     },
     error: err=>{
       this.notifyService.fail("Failed to save data", "DISMISS");
     }
   })
 }
 //lifecycle
  ngOnInit(): void {
    this.addBoardingPoint();
    console.log(this.boardingPoints.controls.length)
    this.busRouteService.getBordingPoints()
    .subscribe({
      next:r=>{
        this.pointNames = r;
        console.log(this.pointNames);
      },
      error: err=>{
        this.notifyService.fail("Failed to load boarding points", "DISMISS");
      }
    })
    
  }

}
