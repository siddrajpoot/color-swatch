# Color Swatches: Akkio Frontend Technical Assessment

A dynamic grid of HSL color swatches built using the [color api](https://www.thecolorapi.com/). This application allows users to input values for saturation (S) and lightness (L) to render named hues corresponding to the given S and L values.

## Features

- User can input specific values for saturation (S) and lightness (L).
- Renders all named hues from the color API based on user input.
- Displays color, color name, and RGB value for each swatch.
- Designed responsively to utilize the full width of the window.

## Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/[YOUR_USERNAME]/color-swatch.git
   ```

2. Navigate to the project directory:

```bash
cd color-swatch
```

3. Install dependencies (assuming you are using npm):

```bash
npm install
```

4. Build the application:

```bash
npm run build
```

5. Run the application:

```console
npm run start
```

The application should open in your default web browser. If not, navigate to http://localhost:3000/.

## Design Choices

During the development of this application, primary considerations were given to efficiency and user experience. To efficiently determine the distinct named colors, I utilized a color dictionary to cache any named colors that had previously been fetched. For an enhanced user experience, colors are not all rendered simultaneously; they're loaded using a lazy-load approach, rendering more as the user scrolls.

API calls are initiated when either the user scrolls to the bottom of the page or submits a valid form. For improved API call efficiency, I fetch hue values in increments of 5, reducing redundant calls. To provide user feedback during data retrieval, a skeleton component is displayed while the API fetches results.

One of the challenges faced during development was figuring out what qualifies as a valid color name. I had to decide whether the app should store the color if it matches a specific shade or if it should store the closest named color. Based on the provided example image, I concluded that storing the closest named color is the more suitable approach. Implementing a caching system using a dictionary to filter out already added colors proved beneficial for fetching colors efficiently.

## Stack

- React
- Next.js
- Tailwind
- Shadcn (UI)
