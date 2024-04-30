import {toast} from "react-toastify";
export class MyAlert {
  static success(message, options) {
    return toast(message, {type: "success", ...options})
  }
  static error(message, options) {
    return toast(message, {type: "error", ...options})
  }
}
