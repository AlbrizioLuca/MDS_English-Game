import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    const [selectedQuestionId, setSelectedQuestionId] = useState('');

    return (
        <QuestionContext.Provider value={{ selectedQuestionId, setSelectedQuestionId }}>
            {children}
        </QuestionContext.Provider>
    );
};