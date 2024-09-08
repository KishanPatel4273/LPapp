import { useState } from "react";

export type storeSearchOptionsType = 'store_number' | 'address' | 'city' | 'state' | 'zip';
export const storeSearchOptions : storeSearchOptionsType[] = ['store_number', 'address', 'city', 'state', 'zip']
export const storeYearOptions : string[] = range(2020, (new Date().getFullYear()) + 1).map((v,k) => v.toString()).reverse()

const StoreSearchBar = () => {


    const [searchType, setSearchType] = useState('store number');
    const [serachYear, setSearchYear] = useState(storeYearOptions[0])
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
        // Pass the selected search type and query back to the parent component or handle it here
        //onSearch(searchType, searchQuery);
    };
  
    return (
        <div>
            <select 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
                style={{ marginRight: '10px', padding: '5px' }}
            >
                {storeSearchOptions.map(option => (
                    <option key={option} value={option}>
                        {option.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </option>
                ))}
            </select>
            
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search by ${searchType}`}
                style={{ marginRight: '10px', padding: '5px' }}
            />
            
            <button onClick={handleSearch} style={{ padding: '5px 10px' }}>
                Search
            </button>

            
        </div>
    );
};

const YearSelector = ({selectedYear, setSelectedYear}) => {
    return (
            <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ padding: '5px', border:0, appearance:"none"}}
            >
                {storeYearOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
    )
}

function range(start:number, end:number) {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}

export {StoreSearchBar, YearSelector};
