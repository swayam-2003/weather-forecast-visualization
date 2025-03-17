import React from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  position: absolute;
  background: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};
  padding: 8px;
  border-radius: 4px;
  pointer-events: none;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s;
  transform: translate(-50%, -100%);
`;

const Tooltip = ({ visible, data, darkMode }) => {
  if (!visible || !data.value) return null;

  return (
    <TooltipContainer visible={visible} darkMode={darkMode} style={{ left: data.x, top: data.y }}>
      <div>Temperature: {data.value}°C</div>
    </TooltipContainer>
  );
};

export default Tooltip;