import { useState } from "react";
import { ListUI } from "../../Icons/ListUl";
import { Trash } from "../../Icons/Trash";
import { TCheckpoint, TListItem } from "../../types";
import { Datepicker } from "./Datepicker";
import { Timepicker } from "./Timepicker";

export const CheckpointForm = (props: {
  data: TListItem<TCheckpoint>;
  deleteCheckpoint: () => void;
}) => {
  const { data, deleteCheckpoint } = props;
  const { id, value: checkpoint } = data;

  const [thingsToTry, setThingsToTry] = useState<TListItem<string>[]>(
    checkpoint.things_to_try?.map((value) => ({
      value,
      id: crypto.randomUUID(),
    })) ?? []
  );

  const addThingsToTry = () => {
    setThingsToTry([...thingsToTry, { value: "", id: crypto.randomUUID() }]);
  };

  return (
    <div className="flex flex-col gap-4 bg-app-color text-white p-5 rounded-lg lg:w-2/3">
      <div className="flex w-full justify-between gap-4">
        <input
          defaultValue={checkpoint.title}
          placeholder="Checkpoint title*"
          required={true}
          name={id + "/title"}
          className="text-xl outline-0 w-full placeholder-white"
        />
        <div className="cursor-pointer" onClick={addThingsToTry}>
          <ListUI color="fill-white" />
        </div>
        <div className="cursor-pointer" onClick={deleteCheckpoint}>
          <Trash />
        </div>
      </div>
      <input
        defaultValue={checkpoint.location_url}
        placeholder="Location URL"
        name={id + "/location_url"}
        className="text-md outline-0 w-full placeholder-white"
      />
      <Datepicker
        scheme="scheme-dark"
        labelColor="text-white"
        required={true}
        defaultValue={checkpoint.visited_date}
        name={id + "/visited_date"}
      />
      <Timepicker
        name={id}
        defaultValue={{
          hour: checkpoint.visited_hour,
          minute: checkpoint.visited_minute,
          meridiem: checkpoint.visited_meridiem,
        }}
      />
      {thingsToTry.map((thing) => (
        <input
          key={thing.id}
          defaultValue={thing.value}
          placeholder="Things to try"
          name={id + "/things_to_try"}
          className="text-md outline-0 placeholder-white"
        />
      ))}
    </div>
  );
};
