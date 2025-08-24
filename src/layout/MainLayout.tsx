import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function MainLayout() {
    return (
        <div className="min-h-screen w-full relative bg-white saira-font">
            {/* Soft Yellow Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at center, #FFF991 0%, transparent 70%)
      `,
                    opacity: 0.6,
                    mixBlendMode: "multiply",
                }}
            />
            <div>
                <Navbar></Navbar>
                <div className='min-h-[calc(100vh-285px)] max-w-7xl mx-auto my-5'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
                <Toaster></Toaster>
            </div>
        </div>

    )
}
