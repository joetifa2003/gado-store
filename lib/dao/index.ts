import { Conversations } from "./conversations";
import { Users } from "./users";

export const usersDao = new Users();

export const conversationsDao = new Conversations(usersDao);
