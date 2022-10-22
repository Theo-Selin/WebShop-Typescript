import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

const theme = extendTheme(
    {
        colors: {
            brand: {
                100: "#f3gce6",
                200: "#eadfd4",
                300: "#e0d0c1",
                400: "#d5c0ab",
                500: "#c9ae93",
                600: "#bc9a78",
                700: "#ab8157",
                800: "#95602b",
                900: "#643200"
            }
        },
        fonts: {
            body: "Graphic Font",
            heading: "Graphic Font"
        },
        fontWeights: {
            hairline: 100,
            thin: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800
        }
    },
);

export default theme