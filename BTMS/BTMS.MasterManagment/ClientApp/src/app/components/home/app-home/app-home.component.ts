import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/data/company-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { CompanyService } from 'src/app/services/data/company.service';
import { AppConstants } from 'src/app/shared/app-constants';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
  company!:Company;
  constructor(
    private companyService:CompanyService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.companyService.getByKey(AppConstants.accessKey)
    .subscribe({
      next: r=> {
        this.company = r;
        console.log(this.company);
      },
      error: err=>{
          this.notifyService.fail("Failed to load company info", "DISMISS");
      }
    });
      

  }

}
