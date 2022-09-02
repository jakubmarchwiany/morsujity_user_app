export {};

declare module "*.jpg" {
    export default "" as string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_ENV: "development" | "production";
            VITE_DEV_API_ENDPOINT: string;
            VITE_PRO_API_ENDPOINT: string;
            VITE_DEF_USER_IMAGE: string;
        }
    }
}

// declare global {
//     interface Window {
//         paypal: any;
//     }
// }

// declare module "react" {
//     interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
//         // extends React's HTMLAttributes
//         crossorigin?: string;
//     }
// }
