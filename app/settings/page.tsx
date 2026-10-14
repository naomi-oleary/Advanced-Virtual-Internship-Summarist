import NavBar from "../components/client-side/NavBar"

export default function Settings() {
    return (
        <div>
            <NavBar />
            <div className="text-blue-950 p-8">
                <h1 className="text-xl font-bold py-4">Settings</h1>
                <hr className="border-t border-gray-300" />
                <h2 className="text-lg font-bold py-4">Your Subscription Plan</h2>
                <p className="mb-4">premium-plus</p>
                <hr className="border-t border-gray-300" />
                <h2 className="text-lg font-bold py-4">Email</h2>
                <p>person@email.com</p>
            </div>
        </div>
    )
}