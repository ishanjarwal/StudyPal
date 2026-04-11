import { Queue } from "bullmq";

export const pdfQueue = new Queue("pdf-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
