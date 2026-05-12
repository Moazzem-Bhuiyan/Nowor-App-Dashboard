import { Button, Upload, Form } from "antd";
import { UploadCloud } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";

export default function UUpload({
  name,
  label,
  required = false,
  max = 1,
  defaultFileList = [],
}) {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    setValue(name, defaultFileList);
  }, [defaultFileList, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultFileList}
      rules={{
        required: required ? `${label} is required` : false,
      }}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          validateStatus={error ? "error" : ""}
          help={error?.message}
          style={{
            textAlign: "center",
            border: "2px dashed #D9D9D9",
            paddingBlock: "30px",
            borderRadius: "10px",
          }}
        >
          <Upload
            listType="picture"
            maxCount={max}
            beforeUpload={() => false}
            fileList={field.value || []}
            onChange={({ fileList }) => {
              field.onChange(fileList);
            }}
          >
            <Button icon={<UploadCloud />}>Upload {label}</Button>
          </Upload>
        </Form.Item>
      )}
    />
  );
}
