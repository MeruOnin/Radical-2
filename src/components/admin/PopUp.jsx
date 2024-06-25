import React from 'react';
import { motion } from 'framer-motion';
import FormComponent from './FormComponent';

const Popup = ({ title, inputs, onClose }) => {
    const handleSubmit = (values) => {
        console.log(values);
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white rounded-lg p-4 w-96"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">{title}</h2>
                    <button onClick={onClose} className="text-red-500">X</button>
                </div>
                <FormComponent
                    inputs={inputs}
                    btn={<button className="bg-blue-500 text-white px-4 py-2 rounded">ثبت</button>}
                    onSubmit={handleSubmit}
                />
            </motion.div>
        </motion.div>
    );
};

export default Popup;
