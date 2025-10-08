'use server';

import { z } from 'zod';

const bookingFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function sendInquiry(formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const validatedFields = bookingFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Send Inquiry.',
    };
  }
  
  const { name, email, message } = validatedFields.data;

  console.log('New Inquiry:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);
  
  // TODO: Add your email sending logic here (e.g., using Resend, Nodemailer, etc.)
  // For demonstration, we'll just simulate a successful email send.
  
  try {
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'onboarding@resend.dev',
    //   to: 'your-email@example.com',
    //   subject: `New Inquiry from ${name}`,
    //   react: <EmailTemplate name={name} email={email} message={message} />,
    // });

    return {
        message: 'Inquiry sent successfully!',
        data: validatedFields.data,
    }
  } catch(error) {
    console.error(error);
    return {
        message: 'Failed to send inquiry.',
    }
  }
}
