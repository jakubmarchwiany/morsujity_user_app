export { };

declare module "*.jpg" {
    export default "" as string;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_ENV: "development" | "production";
            REACT_APP_DEV_API_ENDPOINT: string;
            REACT_APP_PRO_API_ENDPOINT: string;
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
