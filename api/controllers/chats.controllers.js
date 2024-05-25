import prisma from "../lib/prisma.js";

export const getChatsControllers = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const reciverId = chat.userIDs.find((id) => id !== tokenUserId);
      const reciver = await prisma.user.findUnique({
        where: {
          id: reciverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.reciver = reciver;
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const getSingleChatsControllers = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const addChatsControllers = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.reciverId],
      },
    });

    res.status(200).json({ newChat });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
export const readChatsControllers = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },

      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
