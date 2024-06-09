import {Card, CardBody, CardHeader} from "reactstrap";
import Str from "../../dev/localization";
import {Link, useParams, useSearchParams} from "react-router-dom";
import Address from "../../dev/helpers/Address";
import Grid from "../../components/grid/Grid";
import {useEffect, useState} from "react";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {MyAlert} from "../../components/feature/MyAlert";

const StandardList = () => {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchParams] = useSearchParams();
    const id = searchParams.get('subAxisId')
    useEffect(() => {
        getStandards()
    }, [id, pageNumber, pageSize])
    const getStandards = async () => {
        const query = ApiUrls.query({PageNumber: pageNumber, PageSize: pageSize})
        const result = await Api.get(ApiUrls.getStandards(id, query))
        if (result.success) {
            setRows(result.data.items)
            setTotalCount(result.data.totalItems)
        }
    }
    const changeStatus = async (item) => {
        const result = await Api.patch(ApiUrls.changeStatusStandard(item.guid));
        if (result.success) {
            getStandards()
            MyAlert.success(Str.standardChangeStatus)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
    const columns = [
        {label: Str.standardTitle, value: row => row.title, display: "title"},
        {label: Str.standardCode, value: row => row.code, display: "code"},
        {label: Str.order, value: row => row.sortOrder, display: "order"},
        {label: Str.weightedCoefficient, value: row => row.weightedCoefficient, display: "weightedCoefficient"},
        {label: Str.operation, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-sitemap font-icon color-green"/></Link>, display: ""},
        {label: Str.gauges, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-gauge font-icon text-danger"/></Link>, display: ""},
        {label: Str.status, value: row => (<div className={`toggle-container ${!row.isDeleted ? 'active' : ''}`}>
                <button className={`toggle-button ${!row.isDeleted ? 'active' : ''}`} onClick={() => changeStatus(row)}>
                    <div className="slider" />
                </button>
            </div>), display: ""},
        {label: Str.edit, value: row => (<Link to={Address.editStandard(row.guid)}><i className="fa fa-edit font-icon"/></Link>), display: ""},
    ]
    return (
        <Card>
            <CardHeader>
                <div className="d-flex justify-content-between card-header-custom"><span
                    className="text-header">{Str.standardList}</span>
                    <span className="btn-add btn d-inline-flex"><Link to={Address.createStandard(ApiUrls.query({subAxisId: id}))} className="text-decoration-none create-link">{Str.createStandard}</Link><i className="fa fa-plus px-1 add-icon"/></span>
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
export default StandardList