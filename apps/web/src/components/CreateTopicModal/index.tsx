import { useAddTopicMutation } from "@/services/topic";
import { setTopicModal } from "@/store/topic/topicSlice";
import { CreateTopicData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import {
  getErrorFromPayload,
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import { Button, IconButton, Input, TextArea } from "@devsozluk/ui";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiCloseFill } from "react-icons/ri";

const CreateTopicModal = () => {
  const { isOpenTopicModal } = useAppSelector((state) => state.topic);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: CreateTopicData = { title: "", content: "" };
  const [handleAddTopic, { isLoading, status, data, error }] =
    useAddTopicMutation();

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setTopicModal(false))
      toast.success("Konu oluşturuldu, yönlendiriliyorsunuz.");
      router.push(`/topic/${data.topic.slug}`);
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  const closeTopicModal = async (event: any) => {
    if (event) event.preventDefault();
    dispatch(setTopicModal(false));
  };

  const handleCreate = useCallback(async (values: CreateTopicData) => {
    handleAddTopic({ ...values, author: user?.id });
  }, []);

  return (
    <Transition.Root show={isOpenTopicModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeTopicModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full border-t-2 border-primary bg-background shadow-md pl-6 sm:pl-6">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto z-50 w-screen max-w-xl mt-20 px-6">
                    <div className="flex-1 h-screen flex-col">
                      {/* Header */}
                      <div className="z-50">
                        <div className="flex w-full space-x-3 pb-4 mb-4 border-b border-gray-500 border-opacity-30">
                          <div className="space-y-1  w-full flex justify-between items-center">
                            <Dialog.Title className="text-lg font-bold leading-6 text-white">Konu Oluştur</Dialog.Title>
                            <IconButton onClick={closeTopicModal}>
                              <RiCloseFill size={20} />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={handleCreate} validateOnBlur={false} validateOnChange={false}
                      >
                        {({ errors, setFieldValue, values, handleSubmit }) => (
                          <Form className="">
                            <div className="space-y-6 relative">
                              <Input name="title" placeholder="Konu başlığını yazınız." label="Konu Başlığı" value={values.title} onChange={(event) => setFieldValue("title", event.target.value)} errorMessage={errors.title} />
                              <TextArea
                                name="content"
                                errorMessage={errors.content}
                                label="Konu İçeriği"
                                value={values.content}
                                rows={6}
                                onChange={(event) => setFieldValue("content", event.target.value)}
                                placeholder="Konu içeriğini yazınız."
                              />
                            </div>
                            <div className="absolute bottom-5 right-5 left-0 border-t border-gray-500 border-opacity-30">
                              <Button className="mt-5 ml-auto" size="md" loading={isLoading} onClick={() => handleSubmit()}>
                                Yayınla
                              </Button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateTopicModal;
