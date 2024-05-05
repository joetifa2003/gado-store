import { createContext } from "react";
import { UserData } from "./dao/user";

export const userContext = createContext<UserData>(null as any);
