interface EmailTemplateProps {
  firstName: string;
  replierName: string;
  email?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  replierName,
}) => (
  <div>
    <h1>Hi, {firstName}!</h1>
    <p>One of your fils has received a new comment by {replierName}.</p>
    <a
      href="https://fils.vercel.app/activity"
      target="_blank"
      className=" text-white "
    >
      Click here to see your activity
    </a>{" "}
    <br /> <br />
    <div>
      <a href="https://fils.vercel.app/"> Fils</a> © 2023
    </div>
  </div>
);
