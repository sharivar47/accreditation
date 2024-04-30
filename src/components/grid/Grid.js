import GridHeader from "./GridHeader";
import GridBody from "./GridBody";
import {Table} from "reactstrap";
import Pagination from "./Pagination";
import PageSize from "./PageSize";
import {useEffect, useState} from "react";
import _ from 'lodash';


const Grid = ({
                  columns,
                  rows,
                  totalCount,
                  goToPage,
                  getPageSize,
                  checkable,
                  filterSelection,
                  selectionChange,
                  expandedItem,
                  expandableRow,
                  withFooter = true,
                  sorted,
                  pageNumber,
                  sort
              }) => {
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [selecteds, setSelecteds] = useState([]);
    const [sortConfig, setSortConfig] = useState(sort);
    const checkChange = (checked, model) => {
        if (checkable) {
            let selected2 = checked
                ? [...selecteds, model]
                : filterSelection(model, selecteds);
            setSelecteds(selected2);
            selectionChange(selected2);
        }
    }

    const checkAll = (checked) => {
        if (checkable) {
            const selected2 = checked ? rows : [];
            setSelecteds(selected2);
            selectionChange(selected2);
        }
    }
    useEffect(
        () => {
            window.addEventListener('scroll', handleScroll,  true);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
            };
        },
        []
    );
    const handleScroll = () => {

        // const headerHeight = document.querySelector(".default-header").getBoundingClientRect().height;
        const headerHeight = 0;
        const thead = document.querySelector(".react-grid-wrapper thead");
        const tableHeight = document.querySelector(".react-grid-wrapper").getBoundingClientRect().y
        if (headerHeight > tableHeight) {
            thead.classList.add('tableSticky')
            if (tableHeight < 0) {
                thead.style.top = `${(Math.abs(tableHeight) + headerHeight - 1)}px`
            } else {
                thead.style.top = `${(headerHeight - tableHeight - 1)}px`
            }
        } else {
            thead.classList.remove('tableSticky')
            thead.style.top = "unset"
        }
    }

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });

        // Use lodash orderBy to sort the data
        const sortedData = _.orderBy(rows, [key], [direction]);

        // Update the state with the sorted data
        sorted(sortedData);
    };
    return (
       <div>
           {
               rows.length > 0 ? <div className="d-flex justify-content-end mb-2">
                   <Pagination
                       currentPage={currentPage}
                       totalCount={totalCount}
                       pageSize={pageSize}
                       onPageChange={(page) => {
                           goToPage(page)
                           setCurrentPage(page)
                       }}
                   />
               </div> : ""
           }
          <div className="react-grid-wrapper">
              <Table className="mb-0" striped={true} responsive={true} border={1}>
                  <GridHeader sortConf={sortConfig} changeSort={(state) => handleSort(state)} expandableRow={expandableRow} checkAll={(checked) => checkAll(checked)} checkable={checkable} columns={columns}/>
                  <GridBody pageSize={pageSize} pageNumber={pageNumber} expandableRow={expandableRow} expandedItem={expandedItem} selecteds={selecteds} filterSelection={filterSelection} checkChange={checkChange}
                            checkable={checkable} rows={rows} columns={columns}/>
              </Table>
          </div>
           {withFooter && rows.length > 0 ? (
               <div className="mt-5 row">
                   <div className="col-12 col-md-6">
                       <Pagination
                       currentPage={currentPage}
                       totalCount={totalCount}
                       pageSize={pageSize}
                       onPageChange={(page) => {
                           goToPage(page)
                           setCurrentPage(page)
                       }}
                   />
                   </div>
                   <div className="col-12 col-md-6 d-flex justify-content-end"><PageSize changePageSize={(ps) => {
                       setPageSize(ps)
                       getPageSize(ps)
                   }}/></div>
               </div>
           ) : ""}
       </div>
    )
}
export default Grid