import { Link, useLocation } from 'react-router-dom'
import routes from "../../dev/routes";
const MyBreadcrumb = () => {
    const currentUrl = useLocation().pathname;
    const getRouteName = (pathname, routes) => {
        const currentRoute = routes.find((route) => route.path === pathname)
        return currentRoute ? currentRoute.rtlName : false

        // const route = routes.find((r) => {
        //     const routeSegments = r.path.split('/').filter((x) => x);
        //     const pathSegments = pathname.split('/').filter((x) => x);
        //     if (routeSegments.length !== pathSegments.length) return false;
        //     return routeSegments.every((segment, i) => {
        //         return segment.startsWith(':') || segment === pathSegments[i];
        //     });
        // });
        // return route ? route.rtlName : pathname;
    }
    const getBreadcrumbs = (location) => {
        const breadcrumbs = []
        location.split('/').reduce((prev, curr, index, array) => {
            const currentPathname = `${prev}/${curr}`
            const routeName = getRouteName(currentPathname, routes)
            routeName &&
            breadcrumbs.push({
                pathname: currentPathname,
                name: routeName,
                active: index + 1 === array.length ? true : false,
            })
            return currentPathname
        })
        return breadcrumbs
    }
    const breadcrumbs = getBreadcrumbs(currentUrl)
    return (
        <nav className="breadcrumb-wrapper">
            {currentUrl !== '/dashboard' ? (<><Link className="breadcrumb-link" to="/dashboard"><i className="fa fa-home px-1"/>داشبورد</Link><span className="px-1"><i className="fa fa-angle-left arrow"/></span></>) : ""}
            {breadcrumbs.map((item, index) => (
                <>
                    <Link className={`breadcrumb-link ${item.active ? 'active' : ''}`} to={item.pathname}
                    >
                        {item.pathname == '/dashboard' ? (<i className="fa fa-home px-1"/>) : ""}
                        {item.name}
                    </Link>
                    {breadcrumbs.length === index + 1 ? "" : <span className="px-1"><i className="fa fa-angle-left arrow"/></span>}
                </>
            ))}
        </nav>
    );
}
export default MyBreadcrumb