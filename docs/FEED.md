# Facebook Feed Posting Tutorial

This tutorial covers how to use the Facebook Feed Posting feature to automate multi-photo and media postings to Facebook Pages.

## Usage

To start the posting process, ensure your `.env` is configured with `PAGE_ID` and `FEED_TOKEN`.

### Basic Posting

You can post a simple text message:

```typescript
const { posting } = await ProjectFacebook();
await posting("Hello, Facebook!");
```

### Multi-Media Posting

You can post messages with multiple images:

```typescript
const { posting } = await ProjectFacebook();
await posting({
    message: "Check out these photos!",
    media: [
        { url: "https://example.com/image1.jpg", caption: "Photo 1" },
        { url: "https://example.com/image2.jpg", caption: "Photo 2" }
    ]
});
```

### Using Callbacks

Both text and media postings support an optional callback function to handle the API response or errors:

```typescript
const { posting } = await ProjectFacebook();

posting("Hello with callback!", (err, response) => {
    if (err) {
        console.error("Posting failed:", err);
        return;
    }
    console.log("Post successful:", response.data);
});
```

## Commands

Run the following command to start the posting script:

```bash
npm start
```

This executes `src/index.ts`, which initializes the token and prepares the posting logic.
