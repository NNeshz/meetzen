import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  appointment: ["create"],
  service: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  appointment: ["create"],
});

export const company = ac.newRole({
  service: ["create", "read", "update", "delete"],
});
