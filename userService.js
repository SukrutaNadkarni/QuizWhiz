

export const saveQuizResult = (userId, result) => {
    const userResults = JSON.parse(localStorage.getItem(`quizResults_${userId}`) || '[]');
    userResults.push({ ...result, date: new Date().toISOString() });
    localStorage.setItem(`quizResults_${userId}`, JSON.stringify(userResults));
  };
  
  export const getUserStats = (userId) => {
    const userResults = JSON.parse(localStorage.getItem(`quizResults_${userId}`) || '[]');
  
    if (userResults.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        recentQuizzes: [],
      };
    }
  
    const scores = userResults.map(result => (result.score / result.totalQuestions) * 100);
    const totalQuizzes = userResults.length;
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalQuizzes);
    const bestScore = Math.round(Math.max(...scores));
    const recentQuizzes = userResults
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  
    return {
      totalQuizzes,
      averageScore,
      bestScore,
      recentQuizzes,
    };
  };
  