export default ({ env }) => ({
    upload: {
        config: {
          provider: 'upload-vercel-blob',
          providerOptions: {
            BLOB_READ_WRITE_TOKEN: env('BLOB_READ_WRITE_TOKEN')
          },
          actionOptions: {
            upload: {},
            uploadStream: {},
            delete: {},
          },
        },
      },
});

