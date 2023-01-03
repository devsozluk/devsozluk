import Button from "@/components/Elements/Button";
import { MarkdownEditor } from "@/components/Elements/Markdown";
import Input from "@/components/Form/Input";
import StatusMessage from "@/components/Form/StatusMessage";
import { toggleTopicModal } from "@/store/topic/topicSlice";
import { createTopic } from "@/store/topic/topicThunk";
import { CreateTopicData } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import { Dialog, Transition } from "@headlessui/react";
import { Formik } from "formik";
import { Fragment, useCallback } from "react";
import { Form, useNavigate } from "react-router-dom";

const CreateTopicModal = () => {
  const initialValues: CreateTopicData = { title: "", content: "" };
  const { isOpenTopicModal } = useAppSelector((state) => state.topic);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreate = useCallback(
    async (values: CreateTopicData, formikActions: any) => {
      const { payload } = await dispatch<any>(createTopic({ values, formikActions }));
      if (payload.topic) navigate(`/konu/${payload.topic.slug}`);
    },
    [dispatch]
  );

  const closeTopicModal = async (event: any) => {
    event.preventDefault();
    dispatch(toggleTopicModal());
  };

  return (
    <Transition.Root show={isOpenTopicModal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeTopicModal}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full border-t-2 border-primary bg-background pl-10 sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto z-50 w-screen max-w-xl pt-5">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="z-50 px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-white">Konu Oluştur</Dialog.Title>
                          <p className="text-sm text-gray-500">Get started by filling in the information below to create your new project.</p>
                        </div>
                      </div>
                    </div>
                    <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={handleCreate} validateOnBlur={false}>
                      {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
                        <>
                          <Form className="px-4">
                            {errors.responseMessage && <StatusMessage>{errors.responseMessage}</StatusMessage>}
                            <div className="space-y-6">
                              <Input name="title" placeholder="Konu başlığını yazınız." label="Konu Başlığı" errorText={errors.title} />
                              <MarkdownEditor
                                name="content"
                                errorText={errors.content}
                                label="Konu İçeriği"
                                value={values.content}
                                onChange={(value) => setFieldValue("content", value)}
                              />
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                              <Button variant="danger" size="sm" onClick={closeTopicModal}>
                                İptal
                              </Button>
                              <Button size="sm" loading={isSubmitting} onClick={() => handleSubmit()} disabled={!isValid}>
                                Yayınla
                              </Button>
                            </div>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateTopicModal;
