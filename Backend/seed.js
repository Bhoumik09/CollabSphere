const Community = require("./models/Community");


const communities = [
  {
    name: 'Machine Learning',
    description: 'Join our vibrant Machine Learning community where enthusiasts come together to explore the frontiers of artificial intelligence and machine learning!',
    members: [],
  },
  {
    name: 'Web Development',
    description: 'Discover the world of web development with our thriving community! Join us to learn, collaborate, and create amazing websites and applications together.',
    members: [],
  },
  {
    name: 'Android Development',
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
  {
    name: 'IoT',
    description: 'Dive into dynamic discussions on cutting-edge devices, share DIY projects, exchange coding tips, and collaborate on shaping the future of connected living.',
    members: [],
  },
  {
    name: 'OpenSource',
    description: 'Join our open-source collective, where collaboration knows no bounds and innovation thrives in the spirit of shared knowledge',
    members: [],
  },
  {
    name: 'Freelancing',
    description: 'Join our freelancing fellowship: a supportive community empowering independent professionals to thrive, connect, and conquer together',
    members: [],
  },
  {
    name: 'Data Science',
    description: 'Join our Data Science Junction—a thriving community where data enthusiasts, analysts, and experts converge to explore, learn, and innovate in the ever-evolving world of data science.',
    members: [],
  },
  {
    name: 'Robotics',
    description: 'Join our Robotics Realm: Where enthusiasts, engineers, and dreamers unite to push the boundaries of innovation and automation.',
    members: [],
  },
  {
    name: 'DevOps',
    description: 'Join our DevOps Nexus, where professionals unite to streamline workflows, automate processes, and foster continuous innovation in the realm of software development and IT operations.',
    members: [],
  },
  {
    name: 'Game Developmet',
    description: 'Level up your game with our vibrant community of developers, artists, and enthusiasts, where creativity thrives and pixels come to life!',
    members: [],
  },
  {
    name: 'Editing',
    description: 'Join our Editing Enclave, where wordsmiths unite to refine, polish, and perfect the art of storytelling.',
    members: [],
  },
  {
    name: 'Cyber Security',
    description: 'Join our Cyber Security Citadel: where experts, enthusiasts, and learners unite to fortify digital defenses, share threat intelligence, and safeguard the virtual realm against evolving cyber threats.',
    members: [],
  },
  {
    name: 'Cloud Computing',
    description: 'Join our Cloud Collective: where professionals converge to share insights, troubleshoot challenges, and harness the power of cloud computing for innovation and efficiency.',
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