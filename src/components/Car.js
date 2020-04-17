import React from "react";
import { Button } from "antd";

const Car = ({ _id, name, onDelete, onUpdate }) => {
  const [loading, setLoading] = React.useState(false);

  const handleDelete = () => {
    setLoading(true);

    onDelete(_id)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleUpdate = event => {
    if (event.target.value === name) {
      return;
    }

    setLoading(true);

    onUpdate(_id, event.target.value)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <li>
      <input
        id={_id}
        type="text"
        name="carName"
        defaultValue={name}
        onBlur={handleUpdate}
        disabled={loading}
      />
      <Button loading={loading} onClick={handleDelete}>
        Delete
      </Button>
    </li>
  );
};

export { Car };
