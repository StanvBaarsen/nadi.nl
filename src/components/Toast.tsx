'use client';
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    // Animate with opacity and translate for appear/disappear
    return (
        <div
            className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out
                ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
            style={{ willChange: 'opacity, transform' }}
        >
            <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
                <div className="bg-green-500 rounded-full p-1">
                    <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <span className="font-medium text-sm">{message}</span>
            </div>
        </div>
    );
};
