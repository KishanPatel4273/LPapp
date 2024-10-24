import { alarmCode } from "./AlarmAPI";
import { alarmPanel } from "./AlarmPanelAPI";
import { getAPI } from "./api";

export type storeType = "SPIRIT" | "SPENCER";

export type store = {
    //  Primary Key
    storeId?: number,
    storeType: storeType,
    address: string,
    city: string,
    state: string,
    zip: string,
    year: string,
    storeNumber: string,
    previousStoreId?: number,

    latitude: number,
    longitude: number,
    store_phone_number?: string,
    store_phone?: string,
    total_square_foot: number,
    built_to?: number,
    sup_type?: string,
    poss_date: Date,
    fix_arrival_date?: Date,
    const_start_date?: Date,
    stock_start_date?: Date,
    open_date?: Date,
    create_date: Date,
    allows_early_drop: boolean,
    live_load: boolean,
    live_load_reason?: string,
    extended_stay: boolean,
    stay_length: Number,
    
    alarmCodes: alarmCode[]
    alarmPanels: alarmPanel[]
    // //  parts that are requested
    // rmOrdersList: [RmOrders!]!
    // //  dsm's to their stores
    // dsmStoresList: [DsmStores!]!
    // //  alarm panel data
    // alarmPanelsList: [AlarmPanels!]!
}

export type zm = {
    zone_number: number,
    zone_manager: string,
    zone_manager_phone_number: string,
}

export type dsm = {
    district_number: number,
    district_store_manager: string,
    district_store_manager_phone_number: string,
}


export const getStores = async (): Promise<store[] | null> => {
    return await getAPI('/api/stores', 200)
};

export const getStore = async (storeNumber: string, year: string) : Promise<store | null> => {

    return await getAPI(`/api/stores/search?storeNumber=${storeNumber}&year=${year}`, 200)
};