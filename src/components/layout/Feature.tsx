
import { DollarSign, Search, Warehouse } from "lucide-react"; // example icons

// You can move these to a data file if you wish
const features = [
    {
        title: "TRANSPARENT PRICING",
        description:
            "Globally initiate resource maximizing total linkage via enabled process improvements.",
        icon: DollarSign,
        bg: "bg-pink-100",
    },
    {
        title: "ONLINE TRACKING",
        description:
            "Globally initiate resource maximizing total linkage via enabled process improvements.",
        icon: Search,
        bg: "bg-gray-100",
    },
    {
        title: "WAREHOUSE STORAGE",
        description:
            "Globally initiate resource maximizing total linkage via enabled process improvements.",
        icon: Warehouse,
        bg: "bg-sky-100",
    },
];

export default function FeatureSection() {
    return (
        <div className="container mx-auto px-4 shadow-2xl py-16 rounded-4xl top-60">
            <div className="mb-16">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="md:w-1/3">
                        <div className="mb-0 ">
                            <div className="">
                                <h4 className="text-primary text-sm font-semibold tracking-widest mb-1 shadow-2xl rounded-[20px] border-b-2 border-primary inline-block px-7 py-3">
                                    FEATURES
                                </h4>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold">WHAT WE OFFER</h2>
                        </div>
                    </div>
                    <div className="md:w-2/3 flex items-center">
                        <div>
                            <p className="relative pl-6 text-gray-600 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-4 before:h-0.5 before:bg-primary">
                                Collaboratively customize front-end materials with standardized
                                infomediaries. Holisticly engineer performance based value.
                                Assertively benchmark turnkey web-readiness rather than long.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature cards */}
            <div className="flex flex-col md:flex-row gap-8 justify-center">
                {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.title}
                            className={`flex-1 rounded-2xl shadow-md p-8 flex flex-col items-center text-center ${feature.bg} transition hover:shadow-lg`}
                        >
                            <div className="mb-5">
                                <Icon className="w-16 h-16 text-primary" />
                            </div>
                            <h5 className="text-lg font-bold mb-3">{feature.title}</h5>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
