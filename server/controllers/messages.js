import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

/* READ */
export const getConversations = async (req, res) => {
  const { userId } = req.params;
  let from = userId;

  Conversation.aggregate([
    {
      $lookup: {
        from: 'User',
        localField: 'recipients',
        foreignField: '_id',
        as: 'recipientObj',
      },
    },
  ])
  .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
  .project({
    'recipientObj.password': 0,
    'recipientObj.__v': 0,
    'recipientObj.date': 0,
  })
  .exec((err, conversations) => {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
      } else {
        res.send(conversations);
      }
  });
};

export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;
  let user1 = senderId;
  let user2 = receiverId;

  Message.aggregate([
    {
      $lookup: {
        from: 'User',
        localField: 'to',
        foreignField: '_id',
        as: 'toObj',
      },
    },
    {
      $lookup: {
        from: 'User',
        localField: 'from',
        foreignField: '_id',
        as: 'fromObj',
      },
    },
  ])
  .match({
    $or: [
      { $and: [{ to: user1 }, { from: user2 }] },
      { $and: [{ to: user2 }, { from: user1 }] },
    ],
  })
  .project({
    'toObj.password': 0,
    'toObj.__v': 0,
    'toObj.date': 0,
    'fromObj.password': 0,
    'fromObj.__v': 0,
    'fromObj.date': 0,
  })
  .exec((err, messages) => {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
      } else {
        res.send(messages);
      }
  });
};


/* CREATE */
export const sendMessage = async (req, res) => {
  const { senderId, receiverId } = req.params;
  let from = senderId;
  let to = receiverId;

  Conversation.findOneAndUpdate(
    {
      recipients: {
        $all: [
          { $elemMatch: { $eq: from } },
          { $elemMatch: { $eq: to } },
        ],
      },
    },
    {
      recipients: [from, to],
      lastMessage: req.body.body,
      date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function(err, conversation) {
      if (err) {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Failure' }));
        res.sendStatus(500);
      } else {
        let message = new Message({
          conversation: conversation._id,
          to: to,
          from: from,
          body: req.body.body,
        });

        req.io.sockets.emit('messages', req.body.body);

        message.save(err => {
          if (err) {
            console.log(err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Failure' }));
            res.sendStatus(500);
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                message: 'Success',
                conversationId: conversation._id,
              })
            );
          }
        });
      }
    }
  );
};


// export const getUserMessages = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const messages = await Message.find({
//       $or: [{ senderId: userId }, { receiverId: userId }],
//     })
//     .populate('senderId', 'username')
//     .populate('receiverId', 'username')
//     .sort({ createdAt: 'asc' });

//     const conversations = messages.reduce((result, message) => {
//       const otherUser = message.senderId.toString() === userId ? message.receiverId : message.senderId;
//       const conversation = result.find((conversation) =>
//         conversation.user._id.toString() === otherUser._id.toString()
//       );

//       if (conversation) {
//         conversation.messages.push(message);
//       } else {
//         result.push({
//           user: otherUser,
//           messages: [message],
//         });
//       }

//       return result;
//     }, []);

//     res.status(200).json(conversations);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


// export const getUserMessages = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Get all unique conversation participants for the user
//     const conversationParticipants = await Message.find({
//       $or: [{ senderId: userId }, { receiverId: userId }],
//     })
//       .distinct('senderId receiverId')
//       .exec();

//     // Fetch messages for each conversation participant
//     const conversations = await Promise.all(
//       conversationParticipants.map(async (participantId) => {
//         const participantMessages = await Message.find({
//           $or: [
//             { senderId: userId, receiverId: participantId },
//             { senderId: participantId, receiverId: userId },
//           ],
//         })
//           .populate('senderId', 'userName')
//           .populate('receiverId', 'userName')
//           .sort({ createdAt: 'asc' })
//           .exec();

//         return {
//           participantId,
//           messages: participantMessages,
//         };
//       })
//     );

//     res.status(200).json(conversationParticipants);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


// export const getUserMessages = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Find all messages where the user is either the sender or the receiver
//     const messages = await Message.aggregate([
//       {
//         $match: {
//           $or: [{ senderId: userId }, { receiverId: userId }],
//         },
//       },
//       {
//         $sort: { createdAt: 1 }, // Sort messages by their creation timestamp in ascending order
//       },
//       {
//         $group: {
//           _id: {
//             $cond: [
//               { $eq: ['$senderId', userId] },
//               '$receiverId',
//               '$senderId',
//             ],
//           },
//           messages: {
//             $push: {
//               _id: '$_id',
//               senderId: '$senderId',
//               receiverId: '$receiverId',
//               message: '$message',
//               createdAt: '$createdAt',
//             },
//           },
//         },
//       },
//       {
//         $lookup: {
//           from: 'users',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'user',
//         },
//       },
//       {
//         $unwind: '$user',
//       },
//       {
//         $project: {
//           _id: 0,
//           user: {
//             _id: 1,
//             username: 1,
//           },
//           messages: 1,
//         },
//       },
//     ]);

//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };


// export const getUserMessages = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const messages = await Message.find({
//         $or: [{ senderId: userId }, { receiverId: userId }],
//       })
//       .populate('senderId', 'username') // Populate the senderId field with the username
//       .populate('receiverId', 'username') // Populate the receiverId field with the username
//       .sort({ createdAt: 'asc' }); // Sort messages by their creation timestamp in ascending order


//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };