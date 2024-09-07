import React, { useState, useEffect, useMemo, useCallback } from "react";
import libraries from "./libraries";
import "./assets/IconSelector.css";

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
    homeText: "Home",
    headerText: "Icon Selector",
    noIconsFoundText: "No icons found.",
    homeSearchText: "Please enter at least 2 characters..",
    buttonText: "Select Icon",
  },
  value,
  onChange,
  buttonStyle = {},
  buttonClassName = "",
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeLibrary, setActiveLibrary] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [displayedIcons, setDisplayedIcons] = useState([]);

  const openModal = () => {
    setModalIsOpen(true);
    resetState();
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveLibrary("Home");
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const resetState = () => {
    setDisplayedIcons([]);
  };

  const handleLibraryChange = useCallback((library) => {
    setActiveLibrary(library);
    resetState();
  }, []);

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

  const loadIcons = useCallback(() => {
    if (activeLibrary === "Home") {
      if (debouncedSearchTerm.length < 2) {
        setDisplayedIcons([]);
        return;
      }

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

  useEffect(() => {
    loadIcons();
  }, [debouncedSearchTerm, activeLibrary]);

  const memoizedIconsList = useMemo(() => displayedIcons, [displayedIcons]);

  return (
    <div>
      <button
        className={buttonClassName}
        style={buttonStyle}
        onClick={openModal}
      >
        {value
          ? React.createElement(libraries[value.library][value.name])
          : language.buttonText}
      </button>

      {modalIsOpen && (
        <div className="riselector-modal-overlay" onClick={closeModal}>
          <div
            className="riselector-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="riselector-modal-header">
              <h3>{language.headerText}</h3>
              <button className="riselector-close-modal" onClick={closeModal}>
                {React.createElement(libraries["Ionicons 4"]["IoIosClose"], {
                  size: 25,
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
                  />
                  <div className="riselector-search-icon">
                    {React.createElement(
                      libraries["Material Design Icons"]["MdOutlineSearch"],
                      { size: 25 }
                    )}
                  </div>
                </div>
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
              <div className="riselector-right">
                <div className="riselector-icon-display">
                  <div className="riselector-icon-grid">
                    {memoizedIconsList.length === 0 &&
                      searchTerm.length >= 2 && (
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
                              onClick={() => {
                                onChange({
                                  name,
                                  library: libraryName || activeLibrary,
                                });
                                closeModal();
                              }}
                            >
                              {React.createElement(IconComponent, { size: 35 })}
                              <p>{name}</p>
                            </div>
                          );
                        }
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactIconsSelector;
