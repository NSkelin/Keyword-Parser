import {Button} from "@/components/Button";
import {Dialog} from "@/components/Dialog";
import {createCollectionAction} from "@/utils/actions";
import {createCollectionSchema} from "@/utils/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import styles from "./CreateCollectionFormDialog.module.scss";

export interface CreateCollectionFormDialogProps {
  onCreate: (collectionName: string) => void;
  onCancel: () => void;
  open?: boolean;
}

export function CreateCollectionFormDialog({onCreate, onCancel, open}: CreateCollectionFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful},
  } = useForm<z.output<typeof createCollectionSchema>>({
    resolver: zodResolver(createCollectionSchema),
  });

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  async function onSubmit(inputs: z.output<typeof createCollectionSchema>) {
    const formData = new FormData();
    formData.append("title", inputs.title);

    await createCollectionAction(formData);

    onCreate(inputs.title);
  }

  function handleCancel() {
    onCancel();
    reset();
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
          <input {...register("title")} placeholder="collection name" name="title"></input>
        </div>
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
