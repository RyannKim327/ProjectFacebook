# Facebook Messaging Tutorial

This tutorial covers how to use the Facebook Messaging feature to send messages and attachments through Facebook Messenger.

## Configuration

Ensure your `.env` has the `MESSENGER_TOKEN` set.

## Usage

### Sending a Text Message

```typescript
const { messenger } = await ProjectFacebook();
await messenger.sendMessage("Hello from Messenger!", event);
```

If the message is longer than 300 words, it will be automatically split into chunks of 250 words and sent sequentially with a 1.5-second delay.

### Sending an Attachment

You can send images or other files via URL or local path.

```typescript
const { messenger } = await ProjectFacebook();
await messenger.sendAttachment("image", "https://example.com/image.png", event);
```

#### Local Files
The tool also supports sending local files if configured with a hostname and asset paths.

### Using Callbacks

All messaging methods support an optional callback function:

```typescript
const { messenger } = await ProjectFacebook();

messenger.sendMessage("Hello!", event, (err, response) => {
    if (err) {
        console.error("Message failed:", err);
        return;
    }
    console.log("Message sent:", response.data);
});

messenger.sendAttachment("image", "https://example.com/image.png", event, (err, response) => {
    if (err) {
        console.error("Attachment failed:", err);
        return;
    }
    console.log("Attachment sent:", response.data);
});
```

## Event Object
The `event` object should contain the recipient information:
```json
{
    "sender": {
        "id": "USER_ID"
    }
}
```
