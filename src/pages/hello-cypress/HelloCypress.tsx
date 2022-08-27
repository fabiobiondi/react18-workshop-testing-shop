import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import css from "./HelloCypress.module.css";

export interface Item {
  id: number;
  name: string;
  cost: string;
}

const HelloCypress = () => {
  const [list, setList] = useState<Item[]>([]);
  const [listError, setListError] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<Item[]>(`${process.env.REACT_APP_API_URL}/fakeList`)
      .then((res) => setList(res.data))
      .catch((res) => setListError(true));
  }, []);

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/fakeForm`, { firstName })
      .then(() => {
        setSent(true);
        setFormError(false);
      })
      .catch(() => setFormError(true));
  }

  function deleteItem(id: number) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/fakeList/${id}`)
      .then(() => {
        setList((s) => s.filter((p) => p.id !== id));
      })
      .catch(() => console.log("ERROR!"));
  }

  const isFormValid = firstName.length > 3;

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="m-4">
        <h1 className="text-center">Hello</h1>
        <img
          className="h-10 w-auto mx-auto"
          src="/images/cypress-logo.png"
          alt=""
        />
      </div>

      <h1>Hello Forms</h1>

      <form className={css.panel} onSubmit={submitForm}>
        {formError && <div className={"bg-red-400 " + css.alert}>Error!</div>}
        {sent && <div className={"bg-green-400 " + css.alert}>Success!</div>}
        <input
          type="text"
          placeholder="Write your name"
          disabled={sent}
          name="first_name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <button type="submit" disabled={sent || !isFormValid}>
          {sent ? "SENT" : "SUBMIT FORM"}
        </button>
      </form>

      <h1>Hello List</h1>

      <ul className={css.panel} data-testid="list1">
        {listError && "list not loaded"}
        {list.map((item) => {
          return (
            <li key={item.id} className="flex justify-between items-center">
              <div>{item.name}</div>
              <div>
                € {item.cost}
                <button type="button" onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default HelloCypress;
