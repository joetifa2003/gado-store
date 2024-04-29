import Button from "@/components/button";
import Input from "@/components/input";
import colors from "@/lib/colors";
import { conversationsDao } from "@/lib/dao";
import { Conversation, Message } from "@/lib/dao/conversations";
import { auth } from "@/lib/firebase";
import { Stack, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, Pressable } from "react-native";

export default function ConversationPage() {
  const [conversation, setConversation] = useState<Conversation>({
    id: "",
    users: [],
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [messageMenu, setMessageMenu] = useState("");
  const params = useGlobalSearchParams();

  const sendMessage = useCallback(async () => {
    await conversationsDao.sendMessage(
      params.id as string,
      auth.currentUser?.uid as string,
      input,
    );
    setInput("");
  }, [input]);

  useEffect(() => {
    conversationsDao.getOne(params.id as string).then(setConversation);
    conversationsDao.messages(params.id as string, setMessages);
  }, [params]);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Stack.Screen
        options={{
          title: `${conversation.users.map((u) => u.name).join(", ")}`,
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={messages}
        inverted
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            onLongPress={() =>
              auth.currentUser?.uid === item.senderUID &&
              setMessageMenu(item.id)
            }
            style={{
              margin: 8,
              alignSelf:
                item.senderUID === auth.currentUser?.uid
                  ? "flex-start"
                  : "flex-end",
              backgroundColor:
                item.senderUID === auth.currentUser?.uid
                  ? colors.primary
                  : colors.white,
              borderRadius: 8,
              padding: 8,
            }}
          >
            <Text>{item.content}</Text>
          </Pressable>
        )}
      />
      <Input
        placeholder="Send message"
        value={input}
        onChangeText={setInput}
        onSubmit={sendMessage}
      />
      {messageMenu && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 1,
            backgroundColor: colors.white,
            padding: 8,
            gap: 8,
          }}
        >
          <Button
            title="Delete"
            onPress={() => {
              conversationsDao.deleteMessage(params.id as string, messageMenu);
              setMessageMenu("");
            }}
          />
          <Button
            title="Close"
            onPress={() => {
              setMessageMenu("");
            }}
          />
        </View>
      )}
    </View>
  );
}
