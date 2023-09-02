import { colors } from "./colors";

export interface Playlist {
  id: string;
  title: string;
  color: (typeof colors)[keyof typeof colors];
  cover: string;
  artists: string[];
}

export const playlists: Playlist[] = [
  {
    id: "1",
    title: "Electronic Party",
    color: colors.teal,
    cover:
      "https://www.visiteosusa.com.br/sites/default/files/styles/hero_l/public/images/hero_media_image/2018-03/1f193ea1be6ff6877e025ed15bc58e04.jpeg?h=2e3eca71&itok=9PJ7t-bf",
    artists: ["Avicii", "Alok"],
  },
  {
    id: "2",
    title: "Trance",
    color: colors.green,
    cover:
      "https://s3.playbpm.com.br/images/Armin_van_Buuren_reproducao_-_fac.2e16d0ba.fill-1140x450.jpg",
    artists: ["Tiesto", "Armin Van Buuren"],
  },
  {
    id: "3",
    title: "Trap Vibes",
    color: colors.rose,
    cover:
      "https://w0.peakpx.com/wallpaper/132/106/HD-wallpaper-travis-scott-purple-glitter-art-black-background-american-rapper-travis-scott-art-jacques-berman-webster-american-singer.jpg",
    artists: ["Post Malone", "Travis Scott", "21 savage"],
  },
  {
    id: "4",
    title: "Beatles Classics",
    color: colors.red,
    cover:
      "https://www.rbsdirect.com.br/imagesrc/25391415.jpg?w=1024&h=1024&a=c",
    artists: ["The Beatles"],
  },
  {
    id: "5",
    title: "Electronic Dance",
    color: colors.pink,
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYMVRyGaYJjpR8UhRIoVm7t88mRQhFwT7Ow&usqp=CAU",
    artists: ["Deadmau5"],
  },
  {
    id: "6",
    title: "Cow songs",
    color: colors.gray,
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCnAE5jlcKD1FzfuDh3AHcdiaqFO6VxiYIw&usqp=CAU",
    artists: ["Saint Hilda", "Canada Buffalo"],
  },
];

export const morePlaylists = [
  ...playlists.map((item) => ({
    ...item,
    id: item.id + "a",
  })),
];

export const allPlaylists = [...playlists, ...morePlaylists];
