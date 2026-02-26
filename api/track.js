import express from 'express';
const router = express.Router();
export default router;

import { getTracks, getTrackById } from '#db/queries/tracks.js';

router.get('/', async (req, res) => {
  const tracks = await getTracks();
  res.json(tracks);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const track = await getTrackById(id);
  if (!track) {
    return res.status(404).json({ error: 'Track not found' });
  }
  res.json(track);
});