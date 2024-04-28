const Community = require("./models/Community");


const communities = [
  {
    name: 'AI/ML',
    description: 'Join our vibrant AI/ML community where enthusiasts come together to explore the frontiers of artificial intelligence and machine learning!',
    members: [],
  },
  {
    name: 'Web Dev',
    description: 'Discover the world of web development with our thriving community! Join us to learn, collaborate, and create amazing websites and applications together.',
    members: [],
  },
  {
    name: 'Android Dev',
    description: 'Join our community of Android developers to share knowledge, collaborate on projects, and stay up-to-date with the latest trends and technologies.',
    members: [],
  },
  {
    name: 'UI/UX',
    description: 'Unleash your creativity and design skills with our UI/UX community! Share your work, get feedback, and learn from experienced designers.',
    members: [],
  },
  {
    name: 'Blockchain',
    description: 'Step into the exciting realm of blockchain technology with us! Join our community to explore the decentralized future, discuss innovative projects, and delve into the world of cryptocurrency.',
    members: [],
  },
];

// Function to create communities
const createCommunities = async () => {
  try {
    const createdCommunities = await Community.insertMany(communities);
    console.log('Communities created successfully:', createdCommunities);
  } catch (error) {
    console.error('Error creating communities:', error);
  }
};

// Call the function to create communities
module.exports=createCommunities;