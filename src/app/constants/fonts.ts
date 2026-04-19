import { Inter, DM_Sans, Instrument_Serif, Prompt } from "next/font/google";
import localFont from "next/font/local";

// Local font for heading
export const heading = localFont({
    src: [
        {
            path: '../../public/fonts/Satoshi-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Medium.woff2', 
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Bold.woff2',
            weight: '700', 
            style: 'normal',
        },
        {
            path: '../../public/fonts/Satoshi-Black.woff2',
            weight: '900',
            style: 'normal',
        }
    ],
    variable: '--font-heading'
});

// Adding Prompt font for general text (base font)
export const base = Prompt({
    subsets: ["latin"],
    weight: "400", 
    variable: "--font-prompt",
});

// Subheading with Prompt font
export const subheading = Prompt({
    subsets: ["latin"],
    weight: "400", 
    variable: "--font-prompt",
});

// Another export for Prompt font (if required in your app for other usages)
export const prompt = Prompt({
    subsets: ["latin"],
    weight: "400", 
    variable: "--font-prompt",
});
