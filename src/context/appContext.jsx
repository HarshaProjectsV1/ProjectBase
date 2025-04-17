import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "../supabaseClient";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [username, setUserName] = useState("random user");
    const [error, setError] = useState("");
    const [messages, setMessages] = useState([]);
    const [isOnBottom, setIsOnBottom] = useState(true);
    const [unviewedMessageCount, setUnviewedMessageCount] = useState(0);

    const myChannelRef = useRef(null);
    const scrollRef = useRef();

    const initUserSession = (session) => {
        setSession(session);
        setUserName(session?.user?.email || "random user");
    };

    const scrollToBottom = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    const handleNewMessage = useCallback(
        (newMessage) => {
            setMessages((previousMessages) => {
                if (previousMessages.some((msg) => msg.id === newMessage.id)) return previousMessages;

                const updatedMessages = [...previousMessages, newMessage];
                return updatedMessages.sort((a, b) => a.id - b.id);
            });

            if (isOnBottom) {
                scrollToBottom();
            } else {
                setUnviewedMessageCount((count) => count + 1);
            }
        },
        [isOnBottom, scrollToBottom]
    );

    const getInitialMessages = async () => {
        if (messages.length) return;

        const { data, error } = await supabase
            .from("messages")
            .select()
            .order("id", { ascending: true })
            .range(0, 49);

        if (error) {
            setError(error.message);
            return;
        }

        setMessages(data);
        scrollToBottom();
    };

    const getMessagesAndSubscribe = async () => {
        try {
            setError("");
            await getInitialMessages();

            if (!myChannelRef.current) {
                const channel = supabase
                    .channel("custom-all-channels")
                    .on(
                        "postgres_changes",
                        { event: "INSERT", schema: "public", table: "messages" },
                        (payload) => {
                            handleNewMessage(payload.new);
                        }
                    );

                const { error, status } = await channel.subscribe();

                if (error) {
                    setError("Subscription failed.");
                } else if (status === "SUBSCRIBED") {
                    myChannelRef.current = channel;
                }
            }
        } catch (err) {
            setError("Failed to subscribe to messages.");
        }
    };

    const onScroll = async ({ target }) => {
        const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;

        setIsOnBottom(isAtBottom);

        if (isAtBottom) {
            setUnviewedMessageCount(0);
        }

        if (target.scrollTop === 0) {
            const { data, error } = await supabase
                .from("messages")
                .select()
                .order("id", { ascending: true })
                .range(messages.length, messages.length + 49);

            if (error) {
                setError(error.message);
                return;
            }

            setMessages((prevMessages) => {
                const combined = [...data, ...prevMessages];
                const uniqueMessages = Array.from(
                    new Map(combined.map((msg) => [msg.id, msg])).values()
                );
                return uniqueMessages.sort((a, b) => a.id - b.id);
            });

            target.scrollTop = 1;
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            initUserSession(session);
        });

        getMessagesAndSubscribe();

        const {
            data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            initUserSession(session);
        });

        return () => {
            if (myChannelRef.current) {
                supabase.removeChannel(myChannelRef.current);
                myChannelRef.current = null;
            }
            authSubscription.unsubscribe();
        };
    }, []);

    return (
        <AppContext.Provider
            value={{
                messages,
                error,
                username,
                session,
                onScroll,
                scrollToBottom,
                scrollRef,
                unviewedMessageCount,
                isOnBottom,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };