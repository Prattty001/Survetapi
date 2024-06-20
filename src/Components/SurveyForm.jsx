import React, { useState, useEffect } from 'react';
import useForm from './useForm';
import validate from './validateForm';
import fetchAdditionalQuestions from './fetchAdditionalQuestions';

const SurveyForm = () => {
  const { handleChange, handleSubmit, values, errors } = useForm(submit, validate);
  const [surveyTopic, setSurveyTopic] = useState('');
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  useEffect(() => {
    if (surveyTopic) {
      fetchAdditionalQuestions(surveyTopic).then((questions) => setAdditionalQuestions(questions));
    }
  }, [surveyTopic]);

  function submit() {
    alert(`Form submitted successfully!\n${JSON.stringify(values, null, 2)}\nAdditional Questions: ${JSON.stringify(additionalQuestions, null, 2)}`);
  }

  return (
    <div className="form-container">
      <h2>Survey Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={values.fullName || ''}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="surveyTopic">Survey Topic</label>
          <select
            name="surveyTopic"
            id="surveyTopic"
            value={surveyTopic}
            onChange={(e) => {
              setSurveyTopic(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="error">{errors.surveyTopic}</p>}
        </div>
        {surveyTopic === 'Technology' && (
          <>
            <div>
              <label htmlFor="favProgrammingLanguage">Favorite Programming Language</label>
              <select
                name="favProgrammingLanguage"
                id="favProgrammingLanguage"
                value={values.favProgrammingLanguage || ''}
                onChange={handleChange}
              >
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favProgrammingLanguage && <p className="error">{errors.favProgrammingLanguage}</p>}
            </div>
            <div>
              <label htmlFor="techExperience">Years of Experience</label>
              <input
                type="number"
                name="techExperience"
                id="techExperience"
                value={values.techExperience || ''}
                onChange={handleChange}
              />
              {errors.techExperience && <p className="error">{errors.techExperience}</p>}
            </div>
          </>
        )}
        {surveyTopic === 'Health' && (
          <>
            <div>
              <label htmlFor="exerciseFrequency">Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                id="exerciseFrequency"
                value={values.exerciseFrequency || ''}
                onChange={handleChange}
              >
                <option value="">Select a frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="error">{errors.exerciseFrequency}</p>}
            </div>
            <div>
              <label htmlFor="dietPreference">Diet Preference</label>
              <select
                name="dietPreference"
                id="dietPreference"
                value={values.dietPreference || ''}
                onChange={handleChange}
              >
                <option value="">Select a preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="error">{errors.dietPreference}</p>}
            </div>
          </>
        )}
        {surveyTopic === 'Education' && (
          <>
            <div>
              <label htmlFor="highestQualification">Highest Qualification</label>
              <select
                name="highestQualification"
                id="highestQualification"
                value={values.highestQualification || ''}
                onChange={handleChange}
              >
                <option value="">Select a qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Master's">Master's</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.highestQualification && <p className="error">{errors.highestQualification}</p>}
            </div>
            <div>
              <label htmlFor="fieldOfStudy">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                id="fieldOfStudy"
                value={values.fieldOfStudy || ''}
                onChange={handleChange}
              />
              {errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy}</p>}
            </div>
          </>
        )}
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            name="feedback"
            id="feedback"
            value={values.feedback || ''}
            onChange={handleChange}
            rows="4"
          />
          {errors.feedback && <p className="error">{errors.feedback}</p>}
        </div>
        {additionalQuestions.map((question, index) => (
          <div key={index}>
            <label htmlFor={question.id}>{question.label}</label>
            <input
              type="text"
              name={question.id}
              id={question.id}
              value={values[question.id] || ''}
              onChange={handleChange}
            />
            {errors[question.id] && <p className="error">{errors[question.id]}</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
