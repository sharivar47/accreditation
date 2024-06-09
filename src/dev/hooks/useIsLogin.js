import {useSelector} from "react-redux";
import {selectToken} from "../redux/userInfoSlice";
import {jwtDecode} from "jwt-decode";

const useIsLogin = () => {
    const token = useSelector(selectToken)
    if (token) {
        const decoded = jwtDecode(token);
        const expireTime = new Date(decoded.exp * 1000);
        const currentTime = new Date();
        return token !== "" && expireTime.getTime() > currentTime.getTime();
    } else {
        return false
    }
}
export default useIsLogin