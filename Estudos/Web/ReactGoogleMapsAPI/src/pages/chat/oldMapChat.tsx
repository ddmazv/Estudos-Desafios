import { ChatInput } from "@/components/custom/chatinput";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { useState, useRef } from "react";
import { message } from "../../interfaces/interfaces"
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from 'uuid';
import { GoogleMap } from "@/components/custom/googlemap";
import { RxStomp } from "@stomp/rx-stomp";


//const socket = new WebSocket("ws://localhost:8090"); //change to your websocket endpoint

//Object.assign(global, { WebSocket});

//const socket = new WebSocket("ws://localhost:8080/gotnest/conversation"); //change to your websocket endpoint

const rxStomp = new RxStomp();

rxStomp.configure({
  brokerURL: 'ws://localhost:8080/ws',
  connectHeaders: {
    login: 'guest', 
    passcode: 'guest'
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 10000,
  reconnectDelay: 10000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
});

//rxStomp.configure({
//  brokerURL: 'ws://localhost:8080/gotnest',
//});


rxStomp.activate();

const subscription = rxStomp
  .watch({ destination: "/topic/public" })
  .subscribe((message) => console.log(message.body));

rxStomp.publish({
  destination: "/topic/test-rx",
  body: "First message to RxStomp",
});

let ok = false;

export function MapChat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  
  
  const messageHandlerRef = useRef<((event: any) => void) | null>(null);

  const cleanupMessageHandler = () => {
    /*if (messageHandlerRef.current && socket) {
      socket.removeEventListener("message", messageHandlerRef.current);
      messageHandlerRef.current = null;
    }*/
  };

async function handleSubmit(text?: string) {
  //if (!socket || socket.readyState !== WebSocket.OPEN || isLoading) return;

  const messageText = text || question;
  setIsLoading(true);
  cleanupMessageHandler();
  
  const traceId = uuidv4();
  setMessages(prev => [...prev, { content: messageText, role: "user", id: traceId }]);
  //socket.send(messageText);
  
  rxStomp.publish({
    destination: "/app/sendMessage",
    body: messageText,
  });

  setQuestion("");

  try {
    //messageHandlerRef.current =
    if (!ok) {
         rxStomp.watch({ destination: "/topic/public" }).subscribe( (message ) => {
                setIsLoading(false);
              
                
                setMessages(prev => {
                  const lastMessage = prev[prev.length - 1];
                  const newContent = lastMessage?.role === "assistant" 
                    ? lastMessage.content + message.body
                    : message.body;
                  
                  const newMessage = { content: newContent, role: "assistant", id: traceId };
                  return lastMessage?.role === "assistant"
                    ? [...prev.slice(0, -1), newMessage]
                    : [...prev, newMessage];
                });
                /*
                if (event.data.includes("[END]")) {
                  cleanupMessageHandler();
                }*/
              }
    );
    ok = true;
  }
    //socket.addEventListener("message", messageHandler);
  } catch (error) {
    console.error("WebSocket error:", error);
    setIsLoading(false);
  }
}

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background text-white">
      <div className="fixed z-30">
        <Header />
      </div>
      <div className="flex relative z-0 group">
        
          <div className="flex relative z-10 flex-col w-[700px] h-56 mt-[600px] gap-6 overflow-y-scroll pt-4 mx-[600px]" ref={messagesContainerRef}>
            {messages.length == 0 && <Overview />}
            {messages.map((message, index) => (
              <PreviewMessage key={index} message={message} />
            ))}
            {isLoading && <ThinkingMessage />}
            <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
          </div>

          <div className="flex fixed z-10 mx-[600px] px-4  pb-4 md:pb-6 gap-2 w-[700px] md:max-w-3xl mt-[825px] text-black">
            <ChatInput
              question={question}
              setQuestion={setQuestion}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
      
        <div className="fixed z-0 group-hover:blur-sm hover:!blur-none transition duration-500">
          <GoogleMap/>
        </div>
      </div>
    </div>
  );
};