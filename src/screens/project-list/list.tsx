import { UserType } from "./types";

interface Props {
  list: Array<any>;
}

interface Props {
  users: Array<UserType>;
}

export const List: React.FC<Props> = ({ list, users }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>负责人</th>
          </tr>
        </thead>
        <tbody>
          {list.map((project) => (
            <tr key={`project-${project.id}`}>
              <td>{project.name}</td>
              <td>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
