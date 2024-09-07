
# React Icons Selector

A simple and customizable icon selector component supporting multiple icon libraries, built with the react-icons library for use in your React applications.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Supported Icon Libraries](#supported-icon-libraries)
- [Customization](#customization)
- [Dependencies](#dependencies)
- [Contributors](#contributors)
- [License](#license)

## Features

- **Multiple Icon Library Support:** Supports popular libraries like Font Awesome, Material Design Icons, Ionicons, and more.
- **Search Functionality:** Allows searching icons by name with a delay setting for performance optimization.
- **Modal Interface:** An interactive modal for selecting icons.
- **Customizable Interface:** Options to customize button styles and language text.
- **Dynamic Icon Loading:** Icons are dynamically loaded based on user input.

## Installation

Install the necessary dependencies to add this component to your project:

```bash
npm install react-icons-selector --save
```

## Usage

Here’s an example of how to use the **React Icons Selector** component in your project:

```jsx
import React, { useState } from 'react';
import ReactIconsSelector from 'react-icons-selector';

const MyComponent = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  return (
    <div>
      <ReactIconsSelector
        value={selectedIcon}
        onChange={setSelectedIcon}
      />
    </div>
  );
};

export default MyComponent;
```

## Customization

Here’s an example of using the **React Icons Selector** component with custom settings:

```jsx
import React, { useState } from 'react';
import ReactIconsSelector from 'react-icons-selector';
import libraries from "react-icons-selector/lib/libraries";

const MyComponent = () => {
  const [selectedIcon, setSelectedIcon] = useState({
    name: 'MdOutlineSearch',
    library: 'Material Design Icons',
  });

  return (
    <div>
      <ReactIconsSelector
        value={selectedIcon}
        onChange={setSelectedIcon}
        icons={["Font Awesome 5", "Ant Design Icons", "css.gg"]}
        buttonStyle={{ width: 200, fontSize: 40 }}
        buttonClassName="btn"
        language={{
            homeText: "Home",
            headerText: "Pick Your Icon",
            noIconsFoundText: "No icons matched your search.",
            homeSearchText: "Search icons...",
            buttonText: "Choose an Icon",
        }}
      />

      <div style={{ fontSize: 100 }}>
        {React.createElement(
          libraries[selectedIcon.library][selectedIcon.name]
        )}
      </div>
    </div>
  );
};

export default MyComponent;
```

## Supported Icon Libraries

This selector supports the following icon libraries:

- Font Awesome 5
- Ant Design Icons
- BoxIcons
- Bootstrap Icons
- css.gg
- Devicons
- Feather
- Game Icons
- Github Octicons
- Grommet Icons
- Heroicons
- Ionicons 4 & 5
- Material Design Icons
- Remix Icons
- Simple Icons
- Tabler Icons
- Typicons
- Phosphor Icons
- VS Code Icons
- Weather Icons
- Line Awesome
- IcoMoon Free
- Lucide
- Circum Icons

## Dependencies

The following libraries are required for this project:

- `react-icons`: A library for using popular icons in React applications.

## Contributors

- [Batuhan Kaan](https://github.com/batuhankaan)

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.