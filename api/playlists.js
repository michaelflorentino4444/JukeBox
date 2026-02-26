import express from 'express';
const router = express.Router();
export default router;

import { createPlaylist, getPlaylists, getPlaylistById } from '#db/queries/playlists.js';
import { getTracksByPlaylistId } from '#db/queries/tracks.js';
import { createPlaylistTrack } from '#db/queries/playlists_tracks.js';

router. get('/', async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required");
    const playlists = await getPlaylists();
  res.send(playlists);
});

router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) 
        return res.status(400).send("Required fields: name, description");
    const playlist = await createPlaylist(name, description);
    res.status(201).json(playlist);
});

router.param("id", async (req, res, next, id) => {
    const playlist = await getPlaylistById(id);
    if (!playlist) return res.status(404).send({ error: "Playlist not found" });
    req.playlist = playlist;
    next();
});

router.get("/:id", async (req, res) => {
    res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlist.id);
    res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required");
    const { trackId } = req.body;
    if (!trackId) return res.status(400).send("Required field: trackId");
    const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
    res.status(201).send(playlistTrack);
});