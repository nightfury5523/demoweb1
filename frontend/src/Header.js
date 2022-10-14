import { Avatar, Button } from "flowbite-react";
import React, { useCallback } from "react";
import { LogOut } from "react-feather";
import { useRecoilState, useRecoilValue } from "recoil";
import { accessUserState, authState } from "./reducers/authReducer";
import md5 from "md5";

export default function Header() {
  const [auth, setAuth] = useRecoilState(authState);
  const user = useRecoilValue(accessUserState);

  const onLogout = useCallback(() => {
    setAuth(null);
  }, [setAuth]);

  if (!auth) {
    return null;
  }

  return (
    <div className="w-full flex justify-between mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <Avatar
          img={`https://www.gravatar.com/avatar/${md5(user.Email)}`}
          size="md"
        />
        <span className="font-bold">{user.Email}</span>
      </div>
      <div>
        <Button onClick={onLogout}>
          <LogOut size={13} className="mr-1" /> Logout
        </Button>
      </div>
    </div>
  );
}
