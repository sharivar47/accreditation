import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import Str from "../../dev/localization";
import {Link, useParams, useSearchParams} from "react-router-dom";
import Address from "../../dev/helpers/Address";
import Grid from "../../components/grid/Grid";
import {useEffect, useState} from "react";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {MyAlert} from "../../components/feature/MyAlert";

const AxisList = () => {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchParams] = useSearchParams();
    const id = searchParams.get('accreditationId')
    const columns = [
        {label: Str.axisTitle, value: row => row.title, display: "title"},
        {label: Str.accreditationTitle, value: row => row.etebarDorehTitle, display: "accreditationTitle"},
        {label: Str.orgType, value: row => row.orgTypeTitle, display: "orgTitle"},
        {label: Str.order, value: row => row.sortOrder, display: "order"},
        {label: Str.weightedCoefficient, value: row => row.weightedCoefficient, display: "weightedCoefficient"},
        {label: Str.subAxis, value: row => <Link className="text-decoration-none" to={Address.subAxises(ApiUrls.query({axisId: row.guid}))}><i className="fa fa-exchange-alt font-icon text-danger"/></Link>, display: ""},
        {label: Str.status, value: row => (<div className={`toggle-container ${!row.isDeleted ? 'active' : ''}`}>
                <button className={`toggle-button ${!row.isDeleted ? 'active' : ''}`} onClick={() => changeStatus(row)}>
                    <div className="slider" />
                </button>
            </div>), display: ""},
        {label: Str.edit, value: row => (<Link to={Address.editAxis(row.guid)}><i className="fa fa-edit font-icon"/></Link>), display: ""},
    ]
    useEffect(() => {
        getAxises()
    }, [id, pageNumber, pageSize])
    const getAxises = async () => {
        const query = ApiUrls.query({PageNumber: pageNumber, PageSize: pageSize})
        const result = await Api.get(ApiUrls.getAxises(id, query))
        if (result.success) {
            setRows(result.data.items)
            setTotalCount(result.data.totalItems)
        }
    }
    const changeStatus = async (item) => {
        const result = await Api.patch(ApiUrls.changeStatusAxis(item.guid))
        if (result.success) {
            getAxises()
            MyAlert.success(Str.successChangeStatusAxis)
        } else {
            MyAlert.error(result.data.title ?? Str.operationFail)
        }
    }
    return(
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex justify-content-between card-header-custom"><span
                            className="text-header">{Str.axisList}</span>
                            <span className="btn-add btn d-inline-flex"><Link to={Address.createAxis()} className="text-decoration-none create-link">{Str.createAxis}</Link><i className="fa fa-plus px-1 add-icon"/></span>
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
            </Col>
        </Row>
    )
}
export default AxisList