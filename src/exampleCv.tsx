export const exampleCvData: ICvData = {
    header: {
      name: 'John',
      surname: 'Doe',
      professionalTitle: 'Software Engineer',
      aboutMe: 'Passionate software engineer with 5 years of experience in web development.',
      contactDetails: {
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        linkedin: 'linkedin.com/in/johndoe'
      }
    },
    experience: [{
      position: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      startDate: new Date('2021-03-01'),
      endDate: null,
      plainDescription: 'Leading the frontend development team in building scalable web applications.',
      bulletedDescription: [
        'Architected and implemented a new React-based dashboard',
        'Reduced load times by 40% through code splitting and optimization',
        'Mentored 3 junior developers'
      ]
    }],
    education: [{
      degree: 'Bachelor of Science in Computer Science',
      institution: 'State University',
      locaton: 'Boston, MA',
      startDate: new Date('2016-09-01'),
      endDate: new Date('2020-05-30'),
      description: 'Graduated with Honors. GPA: 3.8/4.0'
    }],
    skills: {
      skillGroup: {
        Languages: ['English', 'Spanish'],
        Technical: ['React', 'TypeScript', 'Node.js']
      }
    },
    hobbies: {
      hobbies: ['Reading', 'Hiking', 'Coding']
    }
  }