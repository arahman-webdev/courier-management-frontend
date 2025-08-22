import AboutSection from "@/components/layout/Home/AboutSection";

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import SectionTitle from "@/components/layout/Home/SectionTile";
import { OurMission } from "@/components/layout/Home/About/OurMission";

const About = () => {
    return (
        <div>

            <AboutSection />
            <div>
                <div className="container mx-auto px-6 md:px-16 py-12">
                    {/* Service Description */}


                    <Separator className="mb-12" />

                    {/* Mission Statement */}
                    <section className="mb-16">
                        <div className="text-center space-y-6">
                            <SectionTitle title="Our Mission" />
                            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">Our mission is to build trust in every delivery by combining
                                technology, efficiency, and customer care. We aim to empower businesses and individuals with
                                transparent tracking</p>
                        </div>
                        <OurMission />
                    </section>

                    <Separator className="mb-12" />

                    {/* Team Info */}
                    <section>
                        <h2 className="text-2xl font-semibold text-center mb-10">Meet Our Team</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                { name: "Abdur Rahman", role: "Founder & CEO", img: "https://i.ibb.co.com/3M441xb/customer2.jpg" },
                                { name: "Sarah Khan", role: "Head of Operations", img: "https://i.pravatar.cc/150?img=47" },
                                { name: "Imran Hossain", role: "Tech Lead", img: "https://i.pravatar.cc/150?img=12" },
                            ].map((member, i) => (
                                <Card key={i} className="shadow-md rounded-2xl bg-[#15182C] transition ease-in duration-200 transform hover:-translate-y-5">
                                    <CardContent className="flex flex-col items-center p-6">
                                        <Avatar className="h-24 w-24 mb-4">
                                            <AvatarImage src={member.img} alt={member.name} />
                                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;