import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import libraries from "./libraries";
import "./IconSelector.css";
import { renderToStaticMarkup } from "react-dom/server";

// Helper function to render selected icon
export const RenderIcon = ({ iconData, size, color, style, className }) => {
  if (!iconData || !iconData.name || !iconData.library) return null;
  
  const IconComponent = libraries[iconData.library][iconData.name];
  if (!IconComponent) return null;
  
  return React.createElement(IconComponent, { 
    size: size || 24, 
    color: color,
    style,
    className
  });
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ReactIconsSelector = ({
  icons = Object.keys(libraries).filter((library) => library !== "Home"),
  language = {
    homeText: "All Icons",
    headerText: "Icon Selector",
    noIconsFoundText: "No icons found.",
    homeSearchText: "Search icons (min 2 chars)",
    buttonText: "Select Icon",
  },
  value,
  onChange,
  buttonStyle = {},
  buttonClassName = "",
  onSvgExport,
  iconSize = 35,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeLibrary, setActiveLibrary] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [displayedIcons, setDisplayedIcons] = useState([]);
  const buttonRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);

  // Stable event handler using useCallback
  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && 
        !modalRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)) {
      closeModal();
    }
  }, [closeModal]);

  // Attach and detach click outside listener
  useEffect(() => {
    if (modalIsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalIsOpen, handleClickOutside]);
  

  const openModal = useCallback(() => {
    setModalIsOpen(true);
    resetState();
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      // Use a smaller fixed width for more consistent appearance
      const tooltipWidth = Math.min(350, Math.max(280, rect.width * 1.2));
      
      // Calculate left position to center tooltip relative to button
      const buttonCenter = rect.left + (rect.width / 2);
      let left = buttonCenter - (tooltipWidth / 2);
      
      // Ensure tooltip doesn't go offscreen
      if (left < 10) left = 10;
      if (left + tooltipWidth > windowWidth - 10) left = windowWidth - tooltipWidth - 10;
      
      setTooltipPosition({
        top: rect.bottom + window.scrollY + 5,
        left,
        width: tooltipWidth
      });
    }
  }, [resetState]);
  

  // Update closeModal to use the ref
  const closeModal = useCallback(() => {
    closeModalRef.current();
  }, []);

  // Move resetState to avoid closure issues
  const resetState = useCallback(() => {
    setDisplayedIcons([]);
  }, []);

  const handleLibraryChange = useCallback((library) => {
    setActiveLibrary(library);
    resetState();
  }, [resetState]);

  const getSvgString = useCallback((iconComponent) => {
    if (!iconComponent) return null;
    
    const element = React.createElement(iconComponent, { size: iconSize });
    const svg = renderToStaticMarkup(element);
    return svg;
  }, [iconSize]);

  // Stable reference to closeModal to prevent dependency cycles
  const closeModalRef = useRef(() => {
    setModalIsOpen(false);
    setActiveLibrary("Home");
    setSearchTerm("");
    setDebouncedSearchTerm("");
  });

  const handleIconSelect = useCallback((name, libraryName) => {
    const selectedLibrary = libraryName || activeLibrary;
    const iconData = {
      name,
      library: selectedLibrary,
    };
    
    onChange(iconData);
    
    if (onSvgExport) {
      const iconComponent = libraries[selectedLibrary][name];
      const svgString = getSvgString(iconComponent);
      onSvgExport(svgString, iconData);
    }
    
    closeModalRef.current();
  }, [onChange, onSvgExport, activeLibrary, getSvgString]);

  const debounceSearch = debounce((value) => {
    setDebouncedSearchTerm(value);
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 2) {
      debounceSearch(value);
    } else {
      setDebouncedSearchTerm("");
      setDisplayedIcons([]);
    }
  };

  // Use useEffect directly instead of a separate callback to avoid dependency cycles
  useEffect(() => {
    // Reset icons if search term is too short in Home view
    if (activeLibrary === "Home" && debouncedSearchTerm.length < 2) {
      setDisplayedIcons([]);
      return;
    }
    
    // Prepare icons based on the active library and search term
    if (activeLibrary === "Home") {
      const iconsList = [];
      icons.forEach((libraryName) => {
        const lib = libraries[libraryName];
        Object.keys(lib).forEach((icon) => {
          if (icon.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) {
            iconsList.push({
              name: icon,
              IconComponent: lib[icon],
              libraryName,
            });
          }
        });
      });

      setDisplayedIcons(iconsList);
    } else {
      const lib = libraries[activeLibrary];
      const allIcons = Object.keys(lib).filter((icon) =>
        icon.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setDisplayedIcons(
        allIcons.map((icon) => ({
          name: icon,
          IconComponent: lib[icon],
        }))
      );
    }
  }, [debouncedSearchTerm, activeLibrary, icons]);

  const memoizedIconsList = useMemo(() => displayedIcons, [displayedIcons]);

  const renderModalContent = () => (
    <>
      <div className="riselector-modal-header">
        <h3>{language.headerText}</h3>
        <button
          type="button"
          className="riselector-close-modal"
          onClick={closeModal}
        >
          {React.createElement(libraries["Ionicons 4"]["IoIosClose"], {
            size: 18,
          })}
        </button>
      </div>
      <div className="riselector-modal-body">
        <div className="riselector-sidebar">
          <div className="riselector-search-container">
            <input
              type="text"
              placeholder={language.homeSearchText}
              value={searchTerm}
              onChange={handleSearchChange}
              autoFocus
            />
            <div className="riselector-search-icon">
              {React.createElement(
                libraries["Material Design Icons"]["MdOutlineSearch"],
                { size: 16 }
              )}
            </div>
          </div>
          <div className="riselector-sidebar-container" ref={sidebarRef}>
            <ul>
              <li
                className={activeLibrary === "Home" ? "active" : ""}
                onClick={() => handleLibraryChange("Home")}
              >
                {language.homeText}
              </li>
              {icons.map((library, key) => (
                <li
                  key={key}
                  className={activeLibrary === library ? "active" : ""}
                  onClick={() => handleLibraryChange(library)}
                >
                  {library}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="riselector-icons-container">
          <div className="riselector-icon-grid">
            {memoizedIconsList.length === 0 && searchTerm.length >= 2 && (
              <p>{language.noIconsFoundText}</p>
            )}

            {memoizedIconsList.length > 0 &&
              memoizedIconsList.map(
                ({ name, IconComponent, libraryName }, index) => {
                  if (typeof IconComponent !== "function") return null;

                  return (
                    <div
                      key={index}
                      className="riselector-icon-item"
                      onClick={() => handleIconSelect(name, libraryName)}
                      title={name}
                    >
                      {React.createElement(IconComponent, { size: Math.min(20, iconSize - 15) })}
                      <p>{name}</p>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <button
        type="button"
        className={buttonClassName}
        style={buttonStyle}
        onClick={openModal}
        ref={buttonRef}
      >
        {value
          ? <RenderIcon iconData={value} size={iconSize} />
          : language.buttonText}
      </button>

      {modalIsOpen && (
        <div 
          className="riselector-tooltip" 
          style={tooltipPosition ? {
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            width: `${tooltipPosition.width}px`,
          } : {}}
          ref={modalRef}
        >
          <div className="riselector-modal-content" style={{
            width: '100%', 
            margin: 0, 
            maxHeight: '60vh', 
            boxSizing: 'border-box',
            maxWidth: '100%',
            borderRadius: '8px'
          }}>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactIconsSelector;