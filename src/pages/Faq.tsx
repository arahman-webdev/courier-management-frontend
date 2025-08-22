

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {id: "1",
        question: "How can I track my shipment?",
        answer:
            "You can track your shipment using the tracking number provided at the time of booking. Enter the tracking number on our website or mobile app to see real-time updates on your parcel’s status."
    },
    {id: "2",
        question: "What items are prohibited for shipping?",
        answer:
            "We do not ship items such as flammable liquids, explosives, illegal goods, precious stones, or perishable foods. For a complete list, please check our terms and conditions."
    },
    {id: "3",
        question: "How long does delivery take?",
        answer:
            "Delivery time depends on the destination. Local deliveries usually take 1-2 business days, while nationwide deliveries may take 2-5 business days. You can check the estimated delivery time during booking."
    },
    {id: "4",
        question: "Can I change the delivery address after booking?",
        answer:
            "Yes, you can request a change of address before the parcel is dispatched. Contact our customer support with your booking details for assistance."
    },
    {id: "5",
        question: "How do I contact customer support?",
        answer:
            "You can reach our 24/7 customer support via phone, email, or live chat on our website. We’re always here to help!"
    },
    {id: "6",
        question: "Do you offer insurance for parcels?",
        answer:
            "Yes, we offer insurance options to protect your parcels against loss or damage during transit. You can select insurance at the time of booking."
    }
];

export default function FaqPage() {


    return (
        <div className=" min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center  mb-6">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-[#43506e] text-center mb-10">
                    Find answers to the most common questions about our courier services. If you need more help, feel free to contact us!
                </p>
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">W/ chevron</h2>
                    <Accordion type="single" collapsible className="w-full" defaultValue="3">
                        {faqs.map((item, index) => (
                            <AccordionItem value={item.id} key={index} className="py-2">
                                <AccordionTrigger className="py-2 text-[15px]  leading-6 hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground pb-2">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}