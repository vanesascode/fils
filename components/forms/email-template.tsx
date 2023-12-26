interface EmailTemplateProps {
  firstName: string;
  email?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
}) => (
  <div>
    <h1>Hi, {firstName}!</h1>
    <p>One of your fils has received a new comment.</p>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {" "}
      <a href="https://fils.vercel.app/activity" target="_blank">
        See your activity
      </a>
    </button>
  </div>
);
