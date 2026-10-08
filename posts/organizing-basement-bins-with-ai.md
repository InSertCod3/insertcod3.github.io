![AI Vision Scanning Basement Bins](img/static/organizing-basement-bins-with-ai/organizing-basement-bins-with-ai-cover.jpeg)

So, over the last few weeks, I had a couple of times on my hand, so what I decided to do was to reorganize my home. But unfortunately, sometimes when you're trying to organize, you find more problems than you actually would pretty much want.

However, what I found was pretty annoying was I spent most of my times constantly trying to find things. I have a ton of tools, I have a ton of miscellaneous small things that my partner moves places, not that it's her fault, but just because you need to move things.

So, what I wanted was a system that essentially keeps track of everything that's in my home, specifically the ones that are stored in a few bins that I have in my basement. That's what I found to pretty much be the best solution to storage, to have them in a storage bin in the basement that I essentially could just go into, find what I need, and get it. But you could kind of see the issue there.

Well, I have about five bins, and all of those five bins have different things, and none of it is sorted. And one of the things I wanted to do was to essentially sort them. But how do you know what's in there? Well, that's where I made this app. I wanted something to essentially scan things inside and outside of bins just to make sure that, hey, they're in there!

Here is how the app operates in practice:

## 1. Snap and Identify

Instead of manually typing out titles and specs, I just point the camera at an item—in this test, a copy of *Borderlands: The Handsome Collection* for Xbox One. The camera captures the object and uploads it for processing.

<video autoplay muted loop playsinline controls src="img/static/organizing-basement-bins-with-ai/08CDBF30-CD29-4A49-8784-61E0E3D1F85F-grain-4x-0.mp4" width="100%"></video>

## 2. Let AI Vision Do the Data Entry

The app runs AI vision recognition to auto-fill the listing details. Within a few seconds:
- **Title & Brand:** Drafts "Borderlands: The Handsome Collection" under 2K Games.
- **Barcode & Category:** Reads the UPC barcode (`710425495328`) and classifies the item as Video Games.
- **Condition & Notes:** Detects item condition (Good) and drafts notes detailing included content (*Borderlands 2* and *Borderlands: The Pre-Sequel*).
- **Bin Assignment:** Prompts a drawer to select or scan a bin ID (e.g., `BIN-B9SZ` on the bookshelf).

<video autoplay muted loop playsinline controls src="img/static/organizing-basement-bins-with-ai/08CDBF30-CD29-4A49-8784-61E0E3D1F85F-grain-4x-1.mp4" width="100%"></video>

## 3. Inventory & Valuation Logged

Once saved, the item lives inside the app inventory with category tags, barcodes, financial valuation calculators (to simulate sale prices and net profit if selling down the line), and exact bin coordinates.

<video autoplay muted loop playsinline controls src="img/static/organizing-basement-bins-with-ai/08CDBF30-CD29-4A49-8784-61E0E3D1F85F-grain-4x-3.mp4" width="100%"></video>

## Under the Hood: Tech Stack

To make this feel snappy, seamless, and production-ready, here is what powers the stack behind the scenes:

- **Mobile Client:** Expo (SDK 57), React Native, and React for a smooth cross-platform mobile interface.
- **Language:** TypeScript end-to-end for type safety across mobile screens and API payloads.
- **Backend & ORM:** Node.js backend paired with Prisma ORM for quick database queries and bin relation mapping.
- **AI & Computer Vision:** Multimodal AI Vision API for instant object identification, condition detection, text extraction, and barcode parsing.

For the most part, the system's been working really well. There's obviously room for improvements. I could see that there could be a future where you could even sell things because you have a bunch of things that you don't use, you have duplicate tools, and all those different aspects. So, this could possibly be that solution for it.

But for right now, it's to just see what's in my bins, how I can get them faster, and not spin my wheels for a full four hours before I actually could get what I need. My cars will be happy, I'll be happy, my partner will be happy, and I think everybody wins.

## Say hi

Building custom tools, organizing chaotic storage, or working with AI vision? You can [book a virtual coffee](booking.html) and we can swap project ideas.