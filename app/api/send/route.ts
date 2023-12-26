import { EmailTemplate } from "@/components/forms/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface Props {
  firstName: string;
  email: string;
}

export async function POST({ firstName, email }: Props) {
  console.log(firstName);
  console.log(email);
  try {
    const data = await resend.emails.send({
      from: "Fils <fils@resend.dev>",
      to: email,
      subject: "One your Fils has received a new comment",
      react: EmailTemplate({ firstName: firstName }),
      text: "",
    });
    console.log(data);

    return Response.json({ message: "Email sent", data }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Email not sent", error }, { status: 500 });
  }
}

// SEND EMAIL TO USER (part that would go into the Comments component)

// const res = await fetch("/api/send", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ firstName, email }),
// });
// const data = await res.json();
// console.log(data);
