import { useRef } from "react";

export interface IProps {
  onChange: (formData: FormData) => void;
}

const UploadButton: React.FC<IProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    props.onChange(formData);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <button type="button" onClick={onClickHandler}>
        Select your JSON file
      </button>
      <input
        accept=".json"
        name="report"
        onChange={onChangeHandler}
        ref={fileInputRef}
        title="report"
        type="file"
      />
    </form>
  );
};

export default UploadButton;
