import { useState} from "react";

const GridBody = ({rows, columns, checkable, checkChange, filterSelection, selecteds, expandedItem, expandableRow, pageSize, pageNumber}) => {
 const [expanded, setExpanded] = useState(-1);

    return(
    <tbody>
    {rows.length > 0 ? (<>
        {rows.map((item, i) => {
            let isChecked = false;
            if (checkable) {
                isChecked = filterSelection(item, selecteds).length !== selecteds.length
            }
            const r = ((pageNumber - 1) * pageSize) + (i + 1)
            return(
                <>
                    <tr>
                        {checkable? <td className="sticky-col first-col">
                            <label className="d-flex mb-0">
                                <input onChange={(event) => checkChange(event.target.checked, item)} checked={isChecked} type="checkbox"/>
                            </label>
                        </td> : ""}
                        <td>{r}</td>
                        {columns.map((column, index) => {
                            let classSticky = 'fix-width'
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
                            return(
                                <td className={classSticky}>{column.value(item)}</td>
                            )
                        })}
                        {expandableRow? <td>
                        <span className="d-flex mb-0">
                            <i className="fa fa-caret-down cursor-pointer" onClick={(event) => setExpanded(expanded === i ? -1 : i)}/>
                        </span>
                        </td> : ""}
                    </tr>
                    {expandableRow && expanded === i ? <tr className="expanded"><td colSpan={columns.length + 2}>{expandedItem(item)}</td></tr> : ""}
                </>
            )
        })}
    </>) : (<tr><td colSpan={columns.length + 2}>موردی برای نمایش وجود ندارد</td></tr>)}
    </tbody>
)
}
export default GridBody