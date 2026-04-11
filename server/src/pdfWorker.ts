import { Worker } from "bullmq";

const worker = new Worker(
  "pdf-upload-queue",
  async (job) => {
    console.log(job.data);

    // TODO
    // Read the pdf from job.data.path
    // Chunk the pdf
    // call openai embedding model for each chunk
    // store chunks in vector db
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
