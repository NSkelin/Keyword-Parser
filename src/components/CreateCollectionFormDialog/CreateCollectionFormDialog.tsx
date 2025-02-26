import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import {Input} from "@/components/Input";
import {createCollectionAction} from "@/utils/actions";
import {createCollectionSchema} from "@/utils/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import styles from "./CreateCollectionFormDialog.module.scss";

export interface CreateCollectionFormDialogProps {
  onCreate: (collectionName: string) => void;
  onCancel: () => void;
  open?: boolean;
}

export function CreateCollectionFormDialog({onCreate, onCancel, open}: CreateCollectionFormDialogProps) {
  const [serverMsg, setServerMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful, errors},
  } = useForm<z.output<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      title: "",
    },
  });

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  // Recommended way of resetting by React Hook Form.
  useEffect(() => {
    if (isSubmitSuccessful && serverMsg === "") {
      reset();
    }
  }, [isSubmitSuccessful, reset, serverMsg]);

  async function onSubmit(inputs: z.output<typeof createCollectionSchema>) {
    const formData = new FormData();
    formData.append("title", inputs.title);

    const {success, message} = await createCollectionAction(formData);
    setServerMsg(message);

    if (success) {
      onCreate(inputs.title);
    }
  }

  function handleCancel() {
    onCancel();
    reset();
    setServerMsg("");
  }

  return (
    <Dialog onCancel={handleCancel} open={open}>
      <form
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className={styles.form}
      >
        <h2>Create a new collection</h2>
        <div className={styles.inputs}>
          <Input
            required
            label="Collection title"
            errorMessage={errors.title?.message}
            {...register("title")}
            placeholder="collection name"
            name="title"
          />
        </div>
        <div className={styles.serverError}>{serverMsg}</div>
        <div className={styles.actionBar}>
          <Button buttonStyle="submit" type="submit">
            Create {addSVG}
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
