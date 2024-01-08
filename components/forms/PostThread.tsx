"use client";

import { useState, useEffect } from "react";
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
  const [emptyTextError, setEmptyTextError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [text, setText] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    if (!text) {
      setEmptyTextError("Please write some text before submitting.");
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

  const { transcript, listening } = useSpeechRecognition();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  return (
    <>
      {/* FORM TO CREATE FIL */}
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={onSubmit}
      >
        <div className="flex w-full flex-col gap-3 relative">
          <textarea
            className="no-focus no-outline border border-dark-4 bg-dark-1 text-light-1 box-shadow-big p-2"
            placeholder="Write here what you want to tell the world..."
            rows={15}
            value={text}
            onChange={handleChange}
          ></textarea>
          {/* VOICE RECOGNITION BUTTON */}
          <button
            type="button"
            onClick={() => SpeechRecognition.startListening()}
            className={`absolute bottom-3 right-3 ${
              listening ? "bg-green-700" : "bg-light-2 dark:bg-gray-400"
            } text-light-1 hover:text-dark-1 p-2 rounded-full`}
          >
            <img src="/assets/mike.svg" alt="microphone" />
          </button>
        </div>

        {emptyTextError && (
          <p className="text-light-1 text-center ">{emptyTextError}</p>
        )}
        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-dark-1 hover:bg-dark-1 hover:text-light-1"
          disabled={isButtonDisabled}
        >
          Post
        </button>
      </form>
    </>
  );
}

export default PostThread;
