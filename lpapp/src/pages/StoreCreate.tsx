import Spreadsheet from "react-spreadsheet";

const columnLabels = ["Store","Zone","Zone Mgr","Zone Mgr Phone #","Dist","DSM","DSM phone #","Kit #","3PL","Store","Store Name","Center/Mall Name","Center Address","Center City","ST","Zip","Latitude","Longitude","Store Phone","Total Sq. Ft","Build To","Sup Type","Poss. Date","Fix Arrival","Const Start","Stock Start","Open Date","Create Date","Allows Early Drop","Live Load","Live Load Reason","Extended Stay","Stay Length"]

const StoreCreate = () => {
    const data = [
        [],
      ];
    
    return (
        <div>
            <Spreadsheet 
                data={data} 
                columnLabels={columnLabels}
            />
        </div>
    )
}

export default StoreCreate;

