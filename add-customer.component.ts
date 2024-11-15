// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
// import { ToastrService } from 'ngx-toastr';
// import { CustomerService } from '../../services/customer.service';

// @Component({
//   selector: 'ems-add-customer',
//   templateUrl: './add-customer.component.html',
//   styleUrls: ['./add-customer.component.scss']
// })

// export class AddCustomerComponent implements OnInit {
//   form: FormGroup;
//   isEdit: boolean = false;
//   customerDetails: any;

//   constructor(
//     private readonly fb: FormBuilder,
//     private readonly loaderService: LoaderService,
//     private readonly toastrService: ToastrService,
//     private readonly customerService: CustomerService,  
//     private readonly route: ActivatedRoute,
//     private readonly router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe((params: any) => {
//       if (params?.id) {
//         this.getCustomerDetails(Number(params.id));
//       } else {
//         this.createCustomerForm();
//       }
//     });
//   }

//   getCustomerDetails(id: number): void {
//     this.loaderService.startLoading();
//     this.customerService.getCustomerById(id).subscribe(res => {
//       if (res) {
//         this.isEdit = true;
//         this.customerDetails = res;
//         this.createCustomerForm();
//         this.form.patchValue(res);
//         this.loaderService.stopLoading();
//       }
//     }, error => {
//       this.loaderService.stopLoading();
//       this.toastrService.error(error?.message || 'Error fetching customer details');
//     });
//   }

//   createCustomerForm(): void {
//     this.form = this.fb.group({
//       customerName: [null, [Validators.required]],
//       email: [null, [Validators.required, Validators.email]],
//       contactNumber: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       addressLine1: [null, [Validators.required]],
//       addressLine2: [null],
//       city: [null, [Validators.required]],
//       state: [null, [Validators.required]],
//       zipCode: [null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
//       country: [null, [Validators.required]],
//       bankName: [null, [Validators.required]],
//       ifscCode: [null, [Validators.required]],
//       accountNumber: [null, [Validators.required]],
//       accountHolderName: [null, [Validators.required]],
//       udyamRegNo: [null],
//       gstin: [null, [Validators.required]]
     
//     });
//   }

//   onSubmit(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }
//     if (this.isEdit) {
//       this.updateCustomer();
//     } else {
//       this.addCustomer();
//     }
//   }

//   addCustomer(): void {
//     this.loaderService.startLoading();
//     const customerData = this.form.value;
//     // customerData.createdAt = new Date().toISOString();
//     // customerData.updatedAt = customerData.createdAt;
//     // customerData.customerId = Math.floor(Math.random() * 1000) + 1; // This is for generating a new customer ID

//     this.customerService.createCustomer(customerData).subscribe(() => {
//       this.loaderService.stopLoading();
//       this.toastrService.success('Customer added successfully');
//       this.router.navigate(['/app/customers']);
//     }, error => {
//       this.loaderService.stopLoading();
//       this.toastrService.error(error?.message || 'Error adding customer');
//     });
//   }

//   updateCustomer(): void {
//     this.loaderService.startLoading();
//     const customerData = { ...this.form.value, customerId: this.customerDetails.customerId };
//     customerData.updatedAt = new Date().toISOString();

//     this.customerService.updateCustomer(customerData).subscribe(() => {
//       this.loaderService.stopLoading();
//       this.toastrService.success('Customer updated successfully');
//       this.router.navigate([`/app/customers/details/${this.customerDetails.customerId}`]);
//     }, error => {
//       this.loaderService.stopLoading();
//       this.toastrService.error(error?.message || 'Error updating customer');
//     });
//   }

//   onCancel(): void {
//     this.router.navigate(['/app/customers']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'projects/new-ems/src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'ems-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})

export class AddCustomerComponent implements OnInit {
  form: FormGroup;
  isEdit: boolean = false; // Flag to track edit mode
  customerDetails: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loaderService: LoaderService,
    private readonly toastrService: ToastrService,
    private readonly customerService: CustomerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
   
    this.route.params.subscribe((params: any) => {
      const customerId = params['id']; 

      if (customerId) {
        this.isEdit = true; 
        this.getCustomerDetails(customerId); 
      } else {
        this.isEdit = false; 
        this.createCustomerForm(); 
      }
    });
  }

  
  getCustomerDetails(id: string): void {
    this.loaderService.startLoading();
    this.customerService.getCustomerById(id).subscribe(
      (res) => {
        console.log('Customer details fetched:', res);
        if (res) {
          this.customerDetails = res; 
          this.createCustomerForm(); 
          this.form.patchValue(res); 
          this.loaderService.stopLoading();
        }
      },
      (error) => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message || 'Error fetching customer details');
      }
    );
  }

 
  createCustomerForm(): void {
    this.form = this.fb.group({
      customerName: [this.customerDetails?.customerName || null, [Validators.required]],
      email: [this.customerDetails?.email || null, [Validators.required, Validators.email]],
      contactNumber: [this.customerDetails?.contactNumber || null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      addressLine1: [this.customerDetails?.addressLine1 || null, [Validators.required]],
      addressLine2: [this.customerDetails?.addressLine2 || null],
      city: [this.customerDetails?.city || null, [Validators.required]],
      state: [this.customerDetails?.state || null, [Validators.required]],
      zipCode: [this.customerDetails?.zipCode || null, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: [this.customerDetails?.country || null, [Validators.required]],
      bankName: [this.customerDetails?.bankName || null, [Validators.required]],
      ifscCode: [this.customerDetails?.ifscCode || null, [Validators.required]],
      accountNumber: [this.customerDetails?.accountNumber || null, [Validators.required]],
      accountHolderName: [this.customerDetails?.accountHolderName || null, [Validators.required]],
      udyamRegNo: [this.customerDetails?.udyamRegNo || null],
      gstin: [this.customerDetails?.gstin || null, [Validators.required]]
    });
  }

  // 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isEdit) {
      this.updateCustomer(); 
    } else {
      this.addCustomer(); 
    }
  }

  
  addCustomer(): void {
    this.loaderService.startLoading();
    const customerData = this.form.value;

    this.customerService.createCustomer(customerData).subscribe(
      () => {
        this.loaderService.stopLoading();
        this.toastrService.success('Customer added successfully');
        this.router.navigate(['/app/customers']);
      },
      (error) => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message || 'Error adding customer');
      }
    );
  }

 
  updateCustomer(): void {

    console.log('Updating customer:', this.form.value); 
  console.log('Current customer details:', this.customerDetails);

    this.loaderService.startLoading();
    const customerData = { ...this.form.value, customerId: this.customerDetails.id };
    

    this.customerService.updateCustomer(customerData).subscribe(
      () => {
        this.loaderService.stopLoading();
        this.toastrService.success('Customer updated successfully');
        console.log('customer updated');
        console.log('Customer ID:', this.customerDetails.customerId);

        this.router.navigate([`/app/customers/customer-details/${this.customerDetails.id}`]);
      },
      (error) => {
        this.loaderService.stopLoading();
        this.toastrService.error(error?.message || 'Error updating customer');
      }
    );
  }

  
  onCancel(): void {
    this.router.navigate(['/app/customers']);
  }
}
