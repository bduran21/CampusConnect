import React from "react";
import PropTypes from "prop-types";
import "../styles/ToggleSwitch.scss";

const ToggleSwitch = ({ id, checked, onChange, optionLabels }) => {
  const handleKeyPress = (e) => {
    if (e.keyCode !== 32) return; // Space key to toggle
    e.preventDefault();
    onChange(!checked);
  };

  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {id ? (
        <label
          className="toggle-switch-label"
          htmlFor={id}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          <span
            className="toggle-switch-inner"
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
          />
          <span className="toggle-switch-switch" />
        </label>
      ) : null}
    </div>
  );
};

ToggleSwitch.defaultProps = {
  optionLabels: ["Grid", "List"], // Default labels
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired, // Required unique ID for accessibility
  checked: PropTypes.bool.isRequired, // Whether the switch is on
  onChange: PropTypes.func.isRequired, // Handler when the switch is toggled
  optionLabels: PropTypes.arrayOf(PropTypes.string), // Labels for the two states
};

export default ToggleSwitch;