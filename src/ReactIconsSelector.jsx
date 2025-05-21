import React, { useState, useEffect, useMemo, useRef } from "react";
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
  // Memoize the onChange callback to prevent recreation on render
  const memoizedOnChange = useMemo(() => onChange, [onChange]);
  // Store all state and functions in a ref to avoid recreating them on each render
  const stateRef = useRef({
    modalIsOpen: false,
    activeLibrary: "Home",
    searchTerm: "",
    debouncedSearchTerm: "",
    displayedIcons: [],
    tooltipPosition: null,
  });

  // DOM refs
  const buttonRef = useRef(null);
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);

  // State for controlled inputs only - kept to minimum
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [displayedIcons, setDisplayedIcons] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [activeLibrary, setActiveLibrary] = useState("Home");

  // Function refs - these don't change between renders
  const funcRef = useRef({
    handleClickOutside: null,
    openModal: null,
    closeModal: null,
    resetState: null,
    handleLibraryChange: null,
    getSvgString: null,
    handleIconSelect: null,
    loadIcons: null,
    debounceSearch: null,
  });

  // Initialize function refs only once
  if (!funcRef.current.resetState) {
    funcRef.current.resetState = () => {
      setDisplayedIcons([]);
    };

    funcRef.current.closeModal = () => {
      setModalIsOpen(false);
      setActiveLibrary("Home");
      setSearchTerm("");
      // Reset displayed icons on close
      setDisplayedIcons([]);
    };

    funcRef.current.handleClickOutside = (event) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        funcRef.current.closeModal();
      }
    };

    funcRef.current.openModal = () => {
      setModalIsOpen(true);
      funcRef.current.resetState();
      
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
    };

    funcRef.current.handleLibraryChange = (library) => {
      setActiveLibrary(library);
      funcRef.current.resetState();
    };

    funcRef.current.getSvgString = (iconComponent) => {
      if (!iconComponent) return null;
      const element = React.createElement(iconComponent, { size: iconSize });
      const svg = renderToStaticMarkup(element);
      return svg;
    };

    funcRef.current.handleIconSelect = (name, libraryName) => {
      const selectedLibrary = libraryName || activeLibrary;
      const iconData = {
        name,
        library: selectedLibrary,
      };
      
      // Eğer yeni seçilen ikon mevcut değerle aynı değilse onChange'i çağır
      // Bu, sonsuz döngüleri önler
      if (!value || 
          value.name !== iconData.name || 
          value.library !== iconData.library) {
        memoizedOnChange(iconData);
      }
      
      if (onSvgExport) {
        const iconComponent = libraries[selectedLibrary][name];
        const svgString = funcRef.current.getSvgString(iconComponent);
        onSvgExport(svgString, iconData);
      }
      
      funcRef.current.closeModal();
    };

    funcRef.current.loadIcons = (debouncedSearchTermParam, activeLibraryParam) => {
      const term = debouncedSearchTermParam || "";
      const library = activeLibraryParam || "Home";

      if (library === "Home") {
        if (term.length < 2) {
          setDisplayedIcons([]);
          return;
        }

        const iconsList = [];
        icons.forEach((libraryName) => {
          const lib = libraries[libraryName];
          Object.keys(lib).forEach((icon) => {
            if (icon.toLowerCase().includes(term.toLowerCase())) {
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
        const lib = libraries[library];
        const allIcons = Object.keys(lib).filter((icon) =>
          icon.toLowerCase().includes(term.toLowerCase())
        );
        setDisplayedIcons(
          allIcons.map((icon) => ({
            name: icon,
            IconComponent: lib[icon],
          }))
        );
      }
    };

    // Create a stable debounced function
    funcRef.current.debounceSearch = debounce((value) => {
      funcRef.current.loadIcons(value, activeLibrary);
    }, 300);
  }

  // Update internal state when props change
  useEffect(() => {
    stateRef.current = {
      ...stateRef.current,
      modalIsOpen,
      activeLibrary,
      searchTerm,
      displayedIcons
    };
  }, [modalIsOpen, activeLibrary, searchTerm, displayedIcons]);

  // Handle outside clicks
  useEffect(() => {
    if (modalIsOpen) {
      document.addEventListener('mousedown', funcRef.current.handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', funcRef.current.handleClickOutside);
    };
  }, [modalIsOpen]);

  // Load icons when search term or library changes
  useEffect(() => {
    // We need to call loadIcons directly with the current state values
    // to ensure it always has the latest values
    funcRef.current.loadIcons(searchTerm, activeLibrary);
  }, [searchTerm, activeLibrary]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 2) {
      // Call the stable debounced function
      funcRef.current.debounceSearch(value);
    } else {
      setDisplayedIcons([]);
    }
  };

  // Memoize icons list to prevent unnecessary re-renders
  const memoizedIconsList = useMemo(() => displayedIcons, [displayedIcons]);

  // Modal content component
  const renderModalContent = () => (
    <>
      <div className="riselector-modal-header">
        <h3>{language.headerText}</h3>
        <button
          type="button"
          className="riselector-close-modal"
          onClick={funcRef.current.closeModal}
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
                onClick={() => funcRef.current.handleLibraryChange("Home")}
              >
                {language.homeText}
              </li>
              {icons.map((library, key) => (
                <li
                  key={key}
                  className={activeLibrary === library ? "active" : ""}
                  onClick={() => funcRef.current.handleLibraryChange(library)}
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
                      onClick={() => funcRef.current.handleIconSelect(name, libraryName)}
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
        onClick={funcRef.current.openModal}
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