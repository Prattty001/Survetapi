const fetchAdditionalQuestions = async (surveyTopic) => {
    const response = await fetch(`https://api.example.com/questions?topic=${surveyTopic}`);
    const data = await response.json();
    return data.questions;
  };
  
  export default fetchAdditionalQuestions;
  