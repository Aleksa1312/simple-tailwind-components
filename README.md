# Component Documentation:

This documentation provides an overview of the components included in the code snippet and their usage. It includes information about the available props, their functionality, and the elements within each component that can be styled.

# Philosophy:

The components provided follow a modular approach, allowing developers to easily incorporate them into their projects. Each component focuses on a specific functionality and can be customized using Tailwind CSS utility classes. These components are designed to enhance user interfaces and provide interactive elements for a seamless user experience.

## Avatar Component

The Avatar component displays a user's profile picture along with a fallback display when the image is unavailable.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/3d6c5668-d074-4c98-b753-ac140773b276)

### Usage:
```jsx
import Avatar from "@/components/avatar/Avatar";

// Usage Example
<Avatar>
  <Avatar.Image
    src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
    alt="profile picture"
  />
  <Avatar.Fallback>AD</Avatar.Fallback>
</Avatar>
```

### Props:

    None

### Elements:

    Avatar.Image: Renders the user's profile picture.
    Avatar.Fallback: Displays a fallback display when the profile picture is unavailable.

### Styling:

    The Avatar component can be styled using Tailwind CSS utility classes.

## Badge Component

The Badge component is used to highlight specific information with various types and styles.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/41470484-031e-43ab-b581-8e24d3bf0bdd)


### Usage:
```jsx
import Badge from "@/components/badge/Badge";

// Usage Example
<Badge>Default</Badge>
<Badge type="info">Info</Badge>
<Badge type="success">Success</Badge>
<Badge type="warning">Warning</Badge>
<Badge type="error">Error</Badge>
```
### Props:

    type (optional): Determines the type of badge. Available options are "error," "info," "warning," "success," and "default." Default value is "default".

### Elements:

    None

### Styling:

    The Badge component can be styled using Tailwind CSS utility classes.
    The type prop can be used to apply different colors and styles to the badge based on the selected type.

## Dropdown Component

The Dropdown component creates a dropdown menu with customizable content.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/17cdd909-cafd-47a6-aacf-54467ed2392a)
![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/a160b16a-204b-4f2b-8073-15ce68092918)


### Usage:
```jsx
import Dropdown from "@/components/dropdown/Dropdown";

<Dropdown>
  <Dropdown.Trigger className="px-5 py-2 bg-blue-500 rounded">Open Dropdown</Dropdown.Trigger>
  <Dropdown.Content className="w-64 py-2 bg-white rounded top-14 absolute text-black text-sm">
    {/* Dropdown Content */}
  </Dropdown.Content>
  <Dropdown.Overlay />
</Dropdown>
```

### Props:

    None

### Elements:

    Dropdown.Trigger: Renders the trigger button to open the dropdown.
    Dropdown.Content: Displays the content of the dropdown.
    Dropdown.Overlay: Covers the screen when the dropdown is open to prevent interaction with other elements.

### Styling:

    The Dropdown component can be styled using Tailwind CSS utility classes.

## Hover Component

The Hover component reveals additional content when hovering over a specific element.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/b7ab3f8d-33d9-4a1e-b40a-216bf1ba6264)
![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/0ef54161-eb96-41be-9e01-cebc20e0ace5)

### Usage:
```jsx
import Hover from "@/components/hover/Hover";

// Usage Example
<Hover>
  <Hover.Trigger>
    {/* Trigger Element */}
  </Hover.Trigger>
  <Hover.Content>
    {/* Content to display on hover */}
  </Hover.Content>
</Hover>
```

Props:

    None

### Elements:

    Hover.Trigger: Specifies the element that triggers the hover effect.
    Hover.Content: Displays the content when hovering over the trigger element.

### Styling:

    The Hover component can be styled using Tailwind CSS utility classes.

## Modal Component

The Modal component creates a modal dialog with customizable content.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/851d5dde-e1be-4529-9b10-4091e57bedba)
![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/8d54a232-82cb-411b-8278-a118f5a4e991)

### Usage:
```jsx
import Modal from "@/components/modal/Modal";

// Usage Example
<Modal>
  <Modal.Trigger className="bg-blue-500 px-5 py-2 text-white rounded">Open Modal</Modal.Trigger>
  <Modal.Content className="bg-white rounded flex flex-col justify-between text-black p-5 max-w-sm">
    {/* Modal Content */}
  </Modal.Content>
  <Modal.Overlay className="bg-black/50 backdrop-blur-sm" />
</Modal>
```

Props:

    None

### Elements:

    Modal.Trigger: Renders the button that opens the modal.
    Modal.Content: Displays the content of the modal.
    Modal.Close: Renders the button that closes the modal.
    Modal.Overlay: Covers the screen behind the modal to prevent interaction with other elements.

### Styling:

    The Modal component can be styled using Tailwind CSS utility classes.

## Progress Component

The Progress component represents a progress bar with a customizable fill.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/4f1ade20-44ca-4801-96d2-c8b92d38e9a2)

### Usage:
```jsx
import Progress from "@/components/progress/Progress";

// Usage Example
<Progress
  value={sliderValue}
  className="w-full max-w-sm bg-blue-950 h-4 flex flex-col items-start rounded-full mx-auto"
>
  <Progress.Value className="text-xs self-center" />
  <Progress.Fill className="bg-blue-500 duration-200" />
</Progress>
```

### Props:

    value (optional): Determines the progress value. Default value is 0.

### Elements:

    Progress.Value: Displays the current progress value.
    Progress.Fill: Represents the fill of the progress bar.

### Styling:

    The Progress component can be styled using Tailwind CSS utility classes.

## Slider Component (Beta)

The Slider component allows users to select a value within a defined range.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/1cf85e7e-63f9-49c9-a8f1-2e318ae2d3ac)

### Usage:
```jsx
import Slider from "@/components/slider/Slider";

// Usage Example
<Slider
  className="bg-blue-500 text-blue-500 w-full max-w-[200px]"
  value={sliderValue}
  onChange={setSliderValue}
/>
```

### Props:

    value: Represents the current value of the slider.
    onChange: Callback function triggered when the slider value changes.

### Elements:

    None

### Styling:

    The Slider component can be styled using Tailwind CSS utility classes.

## Toast Component

The Toast component displays temporary notifications to provide feedback or important information to users.

![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/3cf9942d-9679-4cca-b149-7f868c1555de)
![image](https://github.com/Aleksa1312/simple-tailwind-components/assets/102186502/626beae7-ff46-46fb-b029-b6964bc732d1)

### Usage:
```jsx
import Toast from "@/components/toast/Toast";

// Usage Example
<button onClick={() => setToastOpen(true)} className="bg-blue-500 text-white cursor-pointer px-5 py-2 rounded">
  Open Toast
</button>
<Toast open={toastOpen} onOpenChange={setToastOpen}>
  <Toast.Content className="bg-white rounded shadow flex flex-col">
    {/* Toast Content */}
  </Toast.Content>
</Toast>
```

### Props:

    open: Determines whether the toast is open or closed.
    onOpenChange: Callback function triggered when the toast open state changes.

### Elements:

    Toast.Content: Displays the content of the toast.
    Toast.Close: Renders the button to close the toast.

### Styling:

    The Toast component can be styled using Tailwind CSS utility classes.
