export {};

declare module "*.jpg" {
    export default "" as string;
}

declare global {
    interface Window {
        paypal: any;
    }
}

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        crossorigin?: string;
    }
}
