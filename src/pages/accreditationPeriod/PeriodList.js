import {useEffect, useState} from "react";
import Api from "../../dev/service/Api";
import ApiUrls from "../../dev/service/ApiUrls";
import {Link} from "react-router-dom";
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import FilterBox from "./FilterBox";
import Grid from "../../components/grid/Grid";
import Str from "../../dev/localization";
import DateHelper from "../../dev/helpers/DateHelper";
import Address from "../../dev/helpers/Address";
import {MyAlert} from "../../components/feature/MyAlert";

const PeriodList = () => {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [filters, setFilters] = useState({});

    useEffect(() => {
        getCredibilityPeriod()
    }, [ pageNumber, pageSize])
    const getCredibilityPeriod = async () => {
        const query = ApiUrls.query({PageNumber: pageNumber, PageSize: pageSize, isDeleted: false})
        const result = await Api.get(ApiUrls.getCredibilityList(query))
        if (result.success) {
            setRows(result.data.items)
            setTotalCount(result.data.totalItems)
        }
    }
    const handleToggle = (item) => {

    }
    const columns = [
        {label: Str.accreditationListTitle, value: row => row.title, display: "title"},
        {label: Str.creationTime, value: row => DateHelper.toJalali(row.creationDate), display: "creationDate"},
        {label: Str.timeOfLastEdit, value: row => DateHelper.toJalali(row.updateDate), display: "updateDate"},
        {label: Str.createBy, value: row => row.createBy, display: "createBy"},
        {label: Str.lastEditBy, value: row => row.updateBy, display: "updateBy"},
        {label: Str.periodLength, value: row => Str.betweenTwoTime(DateHelper.toJalali(row.startDate), DateHelper.toJalali(row.endDate)) , display: "periodLength"},
        {label: Str.recalculateResult, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-calculator font-icon color-Purple"/></Link> , display: ""},
        {label: Str.quickAccessSanjeh, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-accessible-icon font-icon color-pink"/></Link>, display: ""},
        {label: Str.mehvars, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-door-open font-icon color-orange"/></Link>},
        {label: Str.operation, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-sitemap font-icon color-green"/></Link>, display: ""},
        {label: Str.copyOfPeriod, value: row => <Link className="text-decoration-none" to={'/'}><i className="fa fa-copy font-icon"/></Link>, display: ""},
        {label: Str.status, value: row => (<div className={`toggle-container ${!row.isDeleted ? 'active' : ''}`}>
                <button className={`toggle-button ${!row.isDeleted ? 'active' : ''}`} onClick={() => handleToggle(row)}>
                    <div className="slider" />
                </button>
            </div>), display: ""},
        {label: Str.edit, value: row => (<Link to={Address.editAccreditationPeriod(row.guid)}><i className="fa fa-edit font-icon"/></Link>), display: ""},
        {label: Str.delete, value: row => (<i className="fa fa-trash text-danger font-icon" onClick={() => deleteAccreditation(row.guid)}/>), display: ""},
    ]
    const deleteAccreditation = async (id) => {
      const result = await Api.delete(ApiUrls.deleteAccreditationPeriod(id))
        if (result.success) {
            getCredibilityPeriod()
            MyAlert.success(Str.successOperation)
        } else {
            MyAlert.error(result.data?.title ?? Str.operationFail)
        }
    }
    return (
        <Row>
            <Col xs="12">
                <FilterBox getFilters={(state) => setFilters(state)}/>
            </Col>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <div className="d-flex justify-content-between card-header-custom"><span
                            className="text-header">{Str.accreditationPeriodList}</span>
                            <span className="btn btn-primary d-inline-flex"><Link to={Address.createAccreditationPeriod()} className="text-decoration-none create-link">{Str.addAccreditationPeriod}</Link><i className="fa fa-plus px px-1"/></span>
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
    );
}
export default PeriodList