import Link from "next/link";

const Footer = () => {
    const linkSections = [
        {
            title: "SHOP",
            links: [
                { text: "New Arrivals", path: "/new-arrivals" },
                { text: "Men", path: "/men" },
                { text: "Women", path: "/women" },
                { text: "Accessories", path: "/accessories" },
                { text: "Sale", path: "/sale" },
            ]
        },
        {
            title: "HELP",
            links: [
                { text: "Contact Us", path: "/contact" },
                { text: "Shipping Info", path: "/shipping" },
                { text: "Returns", path: "/returns" },
                { text: "FAQ", path: "/faq" },
            ]
        },
        {
            title: "ABOUT",
            links: [
                { text: "Our Story", path: "/about" },
                { text: "Careers", path: "/careers" },
                { text: "Blog", path: "/blog" },
                { text: "Sustainability", path: "/sustainability" },
            ]
        },
        {
            title: "CONNECT",
            links: [
                { text: "Instagram", path: "https://instagram.com" },
                { text: "Facebook", path: "https://facebook.com" },
                { text: "Twitter", path: "https://twitter.com" },
                { text: "Pinterest", path: "https://pinterest.com" },
            ]
        }
    ];

    const socialIcons = [
        { name: "Instagram", icon: InstagramIcon, link: "https://instagram.com" },
        { name: "Facebook", icon: FacebookIcon, link: "https://facebook.com" },
        { name: "Twitter", icon: TwitterIcon, link: "https://twitter.com" },
        { name: "Pinterest", icon: PinterestIcon, link: "https://pinterest.com" },
    ];

    return (
        <footer className="bg-[#1C1C1A] text-[#DED6CC] mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="text-2xl font-bold text-white">
                            <span className="text-[#D8C7B5]">go</span>cart<span className="text-[#D8C7B5] text-3xl leading-0">.</span>
                        </Link>
                        <p className="mt-4 text-xs text-[#DED6CC] max-w-[200px]">
                            Curated essentials for the modern lifestyle. Discover quality products for every occasion.
                        </p>
                    </div>

                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-medium text-white mb-4 text-sm uppercase tracking-wider">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link 
                                            href={link.path} 
                                            className="text-xs hover:text-[#D8C7B5] transition-colors"
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-[#333333] mb-6">
                    <p className="text-xs text-[#DED6CC]">
                        © 2025 go cart. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        {socialIcons.map((social, i) => (
                            <Link 
                                key={i} 
                                href={social.link} 
                                className="w-8 h-8 flex items-center justify-center bg-[#333333] hover:bg-[#444444] transition-colors rounded-full"
                            >
                                <social.icon size={16} className="text-[#DED6CC]" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const InstagramIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
        <path d="M8 11V7a4 4 0 0 1 4-4" />
        <path d="M16 11V7a4 4 0 0 1 4-4" />
        <path d="M12 15a3 3 0 0 0 3-3V9a3 3 0 0 0-6 0v3a3 3 0 0 0 3 3z" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-4.28a2 2 0 0 0-2 1.12L6 4v4a2 2 0 0 0 2 2h3v5a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-3a2 2 0 0 1 2-2V8a2 2 0 0 0-2-2h3V4a2 2 0 0 0-2-2z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53a4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </svg>
);

const PinterestIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 11a9 9 0 1 1-17.5 5.5 3.5 3.5 0 0 0 7 2.5 3.5 3.5 0 0 0 7-2.5 3.5 3.5 0 0 0 5.5 2.5" />
        <path d="M17.58 11.51a4.5 4.5 0 0 0-2.23-.59 4.5 4.5 0 0 0-4.5 4.5" />
    </svg>
);

export default Footer;