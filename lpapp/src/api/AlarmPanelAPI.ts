import axios from "axios"
import { store } from "./StoreAPI"
import { configHeaderJSON, deleteAPI, getAPI, postAPI, putAPI } from "./api"


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
    return await getAPI('/api/alarmpanels', 200)
}

export const createAlarmPanel = async (alarmPanel : alarmPanel, storeId: number) : Promise<alarmPanel | null> => {
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
    return await postAPI('/api/alarmpanels', 201, data, configHeaderJSON)
}

export const updateAlarmPanel = async (alarmPanelId : number, alarmPanel : alarmPanel) : Promise<alarmPanel | null> => {

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

    return await putAPI(`/api/alarmpanels/${alarmPanelId}`, 200, data, configHeaderJSON)    
}

export const addStoreToAlarmPanel = async (alarmCodeId : number, storeId: number) : Promise<alarmPanel | null> => {

    return await putAPI(`/api/alarmpanels/connect?alarmPanelId=${alarmCodeId}&storeId=${storeId}`, 200)

}

export const removeStoreToAlarmPanel = async (alarmCodeId : number, storeId: number) : Promise<alarmPanel | null> => {

    return await putAPI(`/api/alarmpanels/disconnect?alarmPanelId=${alarmCodeId}&storeId=${storeId}`, 200)

}

export const deleteAlarmPanel = async (alarmPanelId : number) : Promise<alarmPanel | null> => {

    return await deleteAPI(`/api/alarmpanels/${alarmPanelId}`, 200)

}