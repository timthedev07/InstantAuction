import { FC, useState } from "react";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";

interface ModifyItemProps {
  id: number;
  name: string;
  picture: string;
}

export const ModifyItem: FC<ModifyItemProps> = ({ name, picture }) => {
  const [currName, setCurrName] = useState<string>(name);

  const handleChangePicture = () => {};

  return (
    <Formik initialValues={{ name, picFile: null }} onSubmit={() => {}}>
      {() => {
        <form>
          <h3 className="text-lg">Modify Item</h3>
          <TextField
            value={currName}
            onChange={e => setCurrName(e.target.value)}
          />
          <img src={picture} onClick={handleChangePicture} />

          <button type="submit">Submit</button>
        </form>;
      }}
    </Formik>
  );
};
