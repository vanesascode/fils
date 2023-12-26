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
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
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
  const { startUpload } = useUploadThing("media");

  console.log(user.email);

  const [files, setFiles] = useState<File[]>([]);
  //The File type comes from the File interface defined in the File API provided by the browser. The File interface represents a file (or blob) and provides information about the file, such as its name, size, type, and last modified date.

  const [errorMessageGeneral, setErrorMessageGeneral] = useState("");
  const [errorMessageUsername, setErrorMessageUsername] = useState("");
  const [errorMessageImage, setErrorMessageImage] = useState("");

  //// the order of the name, path, username, userId, bio, and image values in the object passed to the updateUser function does not matter. The function is designed to extract those values from the object and use them in the correct order, regardless of the order in which they were passed.

  // This is because the function is using object destructuring to extract the values of those properties from the object. Object destructuring allows you to extract values from objects by specifying the property names you want to extract, and the order of the property names in the destructuring statement does not matter.

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
        username: values.username.replace(/\s/g, ""),
        userId: user.id,
        bio: values.bio,
        image: values.profile_photo,
        email: user.email,
      });

      // if (/\s/.test(values.username)) {
      //   setErrorMessageUsername("Username cannot contain spaces");
      //   return;
      // }

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
      } else if (error.message.includes("username")) {
        setErrorMessageUsername(
          "This username is already taken. \nPlease choose a different one."
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
    //The FileReader constructor is a built-in JavaScript object that provides functionality to asynchronously read the contents of files (or blobs) stored on the user's computer.

    //The e.target.files property is a FileList object that represents the files selected by the user. The FileList object is an array-like object that contains File objects, one for each selected file.
    if (e.target.files && e.target.files.length > 0) {
      // = if (there are files)
      const file = e.target.files[0];
      //In this case, the code assumes that the user has selected only one file. The [0] index is used to retrieve the first element of the FileList object, which is the first file selected by the user.
      // The File object returned by this line can then be used to access information about the file, such as its name, size, type, and last modified date.

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
                Username
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

        {errorMessageUsername && (
          <p className="text-red-500 text-base-semibold text-ellipsis text-center">
            {errorMessageUsername}
          </p>
        )}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-1">
              <FormLabel className="text-base-semibold text-dark-1">
                Bio
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
