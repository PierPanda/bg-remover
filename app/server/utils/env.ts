const BgRemoverAPIKey = process.env.BG_REMOVER_API_KEY;
const BlobReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN;
const NodeEnv = process.env.NODE_ENV || "production";

export { BgRemoverAPIKey, BlobReadWriteToken, NodeEnv };
