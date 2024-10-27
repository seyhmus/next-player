import Player from "@/components/Player";
import {items} from "@/lib/data";

export default function Home({songList}: {songList: Item[]}) {

  return (
    <div
      id="wrapper"
      className="flex flex-col justify-items-center items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-black"
    >
      <header className="row-start-1" />
      <main className="row-start-2">
        <Player songList={items} />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
