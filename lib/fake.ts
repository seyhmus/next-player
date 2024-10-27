import { faker } from "@faker-js/faker";
import { genres, Item } from "./data";

export const generateFakeItems = (count: number): Item[] => {
  return Array.from({ length: count }, () => randItem());
};

export function randItem() {
  const genre = randGenre();
  const instrument = randInstrument(genre);

  return {
    id: faker.commerce.isbn(),
    title: faker.music.songName().substring(0, 35),
    url: Math.floor(Math.random() * 10) + ".mp3",
    artist: faker.music.artist(),
    genre,
    instrument,
    duration:
      Math.floor(Math.random() * 5) + ":" + Math.floor(Math.random() * 60),
    price: faker.commerce.price({ max: 10 }),
  };
}

export function rand(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function randGenre() {
  const genre = genres[Math.floor(Math.random() * genres.length)];
  return genre.name;
}

export function randInstrument(genreName: string) {
  const genre = genres.find((g) => g.name === genreName);
  if (!genre) throw new Error("Genre not found:" + genreName);
  const randomIndex = Math.floor(Math.random() * genre.instruments.length);
  return genre.instruments[randomIndex];
}
