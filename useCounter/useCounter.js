import { useState } from "react"

export const useCounter = (initialValue = 0) => {
    const [counter, setCounter] = useState(initialValue);
    const sum = (value = 1) => {
        setCounter(counter + value);
    }
    const rest = (value = 1) => {
        if (counter <= 0) return;
        setCounter(counter - value);
    }
    const reset = () => {
        setCounter(initialValue);
    }
    return {
        counter,
        setCounter,
        sum,
        rest,
        reset,
        } 
}
