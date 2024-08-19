'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs';
import { getCards } from '@/lib/supabaseRequests';

const FlashcardSetPage = ({ params }) => {
    const { userId, getToken } = useAuth();
    const setId = params.setId
    const [cards, setCards] = useState([])

    useEffect(() => {
        const fetchCards = async () => {
            const token = await getToken({ template: "supabase" }); // from Clerk's jwt template 

            const queriedCards = await getCards({ userId, token });
            setCards(queriedCards);
        };

        fetchCards();
    }, [])

    return (
        <div>
            {cards && cards.map((card, index) => (
                <div key={index}>
                    <div>Question: {card.front}</div>
                    <div className='mb-5'>Answer: {card.back}</div>
                </div>
            ))}
        </div>
    )
}

export default FlashcardSetPage