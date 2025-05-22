import { Check, X } from 'lucide-react';
import React from 'react'

const PasswordCriteria = ({ password }) => {
    const criteria = [
        {
            label: 'Minimum 8 characters',
            met: password.length >= 8,
        },
        {
            label: 'Contains a number',
            met: /\d/.test(password),
        },
        {
            label: 'Contains special character',
            met: /[@$!%*?&_^]/.test(password),
        },
        {
            label: 'Contains an uppercase letter',
            met: /[A-Z]/.test(password),
        },
        {
            label: 'Contains a lowercase letter',
            met: /[a-z]/.test(password),
        },
        {
            label: 'Password has 12 or more characters',
            met: password.length >= 12,
        }
    ];
    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((item) => (
                <div key={item.label} className='flex items-center text-xs'>
                    {item.met ?
                        (
                            <Check className='size-4 text-green-500 mr-2' />
                        ) :
                        (
                            <X className='size-4 text-gray-500 mr-2' />
                        )
                    }
                    <span className={`${item.met ? 'text-green-500' : 'text-gray-400'}`}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    )

}

const PasswordStrengthMeter = ({ password }) => {
    const getStrengthLevel = (pass) => {
        const hasLength = pass.length >= 8;
        const hasNumber = /\d/.test(pass);
        const hasSymbol = /[@$!%*?&_^]/.test(pass);
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);

        const conditionsMet = [hasNumber, hasSymbol, hasUpper, hasLower].filter(Boolean).length;

        if (pass.length >= 12 && conditionsMet === 4) return 5;
        if (hasLength && conditionsMet >= 3) return 4;
        if (hasLength && conditionsMet >= 2) return 3;
        if (hasLength && conditionsMet === 1) return 2;
        if (pass.length > 0) return 1;
        return 0;
    };

    const getStrengthLabel = (level) => {
        switch (level) {
            case 5: return 'Very Strong';
            case 4: return 'Strong';
            case 3: return 'Good';
            case 2: return 'Fair';
            case 1: return 'Weak';
            default: return 'Very Weak';
        }
    };

    const getColorByLevel = (level) => {
        if (level === 1) return 'bg-red-500';
        if (level === 2) return 'bg-orange-400';
        if (level === 3) return 'bg-yellow-400';
        if (level === 4) return 'bg-green-500';
        if (level === 5) return 'bg-green-700';
        return 'bg-gray-500';
    };

    const strengthLevel = getStrengthLevel(password);
    const strengthLabel = getStrengthLabel(strengthLevel);

    return (
        <div className='mt-2'>
            <div className='flex justify-between items-center mb-1'>
                <span className='text-xs text-gray-400'>Password Strength</span>
                <span className='text-xs text-gray-400'>{(strengthLabel)}</span>
            </div>

            <div className='flex gap-1'>
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-full flex-1 rounded-full transition-colors duration-300 ${index < strengthLevel ? getColorByLevel(strengthLevel) : 'bg-gray-500'
                            }`}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    )
}

export default PasswordStrengthMeter