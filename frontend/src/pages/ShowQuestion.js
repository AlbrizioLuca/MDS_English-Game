import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { QuestionContext } from '../context/QuestionContext';
import logo from '../img/Logo_streamopoly.png'


const ShowQuestion = () => {

    const { selectedQuestionId } = useContext(QuestionContext);
    const [question, setQuestion] = useState({
        content: '',
        responses: [],
        solution: ''
    });

    const selectedButtonRef = useRef(null); // Référence pour le bouton sélectionné
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [showValidation, setShowValidation] = useState(false);
    const [validationClass, setValidationClass] = useState('');


    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/question/${selectedQuestionId}`);
                const data = response.data;
                const formattedData = {
                    id: data[0].id,
                    content: data[0].content,
                    responses: JSON.parse(data[0].responses),
                    solution: data[0].solution
                };
                setQuestion(formattedData);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [selectedQuestionId]);


    const handleResponseClick = (response) => {
        setSelectedResponse(response);
        setShowValidation(true);
    };
    const [validationMessage, setValidationMessage] = useState('');

    const validateResponse = () => {
        if (selectedResponse === question.solution) {
            setValidationMessage('Good answer ! You win 10.000 followers !');
            selectedButtonRef.current.style.backgroundColor = 'green';
            setValidationClass('good-response');
        } else {
            setValidationMessage('Bad answer ! You lose 10.000 followers !');
            selectedButtonRef.current.style.backgroundColor = 'red';
            setValidationClass('bad-response');
        }
    };

    return (
        <>
            <div class="header">
                <a href='/home'> Return to Homepage</a>
                <img class='logo' src={logo} alt='Streamopoly Logo' />
            </div>
            <span class='selectedQuestion'>
                <h2>{question.content}</h2>
            </span>
            <span class='responses'>
                {question.responses.map((response, index) => (
                    <div key={index}>
                        <button
                            ref={selectedResponse === response ? selectedButtonRef : null} // Utiliser la référence pour le bouton sélectionné
                            class='choice'
                            onClick={() => handleResponseClick(response)}
                            style={{ border: selectedResponse === response ? '2px solid red' : 'none' }}
                        >
                            {response}
                        </button>
                    </div>
                ))}
            </span>
            {showValidation && (
                <div>
                    <button class='validation' onClick={() => validateResponse()}>{'Validation'}</button>
                    <p class={`message ${validationClass}`}>{validationMessage}</p>
                </div>
            )}
        </>
    );
};

export default ShowQuestion;