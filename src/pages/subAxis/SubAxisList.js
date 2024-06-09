import {Card, CardBody, CardHeader} from "reactstrap";
import Str from "../../dev/localization";
import {Link, useParams, useSearchParams} from "react-router-dom";
import Address from "../../dev/helpers/Address";
import Grid from "../../components/grid/Grid";
import {useEffect, useState} from "react";
import ApiUrls from "../../dev/service/ApiUrls";
import Api from "../../dev/service/Api";
import {MyAlert} from "../../components/feature/MyAlert";

const SubAxisList = () => {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchParams] = useSearchParams();
    const id = searchParams.get('axisId')
    const columns = [
        {label: Str.subAxisTitle, value: row => row.title, display: "title"},
        {label: Str.order, value: row => row.sortOrder, display: "order"},
        {label: Str.weightedCoefficient, value: row => row.weightedCoefficient, display: "weightedCoefficient"},
        {label: Str.standards, value: row => <Link className="text-decoration-none" to={Address.standards(ApiUrls.query({subAxisId: row.guid}))}><i className="fa fa-certificate font-icon text-danger"/></Link>, display: ""},
        {label: Str.status, value: row => (<div className={`toggle-container ${!row.isDeleted ? 'active' : ''}`}>
                <button className={`toggle-button ${!row.isDeleted ? 'active' : ''}`} onClick={() => changeStatus(row)}>
                    <div className="slider" />
                </button>
            </div>), display: ""},
        {label: Str.edit, value: row => (<Link to={Address.editSubAxis(row.guid)}><i className="fa fa-edit font-icon"/></Link>), display: ""},
    ]
    useEffect(() => {
        getSubAxises()
    }, [id, pageNumber, pageSize])
    const getSubAxises = async () => {
        const query = ApiUrls.query({PageNumber: pageNumber, PageSize: pageSize})
        const result = await Api.get(ApiUrls.getSubAxises(id, query))
        if (result.success) {
            setRows(result.data.items)
            setTotalCount(result.data.totalItems)
        }
    }
    const changeStatus = async (item) => {
        const result = await Api.patch(ApiUrls.changeStatusSubAxis(item.guid))
        if (result.success) {
            getSubAxises()
            MyAlert.success(Str.successChangeStatusAxis)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
    return(
        <Card>
                    <CardHeader>
                        <div className="d-flex justify-content-between card-header-custom"><span
                            className="text-header">{Str.subAxisList}</span>
                            <span className="btn-add btn d-inline-flex"><Link to={Address.createSubAxis(ApiUrls.query({axisId: id}))} className="text-decoration-none create-link">{Str.createSubAxis}</Link><i className="fa fa-plus px-1 add-icon"/></span>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Grid
                            expandableRow={false}
                            columns={columns}
                            rows={rows}
                            totalCount={totalCount}
                            goToPage={(page) => setPageNumber(page)}
                            getPageSize={(ps) => setPageSize(ps)}
                            checkable={false}
                            pageNumber = {pageNumber}
                            sorted={(state) => setRows(state)}
                            sort={{key: "title", direction: "asc"}}
                        />
                    </CardBody>
                </Card>
    )
}
export default SubAxisList