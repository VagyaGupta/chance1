
// import { Component, Input, OnInit } from '@angular/core';
//   import { BreadcrumbService } from 'xng-breadcrumb';
//   import { customerTable } from './customerTable';
//   import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
//   import { ToastrService } from 'ngx-toastr';
//   import { Router } from '@angular/router';
//   import { FormBuilder, FormGroup } from '@angular/forms';
//   import { MatDialog } from '@angular/material/dialog';
//   import { ColumnDef } from '../common-utils/components/table/table.config';
//   import { LovService } from '../services/lov.service';
// import { CustomerService } from '../services/customer.service';
  

// @Component({
//   selector: 'ems-customers',
//   templateUrl: './customers.component.html',
//   styleUrls: ['./customers.component.scss']
// })


//   export class CustomersComponent implements OnInit {
  
//       columnDefs: ColumnDef[] = [];
//       rowData: any[] = [];
//       form: FormGroup;
//       isEmployeeConfirm: boolean;
//       isEyeButtonEnabled: boolean = false;
    
//       constructor(
//         private readonly breadcrumbService: BreadcrumbService,
//         private readonly customerService: CustomerService,
//         private readonly fb: FormBuilder,
//         private readonly loaderService: LoaderService,
//         private readonly lovService: LovService,
//         private readonly toastrService: ToastrService,
//         private readonly router: Router,
//         public dialog: MatDialog
//       ) {
//         this.initTable();
//         this.breadcrumbService.set('@customers', 'Customer Management');
//       }
    
      
//       initTable() {
//         this.columnDefs = customerTable({
          
//           // console.log('Navigating to customer details with ID: ${customerId}'),
//           cellClicked: (customerId: string) =>  this.router.navigate([`/customer-details/${customerId}`]),
//           services: {
//             lovService: this.lovService
//           }})
      
//       }
    
//       ngOnInit(): void {
//         this.getCustomers();
//       }
    
      
//       addCustomer() {
//         this.router.navigate(['app/add-customer']);
//       }
    
//       getCustomers() {
//         this.loaderService.startLoading();
        
//         this.customerService.getAllCustomers().subscribe(
//           (res) => {
//             if (res) {
//               this.rowData = res;  // Assign the response to rowData to be used in the table
//               this.loaderService.stopLoading();
//             }
//           },
//           (error) => {
//             this.loaderService.stopLoading();
//             this.toastrService.error(error?.message || 'Error loading customers');
//           }
//         );
//       }


//     }
  













import { Component, Input, OnInit } from '@angular/core';
  import { BreadcrumbService } from 'xng-breadcrumb';
  import { customerTable } from './customerTable';
  import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
  import { ToastrService } from 'ngx-toastr';
  import { Router } from '@angular/router';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { MatDialog } from '@angular/material/dialog';
  import { ColumnDef } from '../common-utils/components/table/table.config';
  import { LovService } from '../services/lov.service';
import { CustomerService } from '../services/customer.service';
  

@Component({
  selector: 'ems-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})


  export class CustomersComponent implements OnInit {
  
      columnDefs: ColumnDef[] = [];
      rowData: any[] = [];
      form: FormGroup;
      isEmployeeConfirm: boolean;
      isEyeButtonEnabled: boolean = false;
    
      constructor(
        private readonly breadcrumbService: BreadcrumbService,
        private readonly customerService: CustomerService,
        private readonly fb: FormBuilder,
        private readonly loaderService: LoaderService,
        private readonly lovService: LovService,
        private readonly toastrService: ToastrService,
        private readonly router: Router,
        public dialog: MatDialog
      ) {
        this.initTable();
        this.breadcrumbService.set('@customers', 'Customer Management');
      }
    
      
      initTable() {
        this.columnDefs = customerTable({
          cellClicked: (customerId: string) =>  this.router.navigate([`/customer-details/${customerId}`, { string: customerId }]),
          services: {
            lovService: this.lovService
          }})
      
      }
    
      ngOnInit(): void {
        this.getCustomers();
      }
    

      // addCustomer() {
      //   const path = `/app/customers/add-customer`;
      //   console.log('Navigating to:', path);
      //   this.router.navigate([path]);
      // }
      
      addCustomer() {
        this.router.navigate(['app/customers/add-customer']);
      }
    
      getCustomers() {
        this.loaderService.startLoading();
        
        this.customerService.getAllCustomers().subscribe(
          (res) => {
            if (res) {
              this.rowData = res;  // Assign the response to rowData to be used in the table
              this.loaderService.stopLoading();
            }
          },
          (error) => {
            this.loaderService.stopLoading();
            this.toastrService.error(error?.message || 'Error loading customers');
          }
        );
      }







    }



