import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getChat = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: id as string },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }

    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const { id: chatId } = req.params;
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  try {
    // 1. Save user message
    await prisma.message.create({
      data: {
        chatId: chatId as string,
        role: "USER",
        content,
      },
    });

    // 2. Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const fullResponse = `I received your message: "${content}". This is a placeholder response from StudyPal AI. I can see your PDF is linked and I'm ready to help you study! I'm streaming this response to demonstrate the real-time interaction.`;
    
    const words = fullResponse.split(" ");
    let currentContent = "";

    // 3. Stream the response word by word
    for (let i = 0; i < words.length; i++) {
      const word = words[i] + (i === words.length - 1 ? "" : " ");
      currentContent += word;
      
      // SSE format: data: <payload>\n\n
      res.write(`data: ${JSON.stringify({ content: word })}\n\n`);
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // 4. Save assistant message to DB after streaming finishes
    await prisma.message.create({
      data: {
        chatId: chatId as string,
        role: "ASSISTANT",
        content: currentContent,
      },
    });

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error creating message:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create message" });
    } else {
      res.end();
    }
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized access" });
    return;
  }

  try {
    const chat = await prisma.chat.findUnique({
      where: { id: id as string },
    });

    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }

    if (chat.userId !== userId) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    await prisma.chat.delete({
      where: { id: id as string },
    });

    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};
