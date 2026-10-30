import Link from 'next/link';

export default function Footer() {
    return (
        <div className="bottom-0 bg-green-50 text-blue-950">
            <nav>
                <ul className="p-8 flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4">
                    <li className="flex flex-col py-4 gap-2">
                        <h2 className="md:text-lg font-bold">Actions</h2>
                        <Link href="/" className="cursor-not-allowed">Summarist Magazine</Link>
                        <Link href="/subscription-plan">Cancel Subscription</Link>
                        <Link href="/"className="cursor-not-allowed">Help</Link>
                        <Link href="/" className="cursor-not-allowed">Contact Us</Link>
                    </li>
                    <li className="flex flex-col py-6 gap-2"> 
                        <h2 className="md:text-lg font-bold">Useful Links</h2>
                        <Link href="/subscription-plan">Pricing</Link>
                        <Link href="/" className="cursor-not-allowed">Summarist Business</Link>
                        <Link href="/" className="cursor-not-allowed">Gift Cards</Link>
                        <Link href="/" className="cursor-not-allowed">Author and Publishers</Link>
                    </li>
                    <li className="flex flex-col py-6 gap-2">
                        <h2 className="md:text-lg font-bold">Company</h2>
                        <Link href="/" className="cursor-not-allowed">About</Link>
                        <Link href="/" className="cursor-not-allowed">Careers</Link>
                        <Link href="/" className="cursor-not-allowed">Partners</Link>
                        <Link href="/" className="cursor-not-allowed">Code of Conduct</Link>
                    </li>
                    <li className="flex flex-col py-6 gap-2">
                        <h2 className="md:text-lg font-bold">Other</h2>
                        <Link href="/" className="cursor-not-allowed">Sitemap</Link>
                        <Link href="/subscription-plan">Legal Notice</Link>
                        <Link href="/" className="cursor-not-allowed">Terms of Service</Link>
                        <Link href="/" className="cursor-not-allowed">Privacy Policy</Link>
                    </li>
                </ul>
            </nav>
            <h2 className="flex font-semibold justify-center mb-4">Copyright &copy; 2026 Summarist</h2>
        </div>
    )
}