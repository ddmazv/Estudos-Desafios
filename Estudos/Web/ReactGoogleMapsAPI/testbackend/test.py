#!/usr/bin/env python
import envProps as env
import asyncio
import websockets
import os
import json
from openai import OpenAI

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key= env.API_KEY,
)

DEFAULT_PROMPT1="You are an experienced real estate agent who has a large list of properties for sale and is trying to identify which is the best property for your client, especially where they want to live, so answer the following question from your client:"

def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": DEFAULT_PROMPT1 + prompt}]
    )
    return response.choices[0].message.content.strip()


async def echo(websocket):  # Removed 'path' parameter as it's no longer needed in newer websockets versions
    try:
        async for message in websocket:
            print("Received message:", message, flush=True)
                        # Echo the message back
            await websocket.send(chat_gpt(message))
            await websocket.send("[END]")
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected", flush=True)
    except Exception as e:
        print(f"Error: {e}", flush=True)

async def main():
    print("WebSocket server starting", flush=True)
    
    # Create the server with CORS headers
    async with websockets.serve(
        echo,
        "0.0.0.0",
        int(os.environ.get('PORT', 8090))
    ) as server:
        print("WebSocket server running on port 8090", flush=True)
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())