import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { BusRoute } from 'src/app/models/data/bus-route';
import { NotifyService } from 'src/app/services/common/notify.service';
import { BusRouteService } from 'src/app/services/data/bus-route.service';

@Component({
  selector: 'app-bus-route-view',
  templateUrl: './bus-route-view.component.html',
  styleUrls: ['./bus-route-view.component.css']
})
export class BusRouteViewComponent implements OnInit {
  busRoutes:BusRoute[] =[];
  dataSource:MatTableDataSource<BusRoute> = new MatTableDataSource(this.busRoutes);
  columnList= ["from", "to", "boardingPoints", "actions"];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;
  constructor(
    private busRouteService:BusRouteService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ) { }
  getPointNames(data:BusRoute){
    var points:string[] = [];
    data.boardingPoints.forEach((b, i)=>{
      points.push(b.pointName);
    });
    return points.join(', ');
  }
 delete(item:BusRoute){
    this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    }).afterClosed()
    .subscribe({
      next: c=> {
        if(c){
          this.busRouteService.delete(Number(item.busRouteId))
          .subscribe({
            next:r=> {
              this.dataSource.data = this.dataSource.data.filter(x=> x.busRouteId != r.busRouteId);
              this.notifyService.success("Data deleted successfully","DISMISS");
            },
            error: err=> {
              this.notifyService.fail("Failed to delete","DISMISS");
            }
          })
        }
      },
      error: err=>{
        console.log('Let it go');
      }
    })
 }
 
  ngOnInit(): void {
    this.busRouteService.getWithPoints()
    .subscribe({
      next:r=> {
        this.busRoutes=r;
        this.dataSource.data=this.busRoutes;
        this.dataSource.sort=this.sort;
        this.dataSource.paginator=this.paginator;
      },
      error: err=>{
        this.notifyService.fail("Failed to load route data", "DISMISS");
      }
    })
  }

}
