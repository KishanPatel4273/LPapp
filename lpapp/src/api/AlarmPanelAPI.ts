import axios from "axios"
import { store } from "./StoreAPI"


export type alarmPanelType = "ONSITE" | "OFFSITE" | "OLD"

export type alarmPanel = {
    alarmPanelId : number,
    panelNumber : string,
    alarmPanelType : alarmPanelType,
    txid : string,
    smartTechNumber : string,
    imei : string,
    iccid : string,
    stores : { storeId : number }[] | store[]
}


/**
 * Calls api to get alarm panels
 * @returns a list of alarmPanels
 */
export const getAlarmPanels = async () : Promise<alarmPanel[] | null> => {
    try {
        const response = await axios.get('/api/alarmpanels')
        
        if (response.status === 200) {
            return response.data
        }
        return null
    } catch (error : any) {
        console.error('<get AlarmPanels> Unexpected error:', error);
        return null
    }
}

export const createAlarmPanel = async (alarmPanel : alarmPanel, storeId: number) : Promise<alarmPanel | null> => {
    try {
        
        const data = JSON.stringify(
            {
                panelNumber : alarmPanel.panelNumber,
                alarmPanelType : alarmPanel.alarmPanelType,
                txid : alarmPanel.txid,
                smartTechNumber : alarmPanel.smartTechNumber,
                imei : alarmPanel.imei,
                iccid : alarmPanel.iccid,
                stores : [{storeId : storeId}]
            }
        )
        
        console.log("create panel :", data)

        const response = await axios.post('/api/alarmpanels', 
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ) // headers 'Content-Type'json
        
        if (response.status === 201) {
            return response.data
        }
        
    } catch (error) {
        console.error('<create AlarmPanels> Unexpected error:', error);
    }
    
    return null
}

export const updateAlarmPanel = async (alarmPanelId : number, alarmPanel : alarmPanel) : Promise<alarmPanel | null> => {

    try {

        const data = JSON.stringify(
            {
                panelNumber : alarmPanel.panelNumber,
                alarmPanelType : alarmPanel.alarmPanelType,
                txid : alarmPanel.txid,
                smartTechNumber : alarmPanel.smartTechNumber,
                imei : alarmPanel.imei,
                iccid : alarmPanel.iccid,
                // stores : alarmPanel.stores
            }
        )

        const response = await axios.put(`/api/alarmpanels/${alarmPanelId}`, 
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        console.error('<update (put) AlarmPanels> Unexpected error:', error);

    }

    return null
}

export const addStoreToAlarmPanel = async (alarmCodeId : number, storeId: number) : Promise<alarmPanel | null> => {

    try {
        
        const response = await axios.put(`/api/alarmpanels/connect?alarmPanelId=${alarmCodeId}&storeId=${storeId}`)

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        console.error('<addStoreToAlarmPanel <AlarmPanels> Unexpected error:', error);

    }

    return null
}

export const removeStoreToAlarmPanel = async (alarmCodeId : number, storeId: number) : Promise<alarmPanel | null> => {

    try {
        
        const response = await axios.put(`/api/alarmpanels/disconnect?alarmPanelId=${alarmCodeId}&storeId=${storeId}`)

        if (response.status === 200) {
            return response.data
        }

    } catch (error) {
        console.error('<removeStoreToAlarmPanel <AlarmPanels> Unexpected error:', error);

    }

    return null
}

export const deleteAlarmPanel = async (alarmPanelId : number) : Promise<alarmPanel | null> => {

    try {
        const response = await axios.delete(`/api/alarmpanels/${alarmPanelId}`)

        if (response.status === 200) {
            return response.data
        }

    } catch (error) { 
        console.error('<delete AlarmPanels> Unexpected error:', error);

    }

    return null
}