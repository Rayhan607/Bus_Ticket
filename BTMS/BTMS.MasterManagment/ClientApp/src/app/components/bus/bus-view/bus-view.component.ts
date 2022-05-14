import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Bus } from 'src/app/models/data/bus.model';
import { BusType } from 'src/app/models/data/enums';
import { BusService } from 'src/app/services/data/bus.service';



@Component({
  selector: 'app-bus-view',
  templateUrl: './bus-view.component.html',
  styleUrls: ['./bus-view.component.css']
})
export class BusViewComponent implements OnInit {
  busTypeOptions:{label:string,value:number}[]=[];
  //model
 buses:Bus[] =[];
 //table
 dataSource:MatTableDataSource<Bus> = new MatTableDataSource(this.buses);
 @ViewChild(MatSort, {static:false}) sort!:MatSort;
 @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
 columnList=['busPlateNumber', 'busType', 'busModel','capacity','features', 'actions'];
  constructor(private busServices:BusService) { }
  getBusType(value:number){
    return BusType[value];
  }
  delete(item:Bus){
    
  }
  ngOnInit(): void {
    Object.keys(BusType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.busTypeOptions.push({ label: v, value: Number(BusType[v]) });
    });
    console.log(this.busTypeOptions);
    this.busServices.get()
    .subscribe({
      next:r=> {
        this.dataSource.data = r;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //console.log(r);
      },
      error: err=>{

      }
    });
    
  }

}
