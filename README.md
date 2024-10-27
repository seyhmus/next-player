This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It defines a React component named Player that serves as an audio player with functionalities such as shuffling songs, filtering by genre and instrument, and controlling playback (play, pause, mute, skip). It uses React hooks for state management and side effects, and leverages environment variables for configuration.

## Key Features
- Audio Playback: Plays and pauses audio tracks, with controls for skipping forward and backward.
- Filtering: Allows filtering of songs by genre and instrument.
- Shuffling: Shuffles the list of songs.
- Mute Control: Toggles the mute state of the audio.

## Customization
- Modify the songList Prop: Pass a different list of songs to the Player component to change the available tracks.
- Update the UI: Customize the imported UI components and icons to fit your design needs.
- Environment variables: Add NEXT_PUBLIC_BASE_URL to .env file in root directory

Preview at [Vercel](https://next-player-60r6c3khd-seyhmus1s-projects.vercel.app/) 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
