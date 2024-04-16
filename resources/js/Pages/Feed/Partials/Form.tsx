import React, { FormEventHandler, useRef } from 'react';
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import TextareaInput from "@/Components/TextareaInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

interface Props {
  onPostSubmit: () => void;
}

function Form({onPostSubmit}: Readonly<Props>) {
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const {data, setData, post, processing, errors, reset, recentlySuccessful} = useForm({
    content: '',
  })

  const createPost: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('feeds.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onPostSubmit();
      },
      onError: (errors) => {
        if (errors.content) {
          reset('content');
          contentInput.current?.focus();
        }
      },
    });
  }

  return (
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Create Post
        </h2>
      </header>

      <form onSubmit={createPost} className="mt-6 space-y-6">
        <div>
          <TextareaInput
            id="content"
            ref={contentInput}
            value={data.content}
            placeholder="What's on your mind?"
            onChange={(e) => setData('content', e.target.value)}
            className="mt-1 block w-full"
          />

          <InputError message={errors.content} className="mt-2"/>
        </div>

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>
            Post
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Posted.
            </p>
          </Transition>
        </div>
      </form>
    </section>
  );
}

export default Form;
