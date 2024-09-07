import React, { useState, useEffect } from "react";
import ReactIconsSelector from "./ReactIconsSelector";
import libraries from "./libraries";
export default {
  title: "Icon Selector Modal",
  component: ReactIconsSelector,
};

export const Default = () => {
  const [selectedIcon, setSelectedIcon] = useState({
    name: "TbAnalyze",
    library: "Tabler Icons",
  });

  return (
    <div>
      <ReactIconsSelector

        value={selectedIcon}
        onChange={setSelectedIcon}
        buttonStyle={{ width: 200, fontSize: 40 }}
      />

      <div style={{ color: "red", fontSize: 100 }}>
        {React.createElement(
          libraries[selectedIcon.library][selectedIcon.name]
        )}
      </div>
    </div>
  );
};
