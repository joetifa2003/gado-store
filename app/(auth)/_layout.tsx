import colors from "@/lib/colors";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          contentStyle: {
            backgroundColor: colors.base,
          },
        }}
      />
    </>
  );
}
