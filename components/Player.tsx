"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Disc3,
  Music,
  PlayCircle,
  Shuffle,
  SkipBack,
  SkipForward,
  StopCircle,
  Volume2,
  VolumeOff,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Item } from "@/lib/data";
import { cn, shuffleArray } from "@/lib/utils";

function getUrl(url: string): string {
  return process.env.NEXT_PUBLIC_BASE_URL + url;
}

export default function Player({ songList }: { songList: Item[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [items, setItems] = useState(songList.slice(0, 1000));
  const handleShuffleClick = () => {
    setItems(shuffleArray(items));
  };

  const uniqueGenres = new Set(items.map((item) => item.genre));
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const handleGenreClick = (genre: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((i) => i != genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const uniqueInstruments = new Set(items.map((item) => item.instrument));
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const handleInstrumentClick = (instrument: string) => {
    setSelectedInstruments((prev) => {
      if (prev.includes(instrument)) {
        return prev.filter((i) => i !== instrument);
      } else {
        return [...prev, instrument];
      }
    });
  };

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  useEffect(() => {
    const filteredItems2 = items.filter((item) =>
      selectedInstruments.length === 0 && selectedGenres.length === 0
        ? true
        : selectedInstruments.length === 0
        ? selectedGenres.includes(item.genre)
        : selectedGenres.length === 0
        ? selectedInstruments.includes(item.instrument)
        : selectedInstruments.includes(item.instrument) &&
          selectedGenres.includes(item.genre)
    );
    setFilteredItems(filteredItems2);
  }, [items, selectedInstruments, selectedGenres]);

  useEffect;
  items.filter((item) =>
    selectedInstruments.length === 0
      ? true
      : selectedInstruments.includes(item.instrument)
  );

  const [selectedItem, setSelectedItem] = useState<Item>(items[0]);
  const handleRowClick = (item: Item) => {
    setSelectedItem(item);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayClick = async () => {
    if (!audioRef.current) return;

    if (selectedItem?.url) {
      audioRef.current.src = getUrl(selectedItem.url);
    } else {
      console.warn("No audio URL available for selected item.");
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const [isMuted, setIsMuted] = useState(false);
  const handleMuteState = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  const handleBackClick = () => {
    var currentIndex = selectedItem ? items.indexOf(selectedItem) : 0;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedItem(items[currentIndex]);
  };

  const handleForwardClick = () => {
    var currentIndex = selectedItem ? items.indexOf(selectedItem) : -1;
    currentIndex = (currentIndex + 1) % items.length;
    setSelectedItem(items[currentIndex]);
  };

  const getDuration = async (item: Item) => {
    if (!item.url) return 0;

    const response = await fetch(item.url);
    const audio = new Audio(response.url);
    await audio.load();
    return audio.duration;
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => setIsPlaying(false);
      const handleError = (error: Event) =>
        console.error("Audio playback error:", error);

      audioRef.current.addEventListener("ended", handleEnded);
      audioRef.current.addEventListener("error", handleError);

      return () => {
        audioRef.current?.removeEventListener("ended", handleEnded);
        audioRef.current?.removeEventListener("error", handleError);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    console.log("selectedItem:", selectedItem);
    if (!isPlaying) return;
    if (!audioRef.current) return;

    audioRef.current.src = getUrl(selectedItem.url);

    try {
      audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [selectedItem]);

  return (
    <div className="flex flex-col gap-4 items-center">
      <fieldset className="text-center border rounded-3xl p-1">
        <legend className="text-gray-300">Genres</legend>
        <div className="flex flex-wrap gap-2 m-2 justify-center align-middle text-center">
          {Array.from(uniqueGenres).map((genre) => (
            <button
              key={genre}
              className={cn(
                "bg-slate-600 text-slate-300 rounded-lg px-1 h-8",
                selectedGenres.includes(genre) && "bg-orange-600"
              )}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="text-center border rounded-3xl p-1">
        <legend className="text-gray-300">Instruments</legend>
        <div className="flex flex-wrap gap-2 m-2 justify-center align-middle text-center">
          {Array.from(uniqueInstruments).map((instrument) => (
            <button
              key={instrument}
              className={cn(
                "bg-slate-600 text-slate-300 rounded-lg px-1 h-8",
                selectedInstruments.includes(instrument) && "bg-orange-600"
              )}
              onClick={() => handleInstrumentClick(instrument)}
            >
              {instrument}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Player */}
      <div className="container flex flex-col sm:flex-row m-auto aspect-square sm:aspect-video rounded-3xl bg-orange-600">
        {/* Sidebar */}
        <div className="w-full sm:w-12 flex flex-row sm:flex-col items-center justify-evenly my-2">
          <Shuffle onClick={handleShuffleClick} className="cursor-pointer" />
          <SkipBack onClick={handleBackClick} className="cursor-pointer" />
          <button onClick={handlePlayClick} className="cursor-pointer">
            {isPlaying ? <StopCircle /> : <PlayCircle />}
          </button>
          <SkipForward
            onClick={handleForwardClick}
            className="cursor-pointer"
          />
          <button onClick={handleMuteState} className="cursor-pointer">
            {isMuted ? <VolumeOff /> : <Volume2 />}
          </button>
        </div>

        {/* PlayList */}
        <div className="w-full rounded-3xl text-slate-300 bg-slate-900 overflow-y-auto p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>Instrument</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredItems.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => {
                    handleRowClick(item);
                  }}
                  className={selectedItem === item ? "bg-orange-600" : ""}
                >
                  <TableCell className="font-medium">
                    {isPlaying && selectedItem == item ? (
                      <Disc3 className="rotating-svg text-slate-600 inline" />
                    ) : (
                      <></>
                    )}
                    {item.title}
                  </TableCell>
                  <TableCell>{item.artist}</TableCell>
                  <TableCell>{item.genre}</TableCell>
                  <TableCell>{item.instrument}</TableCell>
                  <TableCell className="text-right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableCaption className="text-orange-600">
              Found: {filteredItems.length}
              {isPlaying && (
                <div>
                  {selectedItem.title}
                  <Music className="inline random-color-svg" /> Playing
                </div>
              )}
            </TableCaption>
          </Table>
        </div>
      </div>

      <audio ref={audioRef} hidden>
        <source src={getUrl(selectedItem?.url)} />
      </audio>
    </div>
  );
}
