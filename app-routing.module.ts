import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authRoutes } from "./auth/auth-routes";
import { authGuard } from "projects/new-ems/src/app/common-utils/guards/auth.guard";
import { ProfileComponent } from "projects/new-ems/src/app/profile/profile.component";
import { LeavesComponent } from "projects/new-ems/src/app/leaves/leaves.component";
import { WfhComponent } from "projects/new-ems/src/app/wfh/wfh.component";
import {
  employeeDetailRoutes,
  employeeRoutes,
} from "./employees/employees.routing";
import { rolesRoutes } from "./roles/roles.routing";
import { ClaimsComponent } from "projects/new-ems/src/app/claims/claims.component";
import { ReportsComponent } from "./reports/reports.component";
import { RouterOutletComponent } from "./common-utils/components/router-outlet/router-outlet.component";
import { LovResolverService } from "./services/lov-resolver.service";
import { EmployeeResolverService } from "./services/employee-resolver.service";
import { dashboardRoutes } from "./dashboard/dashboard.routing";
import { leaveDetailRoutes } from "./leaves/leave-detail/leave-detail-routes";
import { wfhDetailRoutes } from "./wfh/wfh-detail/wfh-detail-routes";
import { assetsRoutes } from "./assets/assets.routing";
import { hasUnsavedChangesGuard } from "./common-utils/guards/can-deactivate.guard";
import { IconsExampleComponent } from "./icons-example/icons-example.component";
import { AddBankComponent } from "./bank/add-bank/add-bank.component";
import { batchRoutes } from "./batch/batch.routing";
import { TeamDashboardComponent } from "./team-dashboard/team-dashboard.component";
import { HomeComponent } from "./home/home.component";
import { EmployeeService } from "./services/employee.service";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BreadcrumbComponent } from "xng-breadcrumb";
import { NotificationsComponent } from "./common-utils/components/notifications/notifications.component";
import { CustomersComponent } from "./customers/customers.component";
import { AddCustomerComponent } from "./customers/add-customer/add-customer.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app",
    pathMatch: "full",
  },
  {
    path: "app",
    component: RouterOutletComponent,
    data: {
      breadcrumb: { alias: "app" },
    },
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "home" },
          permission: "default",
        },
        children: [
          {
            path: "",
            redirectTo: "details",
            pathMatch: "full",
          },
          {
            path: "details",
            component: HomeComponent,
            canActivate: [authGuard],
            data: {
              breadcrumb: { skip: true },
            },
          },
        ],
      },
      {
        path: 'notifications',
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: 'notifications' },
          permission: 'employeeInbox'
        },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: NotificationsComponent,
            canActivate: [authGuard],
            data: {
              title: 'Notifications',
              breadcrumb: { skip: true },
              permission: 'employeeInbox'
            }
          }
        ]
      },
      {
        path: "profile",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "profile" },
        },
        children: [
          {
            path: "",
            redirectTo: "details",
            pathMatch: "full",
          },
          {
            path: "details",
            component: ProfileComponent,
            canActivate: [authGuard],
            data: {
              title: "Profile",
              breadcrumb: { skip: true },
            },
          },
          {
            path: "financialDetails",
            component: ProfileComponent,
            canActivate: [authGuard],
            data: {
              title: "Profile",
              breadcrumb: { skip: true },
            },
          },
        ],
      },
      {
        path: "team-dashboard",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "team-dashboard" },
        },
        children: [
          {
            path: "",
            redirectTo: "list",
            pathMatch: "full",
          },
          {
            path: "list",
            component: TeamDashboardComponent,
            canActivate: [authGuard],
            data: {
              title: "Team Dashboard",
              breadcrumb: { skip: true },
            },
          },
          ...employeeDetailRoutes,
        ],
      },
      // {
      //   path: "leaves",
      //   canActivate: [authGuard],
      //   component: RouterOutletComponent,
      //   data: {
      //     breadcrumb: { alias: "leaves" },
      //     permission: "viewLeave",
      //   },
      //   children: [
      //     {
      //       path: "",
      //       redirectTo: "list",
      //       pathMatch: "full",
      //     },
      //     {
      //       path: "list",
      //       component: LeavesComponent,
      //       canActivate: [authGuard],
      //       // canDeactivate: [hasUnsavedChangesGuard],
      //       data: {
      //         title: "Leave Dashboard",
      //         breadcrumb: { skip: true },
      //         permission: "viewLeave",
      //       },
      //     },
      //     ...leaveDetailRoutes,
      //   ],
      // },
      // {
      //   path: "wfh",
      //   canActivate: [authGuard],
      //   component: RouterOutletComponent,
      //   data: {
      //     breadcrumb: { alias: "wfh" },
      //     permission: "viewWFH",
      //   },
      //   children: [
      //     {
      //       path: "",
      //       redirectTo: "list",
      //       pathMatch: "full",
      //     },
      //     {
      //       path: "list",
      //       component: WfhComponent,
      //       canActivate: [authGuard],
      //       //canDeactivate: [hasUnsavedChangesGuard],
      //       data: {
      //         title: "Remote Working Dashboard",
      //         breadcrumb: { skip: true },
      //         permission: "viewWFH",
      //       },
      //     },
      //     ...wfhDetailRoutes,
      //   ],
      // },
      {
        path: "claims",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "claims" },
          permission: "viewClaims",
        },
        children: [
          {
            path: "",
            redirectTo: "list",
            pathMatch: "full",
          },
          {
            path: "list",
            component: ClaimsComponent,
            canActivate: [authGuard],
            canDeactivate: [hasUnsavedChangesGuard],
            data: {
              title: "Claims",
              breadcrumb: { skip: true },
            },
          },
          ...leaveDetailRoutes,
        ],
      },
      {
        path: "reports",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "reports" },
          title: "Reports",
          permission: "default",
        },
        children: [
          {
            path: "",
            redirectTo: "detailsLeave",
            pathMatch: "full",
          },
          {
            path: "detailsLeave",
            component: ReportsComponent,
            canActivate: [authGuard],
            data: {
              title: "Reports",
              breadcrumb: { skip: true },
            },
          },
          {
            path: "consolidatedLeaves",
            component: ReportsComponent,
            canActivate: [authGuard],
            data: {
              title: "Reports",
              breadcrumb: { skip: true },
            },
          },
          {
            path: "remoteWorking",
            component: ReportsComponent,
            canActivate: [authGuard],
            data: {
              title: "Reports",
              breadcrumb: { skip: true },
            },
          },
          {
            path: "bank",
            component: ReportsComponent,
            canActivate: [authGuard],
            data: {
              title: "Banks",
              breadcrumb: { skip: true },
            },
          },
          {
            path: "employee",
            component: ReportsComponent,
            canActivate: [authGuard],
            data: {
              title: "Reports",
              breadcrumb: { skip: true },
            },
          },
        ],
      },
      {
        path: "icons",
        canActivate: [authGuard],
        component: IconsExampleComponent,
        data: {
          breadcrumb: { alias: "icons" },
          title: "All Icons",
          permission: "default",
        },
      },
      {
        path: "banks",
        canActivate: [authGuard],
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "banks" },
          title: "Banks",
          permission: "default",
        },
        children: [
          {
            path: "",
            redirectTo: "banks",
            pathMatch: "full",
          },
          {
            path: "add",
            component: AddBankComponent,
            canActivate: [authGuard],
            data: {
              title: "Banks",
              breadcrumb: { skip: true },
            },
          },
        ],
      },
      {
        path: "customers",
        component: RouterOutletComponent,
        data: {
          breadcrumb: { alias: "customers" },
          permission: "default",
        },
        children: [
          // Route for listing customers
          {
            path: "",
            redirectTo: "list",
            pathMatch: "full",
          },
          {
            path: "list",
            component: CustomersComponent,
            data: {
              title: "Customers List",
              breadcrumb: { alias: "customerlist" },
            },
          },
          
          {
            path: "add-customer",
            component: AddCustomerComponent,
            data: {
              title: "Add Customer",
              breadcrumb: { alias: "addcustomer" },
            },
          },
          
          {
            path: "customer-details/:id",
            component: CustomerDetailComponent,
            data: {
              title: "Customer Details",
              breadcrumb: { alias: "customerdetail" },
            },
          },
          
          {
            path: "edit-customer/:id",
            component: AddCustomerComponent,
            data: {
              title: "Edit Customer",
              breadcrumb: { alias: "editcustomer" },
              // mode: "edit", // You can use this to set the mode for the component (e.g., by passing 'edit' in the data)
            },
          },
        ],
      },

      ...authRoutes,
      ...dashboardRoutes,
      ...employeeRoutes,
      ...rolesRoutes,
      ...assetsRoutes,
      ...batchRoutes,

      
        
       
       


         


       


      // {
      //   path: "customers",
        
      //   component: CustomersComponent,
      //   data: {
      //     breadcrumb: { alias: "customers" }, 
      //     title: "Customers",
      //     permission: "default",  
      //   },
      // },
      
      //   {
      //     path: 'customer-details/:id',
      //     component: CustomerDetailComponent,
      //   }
        
      // ,
      // {
      //   path: "add-customer",
      //   component: AddCustomerComponent,
      //   data: {
      //     breadcrumb: { alias: "add-customers" }, 
      //     title: "AddCustomers",
      //     permission: "default",  
      //   },
      // },
      {
        path: "**",
        redirectTo: "profile",
        pathMatch: "full",
      },
    ],
    resolve: {
      lov: LovResolverService,
      employeeDetails: EmployeeResolverService,
    },
  },

  {
    path: "**",
    redirectTo: "app",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
