import React, { useState, useMemo, useEffect } from 'react';

import { store } from './components/Store';
import { YearSelector } from './components/StoreSearchBar';
import { 
    MaterialReactTable, 
    MRT_ShowHideColumnsButton, 
    MRT_ToggleDensePaddingButton, 
    MRT_ToggleFiltersButton, 
    MRT_ToggleFullScreenButton, 
    useMaterialReactTable 
} from 'material-react-table';
import { MRT_ColumnDef } from 'material-react-table'; // Adjust import based on your library
import { useNavigate } from 'react-router-dom';
import AddStoreButton from './components/AddStoreButton';

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
    latitude: 1,
    longitude: 1, 
    total_square_foot: 1,
    poss_date: new Date(),
    create_date: new Date(), 
    allows_early_drop: true, 
    live_load: false, 
    extended_stay: true, 
    stay_length: 1
}));

const StorePage = () => {
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString()); // this sets the default to current year
    const [selectedStoreType, setSelectedStoreType] = useState<"SPIRIT" | "SPENCER">("SPIRIT"); // this sets the default to current year

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

    const [storeData, setStoreData] = useState<store[]>([])
    const data = stores_
    const [test, setTest] = useState("");

    const getD = () => {
        const d = fetch('http://localhost:8080/api/stores', {method: 'GET'})
        .then((response: Response) => response.json()) // Parse the JSON response
        .then((data : store[]) => {
            console.log("Stores list:", data); // Log the JSON data
            setStoreData(data); 
        })
        .catch((error) => {
            console.error('Error fetching the stores:', error);
        });
        console.log('test', d)

        return d
    }
    useEffect(() => {
        getD()
    }, [])

    const table = useMaterialReactTable({
        columns,
        data: storeData,
        initialState: { showGlobalFilter: true },
        enableStickyHeader: true,
        enablePagination: false,
        muiTableBodyCellProps: ({ cell, column, row, table }) => ({
            onDoubleClick: (event) => {
                navigate(`/stores/${row.original.store_number}`, {state:row.original})
            },
        }),
        renderTopToolbarCustomActions: ({ table }) => (
            <AddStoreButton onClick={() => {selectedStoreType === 'SPIRIT' ? navigate('/stores/spirit/create') : navigate('/stores/spencer/create')}} storeType={selectedStoreType} setStoreType={setSelectedStoreType}/>
          ),
        renderToolbarInternalActions: ({ table }) => (
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
        <MaterialReactTable table={table} />
        </div>
    );
}



const tableWrapperStyle: React.CSSProperties = {
    marginTop: '20px',
    border: '1px solid #dddddd',
};

export default StorePage;