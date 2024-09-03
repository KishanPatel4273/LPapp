import React, { useState } from 'react';

import {store} from './components/Store'
import { YearSelector, storeYearOptions } from './components/StoreSearchBar';
import { MaterialReactTable, MRT_ShowHideColumnsButton, MRT_ShowHideColumnsMenuItems, MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton, MRT_ToggleFullScreenButton, useMaterialReactTable } from 'material-react-table'
import { useMemo } from 'react';
import { MRT_ColumnDef } from 'material-react-table'; // Adjust import based on your library


const stores_: store[] = Array.from({ length: 100 }, (_, index) => ({
  store_id: index + 1,
  store_type: index % 2 === 0 ? "SPIRIT" : "SPENCER",
  address: `${1000 + index} South White Rd.1234567890123456789`,
  city: index % 3 === 0 ? "San Jose" : index % 3 === 1 ? "Santa Clara" : "Sunnyvale",
  state: index % 3 === 0 ? "CA" : index % 3 === 1 ? "NJ" : "MT",
  zip: `95${100 + index}`,
  year: `${2024 - (index % 5)}`,
  previous_store_id: index === 0 ? 0 : index,
  store_number: `${61000 + index}`,
}));

const StorePage = () => {

  const [selectedYear, setSelectedYear] = useState(storeYearOptions[0]) // this sets the default to current year

  const columns = useMemo<MRT_ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: 'store_id',
        header: 'Store ID',
      },
      {
        accessorKey: 'store_number',
        header: 'Store Number',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      {
        accessorKey: 'zip',
        header: 'Zip',
      },
      {
        accessorKey: 'store_type',
        header: 'Store Type',
      },
      {
        accessorKey: 'year',
        header: 'Year',
      },
      {
        accessorKey: 'previous_store_id',
        header: 'Previous Store ID',
      },
    ],
    [],
  );

    
    const s1 : store = {
      store_id: 1,
      store_type: "SPIRIT",
      address: "1030 South White Rd.",
      city: "San Jose",
      state: "CA",
      zip: "95127",
      year: "2024",
      previous_store_id: 0,
      store_number: "61089"
    }

    const data : store[] = stores_

    const [test, setTest] = useState("")

    const table = useMaterialReactTable({
      columns,
      data,
      enableStickyHeader:true,
      enablePagination: false,
      muiTableBodyCellProps: ({ cell }) => ({
        onDoubleClick: (event) => {
          setTest("working")

        },
      }),

      initialState: { showGlobalFilter: true },
      renderToolbarInternalActions: ({table}) => (
        <>
          <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <MRT_ToggleDensePaddingButton table={table} />
          <MRT_ToggleFullScreenButton table={table} />
        </>
      ),
    });

    return (
      <div>
          {/* <StoreSearchBar /> */}
          <MaterialReactTable table={table} />
      </div>
  );
}

const tableWrapperStyle: React.CSSProperties = {
  marginTop: '20px',
  border: '1px solid #dddddd',
};

export default StorePage;