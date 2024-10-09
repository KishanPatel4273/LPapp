
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
    // alarmCodesList: [AlarmCodes!]!
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
    try { 
        const response = await fetch('/api/stores', {
            method: 'GET',
        });

        // Check if the response status is not OK (e.g., 404, 500, etc.)
        if (!response.ok) {
            // Handle different status codes accordingly
            return null
        }

        // Attempt to parse the response as JSON
        const data: store[] = await response.json();

        return data;

    } catch (error: any) {
        // Check if the error is due to a timeout or fetch abortion
        if (error.name === 'AbortError') {
            console.error('The request timed out.');
        } else {
            console.error('Error fetching the stores:', error.message || error);
        }

        // Return null to indicate failure
        return null;
    }
};

export const getStore = async ({store_number} : {store_number : string}): Promise<store | null> => {
    try { 
        const response = await fetch(`/api/stores/${store_number}`, {
            method: 'GET',
        });

        // Check if the response status is not OK (e.g., 404, 500, etc.)
        if (!response.ok) {
            // Handle different status codes accordingly
            return null
        }

        // Attempt to parse the response as JSON
        const data: store = await response.json();

        return data;

    } catch (error: any) {
        // Check if the error is due to a timeout or fetch abortion
        if (error.name === 'AbortError') {
            console.error('The request timed out.');
        } else {
            console.error('Error fetching the stores:', error.message || error);
        }

        // Return null to indicate failure
        return null;
    }
};
