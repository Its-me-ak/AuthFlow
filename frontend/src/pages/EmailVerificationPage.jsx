import React, { useEffect, useRef, useState } from 'react'
import { motion } from "motion/react"
import { Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EmailVerificationPage = () => {
    const isLoading = false
    const [code, setCode] = useState([
        '',
        '',
        '',
        '',
        '',
        ''
    ])
    const inputRef = useRef([])
    const navigate = useNavigate()

    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content (max 6 digits)
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRef.current[focusIndex]?.focus();
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRef.current[index + 1]?.focus();
            }
        }
    };
    


    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRef.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = code.join('')
        console.log("Verification Code submitted:", verificationCode);
        
    }

    // Auto submit when all inputs are filled
    useEffect(() => {
        if(code.every((digit) => digit !== '')){
            handleSubmit( new Event("submit"))
        }
    }, [code])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-5 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent'>
                    Verify Your Email
                </h2>
                <p className='text-gray-300 text-center text-sm mb-5'>
                    Enter a 6 digit code sent to your email to verify your account
                </p>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='flex justify-between'>
                        {code.map((digit, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputRef.current[i] = el)}
                                type="text"
                                name={`code${i}`}
                                value={digit}
                                maxLength={6}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-12 h-12 text-center text-white text-2xl font-bold bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none transition duration-200"
                                autoComplete="off"
                            />
                        ))}
                    </div>

                    <motion.button
                        type="submit"
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                    font-bold rounded-lg shadow-lg hover:from-green-600
                    hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                    >
                        {
                            isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Verify Email"
                        }
                    </motion.button>
                </form>
            </div>
        </motion.div>
    )
}

export default EmailVerificationPage