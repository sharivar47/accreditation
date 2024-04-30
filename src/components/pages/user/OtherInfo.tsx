import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import Address from "../../../dev/helpers/Address";
import React, {useState} from "react";
import UserController from "../../../dev/controllers/UserController";
import PermissionController from "../../../dev/controllers/PermissionController";

const OtherInfo = () => {
    const {id} = useParams();
    const data = {
        groups: [
            {
                name: "groupName1",
                action: [{name: "action5"}],
                roles: [
                    {
                        name: "roleName1",
                        actions: [
                            {name: "action1"},
                            {name: "action2"},
                        ]
                    },
                    {
                        name: "roleName2",
                        actions: [
                            {name: "action3"},
                            {name: "action4"},
                        ]
                    }
                ]
            },
            {
                name: "groupName2",
                action: [{name: "action5"}],
                roles: [
                    {
                        name: "roleName7",
                        actions: [
                            {name: "action8"},
                            {name: "action9"},
                        ]
                    },
                    {
                        name: "roleName3",
                        actions: [
                            {name: "action34"},
                            {name: "action42"},
                        ]
                    }
                ]
            }
        ],
        roles: [{name: "role3", actions: [{name: "act1"}]}],
        actions: [{name: "action6"}, {name: "action5"}]
    }
    const [openGroup, setOpenGroup] = useState("");
    const [openRole, setOpenRole] = useState("");
    const groupClick = (item: string) => {
        const val = item == openGroup ? "" : item
        setOpenGroup( val )

    }
    const roleClick = (item: string) => {
        const val = item == openRole ? "" : item
        setOpenRole( val )
    }
    const detachRoleFromUser = async (id: string) => {
        const result = await UserController.removeUserFromRole({});
    }
    const detachPermissionFromUser = async (id: string) => {
        const result = await PermissionController.removePermissionFromUser({});
    }
    const detachGroupFromUser = async (id: string) => {
        const result = await UserController.removeUserFromGroup({})
    }
    return( <Row>
        <Col xs="12" md={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between card-header-custom"><span
                        className="text-header">لیست گروه های کاربر</span>
                        <Link to={Address.userGroups(id)}><span className=" d-inline-flex"><i className="fa fa-plus px px-1"/></span></Link>
                    </div>
                </CardHeader>
                <CardBody>
                    <ul className="list-none" >
                        {
                            data.groups.map((group) => {
                                return(<li>
                                    <span className="cursor-pointer" onClick={() => groupClick(group.name)}><i className={`px-1 ${openGroup == group.name ? 'fa fa-minus-square' : 'fa fa-plus-square'}`}/>{group.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachGroupFromUser(group.name)}/></span>
                                    {
                                        openGroup === group.name && (
                                            <ul className="list-none">
                                                {
                                                    group.roles.map((role) => {
                                                        return(<li>
                                                            <span className="cursor-pointer" onClick={() => roleClick(role.name)}><i className={`px-1 ${openRole == role.name ? 'fa fa-minus-square' : 'fa fa-plus-square'}`}/>{role.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachRoleFromUser(role.name)}/></span>
                                                            {
                                                                openRole == role.name && (
                                                                    <ul>
                                                                        {role.actions.map((action) => {
                                                                            return(<li className="cursor-pointer list-none">{action.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachPermissionFromUser(action.name)}/></li>)
                                                                        })}
                                                                    </ul>
                                                                )
                                                            }
                                                        </li>);
                                                    })
                                                }
                                            </ul>
                                        )
                                    }
                                </li>)
                            })
                        }
                    </ul>
                </CardBody>
            </Card>
        </Col>
        <Col xs="12" md={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between card-header-custom"><span
                        className="text-header">لیست نقش های کاربر</span>
                        <Link to={Address.userRoles(id)}><span className=" d-inline-flex"><i className="fa fa-plus px px-1"/></span></Link>
                    </div>
                </CardHeader>
                <CardBody>
                    <ul className="list-none">
                        {
                            data.roles.map((role) => {
                                return(<li>
                                    <span className="cursor-pointer" onClick={() => roleClick(role.name)}><i className={`px-1 ${openRole == role.name ? 'fa fa-minus-square' : 'fa fa-plus-square'}`}/>{role.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachRoleFromUser(role.name)}/></span>
                                    {
                                        openRole == role.name && (
                                            <ul className="list-none">
                                                {role.actions.map((action) => {
                                                    return(<li className="cursor-pointer">{action.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachPermissionFromUser(action.name)}/></li>)
                                                })}
                                            </ul>
                                        )
                                    }
                                </li>);
                            })
                        }
                    </ul>
                </CardBody>
            </Card>
        </Col>
        <Col xs="12" md={4}>
            <Card>
                <CardHeader>
                    <div className="d-flex justify-content-between card-header-custom"><span
                        className="text-header">لیست مجوزهای کاربر</span>
                        <Link to={Address.userPermission(id)}><span className="d-inline-flex"><i className="fa fa-plus px px-1"/></span></Link>
                    </div>
                </CardHeader>
                <CardBody>
                    <ul className="list-none">
                        {data.actions.map((action) => {
                            return(<li className="cursor-pointer">{action.name}<i className="fa fa-trash text-danger px-2 delete-icon-quick"  onClick={() => detachPermissionFromUser(action.name)}/></li>)
                        })}
                    </ul>
                </CardBody>
            </Card>
        </Col>
    </Row>)
}
export default OtherInfo