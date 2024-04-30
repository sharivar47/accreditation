import React from "react";

const MySwitch = ({isOn, handleToggle, onColor, text, id}) => {
    return (
        <div className="switch-container">
            <span>{text}</span>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={id}
                type="checkbox"
            />
            <label
                style={{ background: isOn && onColor }}
                className="react-switch-label ml-0"
                htmlFor={id}
            >
                <span className="react-switch-button" />
            </label>
        </div>
    );
}
export default MySwitch
