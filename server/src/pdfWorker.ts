import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Worker } from "bullmq";

const worker = new Worker(
  "pdf-upload-queue",
  async (job) => {
    try {
      console.log(job.data);

      // Read the pdf from job.data.path
      const loader = new PDFLoader(job.data.path);
      console.log(loader.filePathOrBlob);
      const docs = await loader.load();
      console.log(docs);

      // Chunk the pdf
      // const splitter = new CharacterTextSplitter({
      //   chunkSize: 300,
      //   chunkOverlap: 0,
      // });
      // const texts = splitter.splitText();

      // call openai embedding model for each chunk and store chunks in vector db
      const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
      });

      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: process.env.QDRANT_URL,
          collectionName: "studypal-pdf-docs",
        },
      );

      console.log(docs);

      await vectorStore.addDocuments(docs);
      console.log("Docs are added to vector store");
    } catch (error) {
      console.log(error);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);
