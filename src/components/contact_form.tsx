import { ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { mergeClass } from "../libs/utils";
import { Label } from "./ui/label";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
    const [fullName, setFullName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [message, setMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState(false);

    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
        const templateParams = {
            name: fullName,
            email: email,
            time: new Date().toLocaleString(),
            message: message,
        };

        await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        toast({
            title: "Thank you!",
            description: "Your message has been sent.",
            variant: "default",
            className: mergeClass("top-0 mx-auto flex fixed md:top-4 md:right-4"),
        });

        setFullName("");
        setEmail("");
        setMessage("");

        setTimeout(() => {
            navigate("/");
        }, 1000);
        } catch (error) {
        console.error("EmailJS error:", error);
        toast({
            title: "Error",
            description: "Failed to send message. Try again later.",
            className: mergeClass(
            "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
            ),
            variant: "destructive",
        });
        } finally {
        setLoading(false);
        }
    };
    return (
        <form className="min-w-2xl mx-auto sm:mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
            <Label htmlFor="fullname">Full name</Label>
            <Input
                id="fullname"
                placeholder="Your Name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </LabelInputContainer>
        </div>
        <div className="grid w-full gap-1.5 mb-4">
            <Label htmlFor="content">Your Message</Label>
            <Textarea
            placeholder="Tell me about about your project,"
            id="content"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            {/* <p className="text-sm text-muted-foreground">
            I&apos;ll never share your data with anyone else. Pinky promise!
            </p> */}
        </div>
        <Button
            disabled={loading}
            className="bg-gradient-to-br relative max-w-sm group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
        >
            {loading ? (
            <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Please wait</p>
            </div>
            ) : (
            <div className="flex items-center justify-center">
                Send Message <ChevronRight className="w-4 h-4 ml-4" />
            </div>
            )}
            <BottomGradient />
        </Button>
        </form>
    );
    };

    export default ContactForm;

    const LabelInputContainer = ({
    children,
    className,
    }: {
    children: React.ReactNode;
    className?: string;
    }) => {
    return (
        <div className={mergeClass("flex flex-col space-y-2 w-full", className)}>
        {children}
        </div>
    );
    };

    const BottomGradient = () => {
    return (
        <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
        </>
    );
};
