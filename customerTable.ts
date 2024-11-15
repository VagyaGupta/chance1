
import { ColumnDef } from "../common-utils/components/table/table.config";

export const customerTable = (cellParams: any = null): ColumnDef[] => {
    return [
        // {
        //     field: 'customerId',
        //     header: 'Customer Id',
        //     cellClicked: (data: any) => cellParams.cellClicked(data),
            
        //     comparator: (valueA, valueB): number => {
        //         if (!valueA && !valueB) { return 0; }
        //         if (!valueA) { valueA = 0; }
        //         if (!valueB) { valueB = 0; }
        //         if (valueA > valueB) { return 1; }
        //         if (valueA < valueB) { return -1; }
        //         return 0;
        //     },
        //     hide: false,
        //     download: true,
        //     filter: {
        //         type: "text",
        //         isEnabled: true,
        //         numberOnly: true
        //     }
        // },

        {
            field: 'customerId',
            header: 'Customer Id',
            cell: (params): string => {
                const customerId = params.customerId;
                return customerId ? customerId.toString(): '-'; 
            },
            cellClicked: (data: any) => cellParams.cellClicked(data),
            comparator: (valueA, valueB): number => {
                if (!valueA && !valueB) { return 0; }
                if (!valueA) { valueA = 0; }
                if (!valueB) { valueB = 0; }
                if (valueA > valueB) { return 1; }
                if (valueA < valueB) { return -1; }
                return 0;
            },
            hide: false,
            download: true,
            filter: {
                type: "text",
                isEnabled: true,
                numberOnly: true
            }
        },
        {
            header: 'Customer Name',
            field: 'customerName',
            cell: (params): string => {
                const firstName = params.customerName;
                return firstName ? firstName : '-';
            },
            hide: false,
            download: true,
            sortable: false,
            filter: {
                type: "text",
                isEnabled: true,
                stringOnly: true
            }
        },
        {
            header: 'Customer Email',
            field: 'email',
            cell: (params): string => {
                const email = params.email;
                return email ? email : '-';
            },
            hide: false,
            download: true,
            sortable: false,
            filter: {
                type: "text",
                isEnabled: true,
                stringOnly: true
            }
        },
        {
            header: 'Account Status',
            field: 'status',
            hide: true,
            download: true,
            cell: (params: any): string => {
                const status =params.status;
                return params.status || '-';
            },
            sortable: false,
            filter: {
                type: "select",
                isEnabled: true,
                filterOptions: cellParams?.services?.lovService?.lov?.['accountStatus'],
                valueKey: 'code',
                labelKey: 'displayText',
                mutliSelect: true
            }
        },
        // {
        //     header: 'Phone Number',
        //     field: 'phoneNumber',
        //     cell: (params): string => {
        //         return params?.phoneNumber ? params.phoneNumber : '-';
        //     },
        //     hide: true,
        //     download: true,
        // },
    ];
};



// // customerTable.ts
// export function customerTable(config: any) {
//     return [
//       {
//         headerName: 'Customer ID',
//         field: 'customerId',
//         sortable: true,
//         filter: true
//       },
//       {
//         headerName: 'Customer Name',
//         field: 'name',
//         sortable: true,
//         filter: true
//       },
//       {
//         headerName: 'Email',
//         field: 'email',
//         sortable: true,
//         filter: true
//       },
//       {
//         headerName: 'Status',
//         field: 'status',
//         sortable: true,
//         filter: true
//       },
//       {
//         headerName: 'Created At',
//         field: 'createdAt',
//         sortable: true,
//         filter: true
//       },
//       {
//         headerName: 'Actions',
//         cellRenderer: (params: any) => {
//           return `<button class="btn btn-primary" (click)="viewCustomer(${params.data.customerId})">View</button>`;
//         }
//       }
//     ];
//   }
  