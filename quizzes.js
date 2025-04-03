// import { Quiz } from '../types';

export const quizzes = {
    science: {
      id: 'science',
      title: 'Science Quiz',
      description: 'Test your knowledge of scientific concepts',
      timePerQuestion: 5,
      questions: [
        {
          id: '1',
          text: 'What is the chemical symbol for gold?',
          options: ['Au', 'Ag', 'Fe', 'Cu'],
          correctAnswer: 0,
        },
        {
          id: '2',
          text: 'Which planet is known as the Red Planet?',
          options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
          correctAnswer: 1,
        },
        {
          id: '3',
          text: 'What is the hardest natural substance on Earth?',
          options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
          correctAnswer: 2,
        },
      ],
    },
    history: {
      id: 'history',
      title: 'History Challenge',
      description: 'Journey through historical events',
      timePerQuestion: 30,
      questions: [
        {
          id: '1',
          text: 'Who was the first President of the United States?',
          options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
          correctAnswer: 2,
        },
        {
          id: '2',
          text: 'In which year did World War II end?',
          options: ['1943', '1944', '1945', '1946'],
          correctAnswer: 2,
        },
        {
          id: '3',
          text: 'Who painted the Mona Lisa?',
          options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
          correctAnswer: 1,
        },
      ],
    },
    mathematics: {
      id: 'mathematics',
      title: 'Mathematics',
      description: 'Challenge your mathematical skills',
      timePerQuestion: 30,
      questions: [
        {
          id: '1',
          text: 'What is the square root of 144?',
          options: ['10', '12', '14', '16'],
          correctAnswer: 1,
        },
        {
          id: '2',
          text: 'What is the value of π (pi) to two decimal places?',
          options: ['3.14', '3.15', '3.16', '3.13'],
          correctAnswer: 0,
        },
        {
          id: '3',
          text: 'If x + 5 = 10, what is x?',
          options: ['15', '5', '0', '10'],
          correctAnswer: 1,
        },
      ],
    },
    literature: {
      id: 'literature',
      title: 'Literature & Books',
      description: 'Test your knowledge of literary works',
      timePerQuestion: 30,
      questions: [
        {
          id: '1',
          text: 'Who wrote "Romeo and Juliet"?',
          options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
          correctAnswer: 1,
        },
        {
          id: '2',
          text: 'What is the first book in the Harry Potter series?',
          options: ['Chamber of Secrets', 'Prisoner of Azkaban', "Sorcerer's Stone", 'Goblet of Fire'],
          correctAnswer: 2,
        },
        {
          id: '3',
          text: 'Who wrote "1984"?',
          options: ['George Orwell', 'Aldous Huxley', 'Ray Bradbury', 'Ernest Hemingway'],
          correctAnswer: 0,
        },
      ],
    },
  };
  