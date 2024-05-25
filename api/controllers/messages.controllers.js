import prisma from "./../lib/prisma.js";
export const addMessagesControllers = async (req, res, next) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) {
      res.status(404).json({ message: "chat not found!" });
    }

    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message || "failed to add messages" });
  }
};
