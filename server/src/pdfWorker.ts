import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { Worker } from "bullmq";

const worker = new Worker(
  "pdf-upload-queue",
  async (job) => {
    console.log(job.data);

    // TODO
    // Read the pdf from job.data.path
    const loader = new PDFLoader(job.data.path);
    const docs = await loader.load();

    // Chunk the pdf
    const splitter = new CharacterTextSplitter({
      chunkSize: 300,
      chunkOverlap: 0,
    });
    const texts = splitter.splitText();
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
