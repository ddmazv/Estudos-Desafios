import { ChatInput } from "@/components/custom/chatinput";
import {
  PreviewMessage,
  ThinkingMessage,
} from "../../components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { useState, useRef, useEffect, useCallback } from "react";
import { message } from "../../interfaces/interfaces";
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from "uuid";
import { RxStomp } from "@stomp/rx-stomp";
import { Bgmap } from "@/components/custom/map";
import { cx } from "classix";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  MapCameraProps,
  Pin,
} from "@vis.gl/react-google-maps";
import { ZoomIn } from "lucide-react";
import { CustomMarker } from "@/components/custom/customMarker";
import { GOOGLE_MAPS_API } from "@/envProps";

//const socket = new WebSocket("ws://localhost:8090"); //change to your websocket endpoint

//Object.assign(global, { WebSocket});

//const socket = new WebSocket("ws://localhost:8080/gotnest/conversation"); //change to your websocket endpoint

const rxStomp = new RxStomp();

rxStomp.configure({
  brokerURL: "ws://localhost:8080/ws",
  connectHeaders: {
    login: "guest",
    passcode: "guest",
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 10000,
  reconnectDelay: 10000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
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

const initialCenter = {
  center: { lat: 29.752680850559475, lng: -95.36738686565486 },

  zoom: 9,
};
const alternativeCenter = {
  center: { lat: -15.797545197560614, lng: -47.89188707436282 },
  zoom: 13,
};
const newCenter = {
  center: { lat: -23.79946043157211, lng: -46.02302869929771 },
  zoom: 13,
};

export function ChatMap() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cameraProps, setCameraProps] = useState<MapCameraProps>(initialCenter);
  const [center, setCenter] = useState(initialCenter.center);
  //let map: google.maps.Map

  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
    setCameraProps(ev.detail); // ev.detail contém center, zoom, heading, tilt
  }, []);

  const messageHandlerRef = useRef<((event: any) => void) | null>(null);

  const cleanupMessageHandler = () => {
    /*if (messageHandlerRef.current && socket) {
      socket.removeEventListener("message", messageHandlerRef.current);
      messageHandlerRef.current = null;
    }*/
  };

  function updateView(messageText: string) {
    ///Logica somenete para prova de conceito
    if (messageText === "bertioga") {
      setCameraProps(newCenter);
      setCenter(newCenter.center);
    } else if (messageText == "brasilia") {
      setCameraProps(alternativeCenter);
      setCenter(alternativeCenter.center);
    }
  }
  async function handleSubmit(text?: string) {
    //if (!socket || socket.readyState !== WebSocket.OPEN || isLoading) return;
    const messageText = text || question;
    setIsLoading(true);
    cleanupMessageHandler();
    updateView(messageText);
    const traceId = uuidv4();
    setMessages((prev) => [
      ...prev,
      { content: messageText, role: "user", id: traceId },
    ]);
    //socket.send(messageText);

    rxStomp.publish({
      destination: "/app/sendMessage",
      body: messageText,
    });

    setQuestion("");

    try {
      //messageHandlerRef.current =
      if (!ok) {
        rxStomp.watch({ destination: "/topic/public" }).subscribe((message) => {
          setIsLoading(false);

          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            const newContent =
              lastMessage?.role === "assistant"
                ? lastMessage.content + message.body
                : message.body;

            const newMessage = {
              content: newContent,
              role: "assistant",
              id: traceId,
            };
            return lastMessage?.role === "assistant"
              ? [...prev.slice(0, -1), newMessage]
              : [...prev, newMessage];
          });
          /*
          if (event.data.includes("[END]")) {
            cleanupMessageHandler();
          }*/
        });
        ok = true;
      }
      //socket.addEventListener("message", messageHandler);
    } catch (error) {
      console.error("WebSocket error:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-w-0 h-dvh">
      <div className="fixed z-30">
        <Header />
      </div>
      <div className="flex fixed z-10 mx-[45vw] my-[35vh]"></div>
      <div className="flex group flex-col z-20 bg-muted/20 backdrop-blur-lg pb-5 px-5 hover:p-5 h-[20vh] hover:h-[35vh] mx-[35vw] w-[30vw] rounded-xl mt-[75vh] hover:mt-[62vh] transition-all">
        <div className="flex flex-col z-20 rounded-xl overflow-hidden">
          {messages.length == 0 && <Overview />}
          <div
            className="flex relative z-20 flex-col overflow-scroll h-56 gap-6 pt-4"
            ref={messagesContainerRef}
          >
            {messages.map((message, index) => (
              <PreviewMessage key={index} message={message} />
            ))}
            {isLoading && <ThinkingMessage />}
            <div
              ref={messagesEndRef}
              className="shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>
        </div>
        <div className="flex z-20 gap-2 w-full">
          <ChatInput
            question={question}
            setQuestion={setQuestion}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="flex fixed z-0 w-[100%] h-[100%] ">
        <APIProvider apiKey={GOOGLE_MAPS_API}>
          <Map
            onCameraChanged={handleCameraChange}
            mapId="b2f25cee9a28a1fc"
            mapTypeId="hybrid"
            disableDefaultUI={true}
            colorScheme="FOLLOW_SYSTEM"
            center={cameraProps.center}
            zoom={cameraProps.zoom}
          >
            <CustomMarker position={center}></CustomMarker>
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
