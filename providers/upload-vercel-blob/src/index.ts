import { del, put } from "@vercel/blob";
import type { ReadStream } from 'node:fs';

interface InitOptions {
    BLOB_READ_WRITE_TOKEN: string;
}

interface File {
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: Record<string, unknown>;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    path?: string;
    provider?: string;
    provider_metadata?: Record<string, unknown>;
    stream?: ReadStream;
    buffer?: Buffer;
  }

export default {
    init: ({ BLOB_READ_WRITE_TOKEN }: InitOptions) => {
        return {
            async uploadStream(file: File) {
                if (!file.name || !file.stream) {
                    throw new Error("File stream or name is missing");
                }

                const blob = await put(file.name, file.stream, {
                    access: "public",
                    token: BLOB_READ_WRITE_TOKEN,
                });

                file.url = blob.url;
            },
            async upload(file: File) {
                if (!file.name || !file.buffer) {
                    throw new Error("File buffer or name is missing");
                }
                const blob = await put(file.name, file.buffer, {
                    access: "public",
                    token: BLOB_READ_WRITE_TOKEN,
                  });
                  file.url = blob.url;
            },
            async delete(file: File) {
                await del(file.url, { token: BLOB_READ_WRITE_TOKEN });
            }
        };
    },
};