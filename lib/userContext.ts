import { createContext } from "react";
import { User } from "./dao/users";

export const userContext = createContext<User>(null as any);
