import React, { useState, useMemo, useEffect, SetStateAction, Dispatch } from 'react';

import { store } from '../api';
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
import { getStores } from '../api';

type props = {
    yearState: [string, Dispatch<SetStateAction<string>>],
}

const StorePage = ({yearState} : props) => {
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = yearState// useState(new Date().getFullYear().toString()); // this sets the default to current year
    const [selectedStoreType, setSelectedStoreType] = useState<"SPIRIT" | "SPENCER">("SPIRIT"); // this sets the default to current year

    const columns = useMemo<MRT_ColumnDef<any, any>[]>(
        () => [
            {
                accessorKey: 'storeId',
                header: 'Store ID',
            },
            {
                accessorKey: 'storeNumber',
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
                accessorKey: 'storeType',
                header: 'Store Type',
            },
            {
                accessorKey: 'year',
                header: 'Year',
            },
            {
                accessorKey: 'previousStoreId',
                header: 'Previous Store ID',
            },
        ],
        [],
    );

    const [storeData, setStoreData] = useState<store[]>([])
    const [test, setTest] = useState("");

    useEffect(() => {
        setSelectedYear(yearState[0])
    }, [yearState])

    useEffect(() => {
        const loadStores = async () => {
            const data = await getStores()
            if (data) {
                setStoreData(data)
            }
        }

        loadStores()
    }, [])

    const table = useMaterialReactTable({
        columns,
        data: storeData,
        initialState: { showGlobalFilter: true },
        enableStickyHeader: true,
        enablePagination: false,
        muiTableBodyCellProps: ({ cell, column, row, table }) => ({
            onDoubleClick: (event) => {
                console.log(row.original)
                navigate(`/stores/${row.original.storeNumber}`, 
                    {
                        state:row.original
                    }

                )
                console.log("row:", row.original)
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