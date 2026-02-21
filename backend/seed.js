import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './src/models/Job.js';
import connectDB from './src/config/db.js';

dotenv.config();

const seedJobs = async () => {
  try {
    await connectDB();

    // Clear existing jobs
    await Job.deleteMany({});

    const jobs = [
      {
        title: 'Frontend Developer Intern',
        company: 'Tech Startup Inc',
        description: 'We are looking for a frontend developer intern to help build our web application using React and TypeScript.',
        location: 'Bangalore',
        workMode: 'hybrid',
        domain: 'Web Development',
        requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML'],
        preferredSkills: ['TypeScript', 'Tailwind CSS'],
        stipend: 15000,
        duration: '3 months',
        startDate: new Date('2026-03-01'),
        applicationDeadline: new Date('2026-02-28'),
        openings: 3,
        isPMScheme: false,
        isActive: true,
      },
      {
        title: 'Backend Developer Intern',
        company: 'Cloud Solutions Ltd',
        description: 'Join our backend team to develop APIs using Node.js and MongoDB. Experience in building scalable systems is a plus.',
        location: 'Mumbai',
        workMode: 'remote',
        domain: 'Backend Development',
        requiredSkills: ['Node.js', 'MongoDB', 'REST APIs', 'JavaScript'],
        preferredSkills: ['Express', 'Docker'],
        stipend: 12000,
        duration: '6 months',
        startDate: new Date('2026-03-15'),
        applicationDeadline: new Date('2026-03-10'),
        openings: 2,
        isPMScheme: false,
        isActive: true,
      },
      {
        title: 'Full Stack Developer Intern',
        company: 'AI Innovations',
        description: 'Work on cutting-edge AI applications with a full stack approach. Build interfaces and backend services.',
        location: 'Delhi',
        workMode: 'onsite',
        domain: 'Full Stack Development',
        requiredSkills: ['React', 'Node.js', 'Python', 'MongoDB'],
        preferredSkills: ['Machine Learning', 'TensorFlow'],
        stipend: 18000,
        duration: '6 months',
        startDate: new Date('2026-04-01'),
        applicationDeadline: new Date('2026-03-20'),
        openings: 2,
        isPMScheme: false,
        isActive: true,
      },
      {
        title: 'Data Science Intern',
        company: 'Analytics Pro',
        description: 'Analyze large datasets and build machine learning models. Work with Python, SQL, and visualization tools.',
        location: 'Hyderabad',
        workMode: 'hybrid',
        domain: 'Data Science',
        requiredSkills: ['Python', 'SQL', 'Statistics', 'Data Analysis'],
        preferredSkills: ['Pandas', 'Scikit-learn', 'Tableau'],
        stipend: 16000,
        duration: '3 months',
        startDate: new Date('2026-03-01'),
        applicationDeadline: new Date('2026-02-25'),
        openings: 4,
        isPMScheme: true,
        isActive: true,
      },
      {
        title: 'Mobile App Developer Intern',
        company: 'MobileFirst Corp',
        description: 'Develop mobile applications using React Native. Work on iOS and Android platforms.',
        location: 'Pune',
        workMode: 'remote',
        domain: 'Mobile Development',
        requiredSkills: ['React Native', 'JavaScript', 'Mobile Development'],
        preferredSkills: ['Redux', 'Firebase'],
        stipend: 14000,
        duration: '4 months',
        startDate: new Date('2026-03-10'),
        applicationDeadline: new Date('2026-03-05'),
        openings: 3,
        isPMScheme: false,
        isActive: true,
      },
      {
        title: 'UI/UX Design Intern',
        company: 'Design Studio',
        description: 'Create beautiful and intuitive user interfaces. Work with Figma and design tools.',
        location: 'Bangalore',
        workMode: 'hybrid',
        domain: 'Design',
        requiredSkills: ['Figma', 'UI Design', 'UX Principles'],
        preferredSkills: ['Prototyping', 'Web Design'],
        stipend: 10000,
        duration: '3 months',
        startDate: new Date('2026-03-15'),
        applicationDeadline: new Date('2026-03-10'),
        openings: 2,
        isPMScheme: false,
        isActive: true,
      },
    ];

    await Job.insertMany(jobs);
    console.log('Jobs seeded successfully!');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding jobs:', error);
    process.exit(1);
  }
};

seedJobs();
