interface EmailTemplateProps {
  firstName: string;
  replierName: string;
  email?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  email,
  replierName,
  // replierName,
}) => (
  <div>
    <h1>Hi, {firstName}!</h1>
    <p>One of your fils has received a new comment by {replierName}.</p>
    {/* <button className="bg-dark-2 text-white font-bold py-2 px-4 rounded-lg p-2"> */}{" "}
    <a
      href="https://fils.vercel.app/activity"
      target="_blank"
      className=" text-white "
    >
      Click here to see your activity
    </a>{" "}
    <br /> <br />
    {/* </button> */}
    <div>
      <a href="https://fils.vercel.app/"> Fils</a> © 2023
    </div>
  </div>
);
