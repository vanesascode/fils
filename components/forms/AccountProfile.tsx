"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserValidation } from "@/lib/validations/user";
import { updateUser } from "@/lib/actions/user.actions";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    email: string;
  };
}

const AccountProfile = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const [errorMessageGeneral, setErrorMessageGeneral] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image ? user.image : "",
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    try {
      await updateUser({
        name: values.name,
        username: values.username,
        userId: user.id,
        bio: values.bio,
        image: values.profile_photo,
        email: user.email,
      });

      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.message.includes("image")) {
        setErrorMessageImage(
          "Please add a valid image. The image cannot be bigger than 2MB."
        );
      } else {
        setErrorMessageGeneral(
          "An error occurred while updating your profile. Please try using a different username or using a different image smaller than 2MB."
        );
      }
    }
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));
      if (!file.type.includes("image")) return;
      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-1">
              <FormLabel>
                {field.value ? (
                  <img
                    src={field.value}
                    alt="profile_icon"
                    className="rounded-image-profile-onboarding"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-dark-2">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input "
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {errorMessageImage && (
          <p className="text-red-500 text-base-semibold">{errorMessageImage}</p>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-dark-1">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-dark-1">
                Short description
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-dark-1">
                Bio (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessageGeneral && (
          <p className="text-red-500 text-base-semibold">
            {errorMessageGeneral}
          </p>
        )}

        <div className="text-dark-1 text-center xs:text-base text-small-regular">
          Images cannot be <br />
          bigger than 2MB
        </div>

        <Button
          type="submit"
          className="flex cursor-pointer gap-3 rounded-lg bg-dark-2 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold text-light-1 hover:bg-light-2 hover:text-dark-1"
        >
          Continue
        </Button>
      </form>

      <div className="flex cursor-pointer gap-3 rounded-lg bg-light-1 px-4 py-2 items-center justify-center text box-shadow-small text-base-semibold hover:bg-dark-1 hover:text-light-1 text-dark-1">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            Change account
          </SignOutButton>
        </SignedIn>
      </div>
    </Form>
  );
};

export default AccountProfile;
