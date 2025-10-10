import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // Choose what you need
    display: 'swap',
});

export default function ProjectDetailsCard({ title, value,isNumber }) {
    return (
        <div className="space-y-4 py-6 bg-white rounded-lg px-5">
            <h3 className="text-[#4A4C56] text-base font-semibold">{title}</h3>
            <h4 className={`text-[#1D1F2C] text-[32px] font-semibold ${poppins.className}`}>{value}</h4>
        </div>
    )
}