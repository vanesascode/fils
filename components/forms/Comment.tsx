"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread, postEmail } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
  authorEmail: string;
  authorName: string;
  replierName: string;
}

function Comment({
  threadId,
  currentUserImg,
  currentUserId,
  authorEmail,
  authorName,
  replierName,
}: Props) {
  const pathname = usePathname();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const commentRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    setIsButtonDisabled(true);
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    setAddComment(true);

    setTimeout(() => {
      setAddComment(false);
    }, 1000);

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 4000);

    //SEND EMAIL - RESEND

    await postEmail(authorEmail, authorName, replierName);

    form.reset();
  };

  // SCROLL DOWN WHEN COMMENT IS CREATED
  useEffect(() => {
    if (addComment && commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [addComment]);

  return (
    <>
      {/*TOAST WHEN COMMENT IS ADDED*/}
      {addComment && (
        <div
          className=" fixed bottom-20 left-0  w-full h-full flex justify-center items-end
        
         z-50 "
        >
          <div className="bg-light-2 dark:bg-green-1 px-[30px] py-[20px] rounded-lg shadow text-center flex gap-2 text-dark-1 text-base-semibold">
            <div>New Comment Added</div>
          </div>
        </div>
      )}

      {/*COMMENT FORM*/}
      <Form {...form}>
        <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <div className="w-[45px] h-[45px] rounded-full overflow-hidden flex justify-center items-center">
                    <img
                      src={currentUserImg}
                      alt="current_user"
                      className="rounded-image-profile-comment"
                    />
                  </div>
                </FormLabel>
                <FormControl className="border-none bg-transparent text-light-1">
                  <Textarea
                    rows={1}
                    {...field}
                    placeholder="Comment..."
                    className="no-focus text-light-1 outline-none placeholder:text-light-1 custom-scrollbar"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="user-card_btn bg-light-1 text-dark-1 box-shadow-small hover:bg-dark-1 hover:text-light-1"
            disabled={isButtonDisabled}
          >
            Reply
          </Button>
        </form>
      </Form>
      {/*Point where scrolling down goes*/}
      <div ref={commentRef} />
    </>
  );
}

export default Comment;
