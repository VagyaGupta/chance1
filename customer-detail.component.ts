// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CustomerService } from '../services/customer.service';
// import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'ems-customer-detail',
//   templateUrl: './customer-detail.component.html',
//   styleUrls: ['./customer-detail.component.scss']
// })
// export class CustomerDetailComponent implements OnInit {
//   customerDetails: any;

//   constructor(
//     private readonly route: ActivatedRoute,
//     private readonly customerService: CustomerService,
//     private readonly loaderService: LoaderService,
//     private readonly toastrService: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params: any) => {
//       const customerId = params['id'];
      
//       if (customerId) {
//         this.getCustomerDetails(customerId);
//       }
//     });
//   }

//   getCustomerDetails(id: string): void {
//     this.loaderService.startLoading();
//     this.customerService.getCustomerById(id).subscribe(res => {
//       if (res) {
//         this.customerDetails = res;
//         this.loaderService.stopLoading();
//       }
//     }, error => {
//       this.loaderService.stopLoading();
//       this.toastrService.error(error?.message || 'Error fetching customer details');
//     });
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ems-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  customerId: string;
  customerData: any ;
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly customerService: CustomerService,
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id')!;
    this.getCustomerDetails();
  }

  // ngOnInit(): void {
  //        this.route.params.subscribe((params: any) => {
  //          const customerId = params['id'];
          
  //          if (customerId) {
  //            this.getCustomerDetails();
  //         }
  //       });
  //    }






  getCustomerDetails() {
    this.loaderService.startLoading();
    
    this.customerService.getCustomerById(this.customerId).subscribe(
      (res) => {
        console.log(res);
        this.customerData = res;
        this.loaderService.stopLoading();
      },
      (error) => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message || 'Error loading customer details');
      }
    );
  }
}
