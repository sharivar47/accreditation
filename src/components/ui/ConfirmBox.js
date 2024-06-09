import MyModal from "../features/MyModal";
import React from "react";
 interface IProp {
     confirmAction: any,
     onClose: any
}
const ConfirmBox = (props: IProp) => {
    return(
        <div>
            <div className="mb-3">آیا از انجام اینکار مطمئنید؟</div>
            <div><span className="btn btn-info" onClick={() => {
                props.confirmAction()
                props.onClose()
            }}>بله</span><span className="btn btn-danger" onClick={() => props.onClose()}>خیر</span></div>
        </div>
    )
}

export default ConfirmBox