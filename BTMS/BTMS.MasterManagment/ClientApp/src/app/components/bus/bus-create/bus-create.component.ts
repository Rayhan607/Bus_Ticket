import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/models/data/bus.model';
import { Company } from 'src/app/models/data/company-model';
import { BusType } from 'src/app/models/data/enums';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BusService } from 'src/app/services/data/bus.service';
import { CompanyService } from 'src/app/services/data/company.service';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-bus-create',
  templateUrl: './bus-create.component.html',
  styleUrls: ['./bus-create.component.css']
})
export class BusCreateComponent implements OnInit {
  busTypeOptions:{label:string,value:number}[]=[];
  company!:Company;
  bus:Bus=
  {
    busId:undefined,
    busPlateNumber:'',
    busType:undefined,
    capacity:undefined,
    features:'',
    companyId:undefined,
    busModel:'',
    fare:undefined
  }
  createForm:FormGroup=new FormGroup({
    busPlateNumber:new FormControl('', [Validators.required, Validators.maxLength(50)]),
    busType:new FormControl('',[Validators.required]),
    capacity:new FormControl('',[Validators.required]),
    features:new  FormControl('',[Validators.required,Validators.maxLength(50)]),
   
    busModel:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    fare: new FormControl('', Validators.required)
  })
  constructor(
    private busService:BusService,
    private companyService:CompanyService,
    private notifyService: NotifyService
    ) { }
  save(){
  
    if(this.createForm.invalid) return;
    console.log(this.createForm.value)
    Object.assign(this.bus,this.createForm.value);
    this.bus.companyId = this.company.companyId;
    console.log(this.bus);
    this.busService.insert(this.bus)
    .subscribe({
      next: r=>{
        console.log(r);
        this.createForm.reset({});
        this.createForm.markAsUntouched();
        this.createForm.markAsPristine();
        this.bus= {
          busId:undefined, 
          busPlateNumber:'',
          busType:1,
          capacity:undefined,
          features:'',
          companyId:undefined,
          busModel:'',
          fare:undefined

        }
        this.notifyService.success("Data Saved", "DISMISS")
      },
      error: err=>{
        console.error(err);
        this.notifyService.fail("Failed to save data", "DISMISS");
      }
    });
  }

  ngOnInit(): void {
    Object.keys(BusType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.busTypeOptions.push({ label: v, value: Number(BusType[v]) });
    });
    this.companyService.getByKey(AppConstants.accessKey)
    .subscribe({
      next: r=> {
        this.company = r;
        console.log(this.company);
        this.bus.companyId=this.company.companyId;
      },
      error: err=>{
          this.notifyService.fail("Failed to load company info", "DISMISS");
      }
    });
  }

}
