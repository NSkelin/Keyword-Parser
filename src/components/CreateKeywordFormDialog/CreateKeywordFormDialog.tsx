import {Button} from "@/components/Button";
import {CommaSeparatedInput} from "@/components/CommaSeparatedInput";
import {Input} from "@/components/Input";
import {createKeywordSchema} from "@/utils/zodSchemas";
import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";
import {Dialog} from "../Dialog";
import styles from "./CreateKeywordFormDialog.module.scss";

export interface CreateKeywordFormDialogProps {
  /** The collection the currently edited keyword is apart of. Used to call the REST api. */
  collection: string;
  open?: boolean;
  /** A callback for when a user successfully creates a new keyword. Should be used to update state to keep the list relevant. */
  onCreate: (keywordId: number, collectionName: string, displayName: string, proficient: boolean, aliases: string[]) => void;
  /** Called when the user clicks the cancel button */
  onCancel?: () => void;
}
/** A \<dialog> form used to add / edit / delete keywords. */
export function CreateKeywordFormDialog({collection, open, onCreate, onCancel}: CreateKeywordFormDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful, errors},
    control,
  } = useForm<z.output<typeof createKeywordSchema>>({
    resolver: zodResolver(createKeywordSchema),
    defaultValues: {
      title: "",
      proficient: false,
      aliases: [],
    },
  });

  const addSVG = <Image src="/add.svg" alt="Edit icon" width={16} height={16} />;

  // Recommended way of resetting by React Hook Form.
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  /**
   * Sends a POST request to the API to create a new keyword.
   * @returns The newly created keywords ID.
   */
  async function onSubmit(inputs: z.output<typeof createKeywordSchema>) {
    try {
      const {title, proficient, aliases} = inputs;
      const response = await fetch(`/api/${collection}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({displayName: title, proficient, aliases}),
      });

      if (!response.ok) throw new Error("Bad response");

      const jsonData: unknown = await response.json();

      if (typeof jsonData === "object" && jsonData != null && "id" in jsonData && typeof jsonData.id === "number") {
        onCreate(jsonData.id, collection, title, proficient, aliases);
      } else {
        throw new Error("Bad id");
      }
    } catch (error) {
      console.error("Error occurred while adding keyword:", error);
      return;
    }
  }

  function handleCancel() {
    if (onCancel) onCancel();
    reset();
  }

  return (
    <Dialog title="Create Keyword" onCancel={handleCancel} open={open}>
      <form
        data-cy="keywordEditorComp"
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className={styles.container}
      >
        <div className={styles.inputs}>
          <Input
            required
            label="Display Name"
            errorMessage={errors.title?.message}
            {...register("title")}
            placeholder="The name of the keyword"
            name="title"
          />
          <Input
            data-cy="proficient"
            label="Proficient"
            type="checkbox"
            {...register("proficient")}
            errorMessage={errors.proficient?.message}
            name="proficient"
          />
          <Controller
            control={control}
            name="aliases"
            render={({field: {onChange, value}}) => (
              <CommaSeparatedInput
                label={"Aliases (comma-separated)"}
                savedInputs={value}
                onInputChange={onChange}
                required={true}
                errorMessage={errors.aliases?.message}
              />
            )}
          />
        </div>
        <Dialog.ActionBar>
          <Button buttonStyle="submit" data-cy="submit" type="submit">
            Create {addSVG}
          </Button>
          <Button data-cy="cancel" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Dialog.ActionBar>
      </form>
    </Dialog>
  );
}
