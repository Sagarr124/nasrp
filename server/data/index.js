import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    fullName: "Luisa Henderson",
    userName: "luisah",
    email: "luisa.henderson@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    description: "Graphic Designer",
    country: "United States",
    phoneNumber: "123-456-7890",
    onlineStatus: true,
    rating: 4.5,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    fullName: "Peter Jones",
    userName: "peterj",
    email: "peter.jones@example.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    description: "Voice-Over Artist",
    country: "United Kingdom",
    phoneNumber: "+44 1234 567890",
    onlineStatus: true,
    rating: 4.8,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    fullName: "Alejandro Rodriguez",
    userName: "alejandror",
    email: "alejandro.rodriguez@example.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    description: "Software Engineer",
    country: "Mexico",
    phoneNumber: "+52 123 456 7890",
    onlineStatus: true,
    rating: 3.9,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    fullName: "Jenna Patel",
    userName: "jennap",
    email: "jenna.patel@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    description: "Professional Video Editor",
    country: "Canada",
    phoneNumber: "555-123-4567",
    onlineStatus: false,
    rating: 3.2,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    fullName: "Sofia Hernandez",
    userName: "sofiah",
    email: "sofia.hernandez@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    description: "Professional Video Editor",
    country: "Spain",
    phoneNumber: "+34 123 456 789",
    onlineStatus: false,
    rating: 2.5,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    fullName: 'John Smith',
    userName: 'johnsmith456',
    email: 'john.smith@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    description: 'Digital Marketer',
    country: 'United Kingdom',
    phoneNumber: '+44 789 123 4567',
    onlineStatus: false,
    rating: 3.2,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    fullName: 'Natalie Wood',
    userName: 'nataliewood123',
    email: 'natalie.wood@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    description: 'Wordpress Expert',
    country: 'United States',
    phoneNumber: '+1 (555) 123-4567',
    onlineStatus: true,
    rating: 4.5,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    fullName: 'Emily Brown',
    userName: 'emilybrown789',
    email: 'emily.brown@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    description: 'Content Writer',
    country: 'Australia',
    phoneNumber: '+61 2 1234 5678',
    onlineStatus: true,
    rating: 4.8,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },{
    _id: userIds[8],
    fullName: "Hans Raj",
    userName: "hansraj",
    email: "hans.raj@example.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    description: "Back-end Developer",
    country: "Pakistan",
    phoneNumber: "+92 1234 567890",
    onlineStatus: true,
    rating: 4.8,
  },
  {
    _id: userIds[9],
    fullName: "Abdul Hafeez",
    userName: "abdulhafeez",
    email: "abdul.hafeez@example.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    description: "Android Developer",
    country: "Pakistan",
    phoneNumber: "+92 123 456 7890",
    onlineStatus: true,
    rating: 3.9,
  },
  {
    _id: userIds[10],
    fullName: "Ghulam Mujtaba",
    userName: "gmujtaba",
    email: "g.mujtaba@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    description: "Front-end Developer",
    country: "Pakistan",
    phoneNumber: "+92 555-123-4567",
    onlineStatus: false,
    rating: 3.2,
  },
  {
    _id: userIds[11],
    fullName: "Aneeket Kumar",
    userName: "aneeketkumar",
    email: "aneeket.kumar@example.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    description: "Machine Learning Engineer",
    country: "Pakistan",
    phoneNumber: "+92 123 456 789",
    onlineStatus: false,
    rating: 2.5,
  },
  {
    _id: userIds[12],
    fullName: 'Aveenash',
    userName: 'aveenash',
    email: 'aveenash@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    description: 'AI/ML Engineer',
    country: 'Pakistan',
    phoneNumber: '+92 789 123 4567',
    onlineStatus: false,
    rating: 3.2,
  },
  {
    _id: userIds[13],
    fullName: 'Kanchan',
    userName: 'kanchan',
    email: 'kanchan@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    description: 'React Developer',
    country: 'Pakistan',
    phoneNumber: '+92 (555) 123-4567',
    onlineStatus: true,
    rating: 4.5,
  },
  {
    _id: userIds[14],
    fullName: 'Ranjeeta',
    userName: 'ranjeeta',
    email: 'ranjeeta@example.com',
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    description: 'MERN Stack Developer',
    country: 'Pakistan',
    phoneNumber: '+92 2 1234 5678',
    onlineStatus: true,
    rating: 4.8,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[1]._id,
    fullName: "Peter Jones",
    country: "United Kingdom",
    description: "This is my first post",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [users[0]._id, true],
      [users[2]._id, true],
      [users[3]._id, true],
      [users[4]._id, true],
    ]),
    comments: [
      {
        userId: users[0]._id,
        text: "Nice post!",
        createdAt: "2022-03-01T09:18:32.000Z",
      },
      {
        userId: users[2]._id,
        text: "Great job!",
        createdAt: "2022-03-02T15:42:10.000Z",
      },
    ],
    createdAt: "2022-02-28T18:32:40.000Z",
    updatedAt: "2022-02-28T18:32:40.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[3]._id,
    fullName: "Jenna Patel",
    country: "Canada",
    description: "My second post!",
    picturePath: "post2.jpeg",
    userPicturePath: "p6.jpeg",
    likes: new Map([
      [users[7]._id, true],
      [users[4]._id, true],
      [users[1]._id, true],
      [users[2]._id, true],
    ]),
    comments: [
      {
        userId: users[7]._id,
        text: "Awesome post!",
        createdAt: "2022-03-02T05:23:17.000Z",
      },
      {
        userId: users[4]._id,
        text: "Cool post!",
        createdAt: "2022-03-03T12:15:22.000Z",
      },
      {
        userId: users[3]._id,
        text: "Thanks guys!",
        createdAt: "2022-03-03T15:47:10.000Z",
      },
    ],
    createdAt: "2022-03-01T22:40:15.000Z",
    updatedAt: "2022-03-01T22:40:15.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[4]._id,
    fullName: "Sofia Hernandez",
    country: "Spain",
    description: "My third post!",
    picturePath: "post3.jpeg",
    userPicturePath: "p5.jpeg",
    likes: new Map([
      [users[1]._id, true],
      [users[6]._id, true],
      [users[3]._id, true],
      [users[5]._id, true],
    ]),
    comments: [
      {
        userId: users[1]._id,
        text: "Please like my post!",
        createdAt: "2022-03-04T08:10:34.000Z",
      },
      {
        userId: users[6]._id,
        text: "Nice post!",
        createdAt: "2022-03-04T13:50:44.000Z",
      },
      {
        userId: users[5]._id,
        text: "I liked it!",
        createdAt: "2022-03-04T17:02:10.000Z",
      },
    ],
    createdAt: "2022-03-03T08:20:30.000Z",
    updatedAt: "2022-03-03T08:20:30.000Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[5]._id,
    fullName: 'John Smith',
    country: 'United Kingdom',
    description: "Loving this beautiful view! #vacation #nature #hiking",
    picturePath: "post4.jpeg",
    userPicturePath: "p7.jpeg",
    likes: new Map([
      [users[1]._id, true],
      [users[6]._id, true],
      [users[3]._id, true],
    ]),
    comments: [
      {
        userId: users[6]._id,
        text: "Amazing picture!",
        createdAt: "2022-02-27T10:00:00Z"
      },
      {
        userId: users[3]._id,
        text: "Wow, where is this?",
        createdAt: "2022-02-27T12:00:00Z"
      }
    ],
    createdAt: "2022-02-27T08:00:00Z",
    updatedAt: "2022-02-27T08:00:00Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[6]._id,
    fullName: 'Natalie Wood',
    country: 'United States',
    description: "Just finished an amazing workout at the gym 💪🏋️‍♀️",
    picturePath: "post5.jpeg",
    userPicturePath: "p8.jpeg",
    likes: new Map([
      [users[1]._id, true],
      [users[3]._id, true],
      [users[5]._id, true],
      [users[7]._id, true],
    ]),
    comments: [
      {
        userId: users[1]._id,
        text: "Great job, keep it up!",
        createdAt: "2022-02-28T09:00:00Z",
      },
      {
        userId: users[5]._id,
        text: "I wish I had your dedication!",
        createdAt: "2022-02-28T10:00:00Z",
      }
    ],
    createdAt: "2022-02-28T08:00:00Z",
    updatedAt: "2022-02-28T08:00:00Z",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[7]._id,
    fullName: 'Emily Brown',
    country: 'Australia',
    description: "Celebrating my birthday with my friends 🎂🎉",
    picturePath: "post6.jpeg",
    userPicturePath: "p9.jpeg",
    likes: new Map([
      [users[1]._id, true],
      [users[2]._id, true],
    ]),

    comments: [
      {
        userId: users[1]._id,
        text: "Happy birthday!!",
        createdAt: "2022-03-01T12:00:00Z",
      },
    ],
    createdAt: "2022-04-01T22:40:15.000Z",
    updatedAt: "2022-04-01T22:40:15.000Z",
  },
];

export const clients = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[0]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[2]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[5]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[10]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[12]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[14]._id
  }
];

export const freelancers = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[1]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[3]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[4]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[6]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[7]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[8]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[9]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[11]._id
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: users[13]._id
  },
];

export const category = [
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Programming & Tech"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Graphics & Design"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Digital Marketing"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Writing & Translation"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Audio & Video"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    title: "Lifestyle & Other"
  },
];


export const jobs = [
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    title: "Build me a new website",
    categoryId: category[0]._id,
    description: "I need a new website for my small business. It should be modern and mobile-friendly. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    title: "Web Development",
    categoryId: category[0]._id,
    description: "I need a web developer to create a responsive website using React.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    title: "Logo Design",
    categoryId: category[1]._id,
    description: "I need a professional logo designer to create a logo for my new business.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[3].userId,
    title: "Content Writing",
    categoryId: category[3]._id,
    description: "I need a content writer to write articles for my blog.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[4].userId,
    title: "Mobile App Development",
    categoryId: category[0]._id,
    description: "I need a mobile app developer to create an app for Android and iOS.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[5].userId,
    title: "Graphic Design",
    categoryId: category[1]._id,
    description: "I need a graphic designer to design a poster for my event.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    title: "Social Media Management",
    categoryId: category[2]._id,
    description: "I need someone to manage my social media accounts.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    title: "Video Editing",
    categoryId: category[4]._id,
    description: "I need a video editor to edit my YouTube videos.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    title: "SEO Optimization",
    categoryId: category[2]._id,
    description: "I need someone to optimize my website for search engines.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[3].userId,
    title: "Virtual Assistance",
    categoryId: category[5]._id,
    description: "I need a virtual assistant to help me with administrative tasks.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[4].userId,
    title: "Write content for my website",
    categoryId: category[3]._id,
    description: "I need a professional writer to create content for my website. The content should be SEO-friendly and engaging. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[5].userId,
    title: "Create a marketing plan for my business",
    categoryId: category[2]._id,
    description: "I need a marketing expert to create a comprehensive marketing plan for my business. It should include social media marketing, email marketing, and other relevant strategies. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    title: "Build a custom e-commerce website",
    categoryId: category[2]._id,
    description: "I need a custom e-commerce website for my business. It should be easy to navigate and have a simple checkout process. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    title: "Translate a document from English to Spanish",
    categoryId: category[3]._id,
    description: "I need a professional translator to translate a document from English to Spanish. The document is around 10 pages long. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    title: "Create a video animation for my business",
    categoryId: category[4]._id,
    description: "I need a professional animator to create a video animation for my business. It should be creative and visually appealing. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[3].userId,
    title: "Create a custom WordPress plugin",
    categoryId: category[0]._id,
    description: "I need a custom WordPress plugin created for my website. It should have specific functionalities and integrate seamlessly with my website. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[4].userId,
    title: "Proofread and edit my document",
    categoryId: category[3]._id,
    description: "I need a professional proofreader and editor to proofread and edit my document. The document is around 20 pages long. Please contact me with your portfolio and price quote.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[5].userId,
    title: "English Tutor Needed",
    categoryId: category[5]._id,
    description: "Looking for an experienced English tutor to help with grammar and writing skills. Preferably someone with a teaching degree or experience in education.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    title: "Music Teacher Wanted",
    categoryId: category[5]._id,
    description: "Seeking a qualified music teacher to teach guitar and piano lessons to beginners. Must have a music degree and experience teaching music to students of all ages.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    title: "Art Teacher Needed",
    categoryId: category[5]._id,
    description: "Looking for a talented art teacher to teach drawing and painting classes to students of all levels. Must have experience teaching art and be able to create a fun and engaging learning environment.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    title: "Fitness Instructor Needed",
    categoryId: category[5]._id,
    description: "We're looking for a qualified fitness instructor to lead group fitness classes at our gym. Must have experience teaching various fitness classes and be able to create a challenging and motivating workout for participants.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[3].userId,
    title: "Swimming Instructor Wanted",
    categoryId: category[5]._id,
    description: "Seeking an experienced swimming instructor to teach swimming lessons to students of all ages. Must have a lifeguard certification and experience teaching swimming lessons.",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[4].userId,
    title: "Cooking Instructor Needed",
    categoryId: category[5]._id,
    description: "Looking for a talented cooking instructor to teach cooking classes to students of all levels. Must have experience teaching cooking and be able to create a fun and engaging learning environment.",
  },
];


export const orders = [
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    freelancerId: freelancers[8].userId,
    description: "Design a logo for my startup",
    amount: 1500,
    startDate: "2022-03-10T00:00:00.000Z",
    endDate: "2022-03-15T00:00:00.000Z",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    freelancerId: freelancers[7].userId,
    description: "Write an article on machine learning",
    amount: 5000,
    startDate: "2022-03-01T00:00:00.000Z",
    endDate: "2022-03-05T00:00:00.000Z",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    freelancerId: freelancers[6].userId,
    description: "Build a website for my business",
    amount: 10000,
    startDate: "2022-03-20T00:00:00.000Z",
    endDate: "2022-04-05T00:00:00.000Z",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[3].userId,
    freelancerId: freelancers[5].userId,
    description: "Create a marketing strategy for my product",
    amount: 5000,
    startDate: "2022-03-15T00:00:00.000Z",
    endDate: "2022-03-25T00:00:00.000Z",
    orderStatus: "cancelled"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[4].userId,
    freelancerId: freelancers[4].userId,
    description: "Create a logo for my new business",
    amount: 2000, 
    startDate: "2022-03-01",
    endDate: "2022-03-10",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[5].userId,
    freelancerId: freelancers[3].userId,
    description: "Design a website for my company",
    amount: 15000,
    startDate: "2022-04-01",
    endDate: "2022-05-01",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[0].userId,
    freelancerId: freelancers[2].userId,
    description: "Write a 5000 word article on cryptocurrency",
    amount: 8000,
    startDate: "2022-02-01",
    endDate: "2022-02-10",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[1].userId,
    freelancerId: freelancers[1].userId,
    description: "Develop a mobile app for my business",
    amount: 20000,
    startDate: "2022-03-15",
    endDate: "2022-05-15",
    orderStatus: "completed"
  },
  {
    _id: new mongoose.Types.ObjectId(),
    clientId: clients[2].userId,
    freelancerId: freelancers[0].userId,
    description: "Edit and proofread my book",
    amount: 10000,
    startDate: "2022-04-01",
    endDate: "2022-04-10",
    orderStatus: "completed"
  }
];

export const conversations = [
  {
    _id: new mongoose.Types.ObjectId(),
    participants: [users[0]._id, users[1]._id]
  },
];


export const messages = [
  {
    _id: new mongoose.Types.ObjectId(),
    conversationId: conversations[0],
    senderId: conversations[0].participants[0],
    recipientId: conversations[0].participants[1],
    content: "Hey, how are you doing?"
  },
];


export const payment = [
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[0]._id,
    amount: 1500
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[1]._id,
    amount: 5000
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[2]._id,
    amount: 10200
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[4]._id,
    amount: 2000
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[5]._id,
    amount: 15000
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[6]._id,
    amount: 8000
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[7]._id,
    amount: 21000
  },
  {
    _id: new mongoose.Types.ObjectId(),
    orderId: orders[8]._id,
    amount: 10100
  }
];
