/*
  # Add contact form notifications

  1. New Tables
    - contact_messages: Store contact form submissions
    - Add trigger for email notifications

  2. Security
    - Enable RLS
    - Allow anonymous submissions
*/

-- Create contact messages table if not exists
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    recipient_email text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON public.contact_messages
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Create notification function
CREATE OR REPLACE FUNCTION notify_new_contact_message()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.resend_api_key'),
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'from', 'contact@yourdomain.com',
      'to', NEW.recipient_email,
      'subject', 'New Contact Form Message from ' || NEW.name,
      'html', format(
        'New message from contact form:<br><br>' ||
        'Name: %s<br>' ||
        'Email: %s<br>' ||
        'Message: %s<br>',
        NEW.name,
        NEW.email,
        NEW.message
      )
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for notifications
CREATE OR REPLACE TRIGGER on_new_contact_message
  AFTER INSERT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_message();