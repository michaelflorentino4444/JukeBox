import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 20; i++) {
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description");
    await createTrack("Track" + i, i * 50000);
}
for (let i = 0; i <= 15; i++) {
  const playlistId = Math.floor(i / 5);
  await createPlaylistTrack(playlistId, i);
}
}