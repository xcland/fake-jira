import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { UserType } from "./types";
import { useEffect, useState } from "react";
import { cleanObject } from "utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export type ParamType = {
  name: string;
  personId: string;
};

export const ProjectListScreen: React.FC = () => {
  const [users, setUsers] = useState<Array<UserType>>([]);

  const [param, setParam] = useState<ParamType>({
    name: "",
    personId: "",
  });

  const [list, setList] = useState<Array<any>>([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  );
};
