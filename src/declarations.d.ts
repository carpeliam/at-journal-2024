declare module 'exiftool' {
    export function metadata(data: Buffer, args: string[], callback: (err: Error | null, result: Record) => void): void;
}

declare module '*.mdx' {
    export default (props: any) => JSX.Element;
}
