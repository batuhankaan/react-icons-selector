import React, { useState } from "react";
import ReactIconsSelector, { RenderIcon } from "../ReactIconsSelector";
export default {
  title: "Icon Selector Modal",
  component: ReactIconsSelector,
  argTypes: {
    iconSize: {
      control: { type: "range", min: 20, max: 60, step: 5 },
      defaultValue: 35
    }
  }
};

export const Default = ({ iconSize }) => {
  const [selectedIcon, setSelectedIcon] = useState({
    name: "TbAnalyze",
    library: "Tabler Icons",
  });
  const [svgString, setSvgString] = useState("");
  
  const containerStyles = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px"
  };
  
  const sectionStyles = {
    marginTop: "30px",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  };
  
  const headingStyles = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "15px",
    borderBottom: "1px solid #f0f0f0",
    paddingBottom: "10px"
  };
  
  const labelStyles = {
    fontSize: "13px",
    color: "#666",
    marginBottom: "8px",
    fontWeight: "500"
  };
  
  const iconContainerStyles = {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "15px"
  };
  
  const iconBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    minWidth: "100px"
  };

  return (
    <div style={containerStyles}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
        <ReactIconsSelector
          value={selectedIcon}
          onChange={setSelectedIcon}
          buttonStyle={{ 
            width: 200, 
            height: 60,
            fontSize: 40,
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}
          iconSize={iconSize}
          onSvgExport={(svg) => setSvgString(svg)}
        />
      </div>

      <div style={sectionStyles}>
        <h3 style={headingStyles}>Selected Icon</h3>
        <div style={iconContainerStyles}>
          <div style={iconBoxStyles}>
            <div style={labelStyles}>Default</div>
            <RenderIcon iconData={selectedIcon} size={50} />
          </div>
          
          <div style={iconBoxStyles}>
            <div style={labelStyles}>Red Color</div>
            <RenderIcon iconData={selectedIcon} size={50} color="red" />
          </div>
          
          <div style={iconBoxStyles}>
            <div style={labelStyles}>With Shadow</div>
            <RenderIcon 
              iconData={selectedIcon} 
              size={50} 
              color="blue" 
              style={{ filter: "drop-shadow(0 0 5px rgba(0,0,0,0.5))" }} 
            />
          </div>
          
          <div style={iconBoxStyles}>
            <div style={labelStyles}>Custom Style</div>
            <RenderIcon 
              iconData={selectedIcon} 
              size={50}
              style={{ 
                color: "green", 
                transform: "rotate(15deg)", 
                backgroundColor: "#f5f5f5", 
                padding: 10, 
                borderRadius: 8 
              }} 
            />
          </div>
        </div>
      </div>
      
      <div style={sectionStyles}>
        <h3 style={headingStyles}>SVG Output</h3>
        <pre style={{ 
          background: "#f7f7f7", 
          padding: "15px",
          borderRadius: "6px",
          maxHeight: "150px", 
          overflow: "auto",
          fontSize: "12px",
          color: "#333",
          border: "1px solid #eee",
          fontFamily: "monospace"
        }}>
          {svgString}
        </pre>
      </div>
    </div>
  );
};
