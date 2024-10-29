import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormField,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";


const formSchema = z.object({
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(20),
  contact: z.string().min(5).max(100),
  subject: z.string().min(10).max(10),
  message: z.string().min(10).max(200),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: " ",
      lastname: " ",
      contact: " ",
      subject: " ",
      message: " ",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Left-side card with an image - hidden on mobile */}
      <div className="hidden sm:flex flex-col sm:w-1/2 p-6 rounded-lg ml-4">
        {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwHxw0bi2ojglm_vyQJdYm3BfUCWrzf9ciPQ&s" // Replace with your image URL
            alt="Aesthetic Image"
            className="w-full h-full object-cover rounded-lg"
          /> */}
        <p className="border-l-4 text-4xl text-green-600 border-l-green-600 p-1 ml-2 font-mono">
          CONTACT US
        </p>
        <p className="text-3xl py-7 ml-2">Get in touch with the site admin</p>

        <p className="text-sm ml-2">
          If you have any questions regarding the site, or need to report
          miscounduct feel free to contact us. We will get back to you
          immediately we get your message.
        </p>

        <div className="cards flex flex-col space-y-4 ml-2">
          <Card className=" w-2/3 h-fit mt-8 shadow-lg">
            <CardContent className="p-4 flex space-x-2">
              <img src="/email-icon.png" alt="" className="ml-3" />
              <CardDescription className="p-4 text-teal-600 flex flex-col">
                <p className="text-green-500 text-2xl font-semibold">Email: </p>
                <p className="">owenhood80@gmail.com </p>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className=" w-2/3 h-fit shadow-lg">
            <CardContent className="p-4 flex space-x-2">
              <img src="/phone-icon.png" alt="" className="ml-3" />
              <CardDescription className="p-4 text-teal-600 flex flex-col">
                <p className="text-green-500 text-2xl font-semibold">Phone number: </p>
                <p>+254 745176691</p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right-side form */}
      <div className="w-full sm:w-1/2 p-6 text-teal-500">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-black w-3/4"
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact" {...field} />
                  </FormControl>
                  <FormDescription className="text-green-700">
                    Where we contact you
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-teal-600 text-white">
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
