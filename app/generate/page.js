'use client'

import { useUser } from "@clerk/nextjs"

export default function generate () {
    const {isLoaded, isSignedIn, user} = useUser
    const {flashcard, setFlashCards} = useState([])
    const {flipped, setFlipped} = useState([])
}

