declare module 'exiftool' {
    export function metadata(data: Buffer, args: string[], callback: (err: Error | null, result: Record) => void): void;
}
