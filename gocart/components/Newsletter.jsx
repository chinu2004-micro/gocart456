import React, { useState } from 'react'

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setEmail('');
        }
    };

    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-medium text-[#171717] mb-4">
                    {submitted ? "Thank you!" : "Stay in the Loop"}
                </h2>
                <p className="text-sm text-[#5F5A55] mb-8 max-w-md mx-auto">
                    {submitted 
                        ? "You've been added to our newsletter. Look out for exclusive offers!"
                        : "Get first access to new collections, exclusive offers, and curated edits."
                    }
                </p>
                
                {!submitted && (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-5 py-3 rounded-full border border-[#DED6CC] bg-white text-sm text-[#171717] placeholder:text-[#5F5A55] focus:outline-none focus:ring-2 focus:ring-[#D8C7B5]"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#D8C7B5] text-white rounded-full font-medium text-sm hover:bg-[#B9A28C] transition active:scale-95"
                        >
                            Subscribe
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}

export default Newsletter