/// <reference types="astro/client" />

declare module 'mdx-mermaid';

declare module 'mdx-mermaid/lib/Mermaid' {
    export class Mermaid {
        // Define the properties and methods of the Mermaid class here.
        // For example:
        render(input: string): string;
    }
}
