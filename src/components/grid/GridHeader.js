import Str from "../../dev/localization";

const GridHeader = ({columns, checkable, checkAll, expandableRow, changeSort, sortConf}) => {
    return(
     <thead>
    <tr>
        {checkable ? <th>
            <label className="d-flex mb-0"><input onChange={(event) => {
            checkAll(event.target.checked)
        }} type="checkbox"/></label></th> : ""}
        <th>{Str.row}</th>
        {columns.map((item, index) => {
            // let classSticky = 'fix-width'
            let classSticky = ''
            switch (index) {
                case 0 :
                    classSticky = 'sticky-col first-col';
                    break;
                case 1 :
                    classSticky = 'sticky-col second-col';
                    break;
                case 2 :
                    classSticky = 'sticky-col third-col';
                    break;
                case 3 :
                    classSticky = 'sticky-col four-col';
                    break;
            }
            return(<th className={classSticky}><span className="d-inline">{item.label}</span>
                {sortConf.key === item.display ? <i className={`cursor-pointer d-inline px-1 fa ${sortConf.direction === "asc" && sortConf.key === item.display ? 'fa-angle-up' : 'fa-angle-down'}`} onClick={() => changeSort(item.display)}/> : ""}
            </th>)
        })}
        {expandableRow ? <th></th> : ""}
    </tr>
 </thead>
 )
}
export default GridHeader