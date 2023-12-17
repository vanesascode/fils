"use client";

import { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      // communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  // Speech Recognition:

  const [transcriptValue, setTranscriptValue] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="mt-10 flex flex-col justify-start gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3 ">
                <FormControl
                  className="no-focus border border-dark-4 bg-light-1 text-dark-1 box-shadow-big "
                  placeholder="Write here what you want to tell the world..."
                >
                  <Textarea rows={15} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-dark-1 text-light-1 hover:bg-light-1 hover:text-dark-1 box-shadow-small"
          >
            Post
          </Button>
        </form>
      </Form>

      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={() => SpeechRecognition.startListening()}>
          Start
        </button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={copyToClipboard}>Copy Transcript</button>
        <p>{transcript}</p>
      </div>
    </>
  );
}

export default PostThread;
