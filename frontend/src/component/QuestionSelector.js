import React, { useContext, useState, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import welcome from '../img/Welcome_to.png'


const QuestionSelector = () => {

    const { selectedQuestionId, setSelectedQuestionId } = useContext(QuestionContext);

    const handleSelectChange = (event) => {
        setSelectedQuestionId(event.target.value);
    };

    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/questions')
            .then(response => {
                setQuestions(response.data);
                // Initialise le selectedQuestionId à 1 s'il n'est pas défini
                if (!selectedQuestionId) {
                    setSelectedQuestionId(1);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des questions :', error);
            });
    }, [selectedQuestionId, setSelectedQuestionId]);

    const navigate = useNavigate();
    const handleOkClick = () => {
        navigate('/question');
    }

    return (
        <div class="question-selector">
            <div class='welcome'>
                <img src={welcome} alt='Welcome to Streamopoly' />
            </div>
            <div class='container'>
                <span class='selectQuestion'>
                    <h3> Select a question: </h3>
                    <select class='dropdown' value={selectedQuestionId} onChange={handleSelectChange}>
                        {questions.map(question => (
                            <option key={question.id} value={question.id}>{question.id}</option>
                        ))}
                    </select>
                </span>
                <button class='go' onClick={handleOkClick}>GO!</button>
            </div>
        </div>
    );
};

export default QuestionSelector;