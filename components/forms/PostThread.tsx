"use client";

import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const [errorMessage, setErrorMessage] = useState("");

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    if (!text) {
      setErrorMessage("Please write some text before submitting.");
      return;
    }
    await createThread({
      text: text,
      author: userId,
      path: pathname,
    });

    router.push("/");

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 4000);
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const copyToClipboard = () => {
    setText(transcript);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // console.log(text);

  return (
    <>
      {/* FORM TO CREATE FIL */}
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-3 ">
          <textarea
            className="no-focus border border-dark-4 bg-light-1 text-dark-1 box-shadow-big"
            placeholder="Write here what you want to tell the world..."
            rows={15}
            value={text}
            onChange={handleChange}
          ></textarea>

          {/* Add any form validation or error message components here */}
        </div>
        {errorMessage && (
          <p className="text-light-1 text-center ">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="bg-dark-1 text-light-1 hover:bg-light-1 hover:text-dark-1 box-shadow-small"
          disabled={isButtonDisabled}
        >
          Post
        </button>
      </form>

      {/* VOICE RECOGNITION BUTTONS */}

      <div className="mt-10 flex gap-5">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button
          onClick={() => SpeechRecognition.startListening()}
          className="bg-dark-1 text-light-1 hover:bg-light-1 hover:text-dark-1 box-shadow-small"
        >
          Start
        </button>

        <button
          onClick={copyToClipboard}
          className="bg-dark-1 text-light-1 hover:bg-light-1 hover:text-dark-1 box-shadow-small"
        >
          Add to fil
        </button>
        <p>{transcript}</p>
      </div>
    </>
  );
}

export default PostThread;
