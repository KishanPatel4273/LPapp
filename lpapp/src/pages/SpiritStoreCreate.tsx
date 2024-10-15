import { useEffect, useState } from "react"
import Spreadsheet, { Matrix } from "react-spreadsheet"
import { YearSelector } from "./components/StoreSearchBar"
import { store, zm, dsm } from "../api"

const dataLabels = ["storeNumber", "zone_number","zone_manager","zone_manager_phone_number","district_number","district_store_manager","district_store_manager_phone_number","kit_number","3PL","storeNumber","store_name","center_or_mall_name","address","city","state","zip","latitude","longitude","store_phone_number","total_square_foot","built_to","sup_type","poss_date","fix_arrival_date","const_start_date","stock_start_date","open_date","create_date","allows_early_drop","live_load","live_load_reason","extended_stay","stay_length"]
const columnLabels = ["Store","Zone","Zone Mgr","Zone Mgr Phone #","Dist","DSM","DSM phone #","Kit #","3PL","Store","Store Name","Center/Mall Name","Center Address","Center City","ST","Zip","Latitude","Longitude","Store Phone?","Total Sq. Ft","Build To?","Sup Type?","Poss. Date","Fix Arrival?","Const Start?","Stock Start?","Open Date?","Create Date","Allows Early Drop","Live Load?","Live Load Reason?","Extended Stay","Stay Length"]
type dataRowType = {
    storeNumber: string
    zone_number: string
    zone_manager: string
    zone_manager_phone_number: string
    district_number: string
    district_store_manager: string
    district_store_manager_phone_number: string
    kit_number: string
    '3PL': string
    store_name: string
    center_or_mall_name: string
    address: string
    city: string
    state: string
    zip: string
    latitude: string
    longitude: string
    store_phone_number: string
    total_square_foot: string
    built_to: string
    sup_type: string
    poss_date: string
    fix_arrival_date: string
    const_start_date: string
    stock_start_date: string
    open_date: string
    create_date: string
    allows_early_drop: string
    live_load: string
    live_load_reason: string
    extended_stay: string
    stay_length: string
}

// TODO: validate the stores data, and give an alert for this
const SpiritStoreCreate = () => {

    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
    const [data, setData] = useState<Matrix<any>>([[]])

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', justifyContent:'space-between' }}>
                <div style = {{marginLeft:'.75rem'}}>
                    <YearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
                    <text> Spirit Stores </text>
                </div>
                <div style={{paddingRight:'2rem'}}>
                    <button
                        onClick={() => {request(parseMatrix(data), selectedYear)}}
                    >
                        create
                    </button>
                </div>
            </div>
            <div style={{ 
                        //   maxHeight: 'fle',   // Adjust this value based on your layout
                          overflowY: 'auto',    // Enables vertical scrolling
                          overflowX: 'auto',    // Enables horizontal scrolling if necessary
                          padding: '10px'   }}>
                <Spreadsheet 
                    data={data} 
                    columnLabels={columnLabels}
                    onChange={(data) => {setData(data)}}
                />
            </div>
        </div>
    )
}

/**
 * 
 * @param data date is take from spread sheet and parsed into json that can be sent to backend
 */
const parseMatrix = (data: Matrix<any>) : dataRowType[] => {
    var parsed_data = []
    data.forEach((v,i) => {
        var parsed_row = {}        
        v.forEach((d,k) => {
            parsed_row[dataLabels[k]] = d?.value
        })
        parsed_data.push(parsed_row)
    })
    return parsed_data
}


/**
 * 
 * @param data parsed data that is going to call backend to setup stores
 */
const request = (data: dataRowType[], year:string) => {
    var dataValid : boolean = true
    // data to send backend to create new data
    var validData:[store, dsm, zm][] = []

    data.forEach((v:dataRowType,k:number) => {
        if (!v.storeNumber ||
            !v.address ||
            !v.city ||
            !v.state ||
            !v.zip
            // !v.latitude ||
            // !v.longitude ||
            // !v.total_square_foot ||
            // !v.poss_date ||
            // !v.create_date ||
            // !v.zone_number ||
            // !v.zone_manager ||
            // !v.zone_manager_phone_number ||
            // !v.district_number ||
            // !v.district_store_manager ||
            // !v.district_store_manager_phone_number
        ) {
            if (dataValid) {
                alert(`Error trying to parse store ${v?.storeNumber} (row ${k+1})`)
                dataValid = false
            }
        } else if(dataValid) {
            const store_metadata: store = {
                storeType: "SPIRIT",
                address: v.address,
                city: v.city,
                state: v.state,
                zip: v.zip,
                year: year,
                storeNumber: v.storeNumber,
                previousStoreId: null,
                alarmCodes: [],
                alarmPanels: [],
                latitude: Number(v.latitude),
                longitude: Number(v.longitude),
                store_phone_number: v?.store_phone_number || "",
                total_square_foot: Number(v.total_square_foot),
                built_to: v?.built_to ? Number(v.built_to) : null,
                sup_type: v?.sup_type ? v.sup_type : "",
                poss_date: new Date(v.poss_date),
                fix_arrival_date: v?.fix_arrival_date ? new Date(v.fix_arrival_date) : null,
                const_start_date: v?.const_start_date ? new Date(v.const_start_date) : null,
                stock_start_date: v?.stock_start_date ? new Date(v.stock_start_date) : null,
                open_date: v?.open_date ? new Date(v.open_date) : null,
                create_date: new Date(v.create_date),
                allows_early_drop: v.allows_early_drop?.toLowerCase() === 'yes',
                live_load: v.live_load?.toLowerCase() === 'yes',
                live_load_reason: v?.live_load_reason || "",
                extended_stay: v.extended_stay?.toLowerCase() === 'yes',
                stay_length: v?.stay_length ? Number(v.stay_length) : null,
            };
            const zm : zm = {
                zone_number: Number(v.zone_number),
                zone_manager: v.zone_manager,
                zone_manager_phone_number: formatPhoneNumber(v.zone_manager_phone_number)
            }
            const dsm : dsm = {
                district_number: Number(v.district_number),
                district_store_manager: v.district_store_manager,
                district_store_manager_phone_number: formatPhoneNumber(v.district_store_manager_phone_number)
            }
            validData.push([store_metadata, dsm, zm])
        }
    })

    if (dataValid) {
        validData.forEach(async ([s,d,z],k) => {
            // check if ZM | DSM exit on backend
            // if they don't create them 
            
            // make store
            // get id
            console.log("drt:", s)

            const store_create_response = await fetch('/api/stores', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify([{
                storeType: "SPIRIT",
                address: s.address,

                city: s.city,
                state: s.state,
                zip: s.zip,
                year: year,
                storeNumber: s.storeNumber,
                previousStoreId: null}]),
              });
        //     // pair zm | DSM to store
        //         // store_id <> dsm_id | zm_id
        })
    }
    
        


}

const formatPhoneNumber = (p:string) => {
    return p
}

export default SpiritStoreCreate

