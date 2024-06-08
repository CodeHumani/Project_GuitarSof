import Tablature from '../models/tablature.model.js';

export const createTablature = async (req, res) => {
  try {
    const { title, artist, content } = req.body;
    const newTablature = await Tablature.create({ title, artist, content });
    res.status(201).json(newTablature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTablatures = async (req, res) => {
  try {
    const tablatures = await Tablature.findAll();
    res.status(200).json(tablatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTablatureById = async (req, res) => {
  try {
    const { id } = req.params;
    const tablature = await Tablature.findByPk(id);
    if (tablature) {
      res.status(200).json(tablature);
    } else {
      res.status(404).json({ message: 'Tablature not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTablature = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, content } = req.body;
    const [updated] = await Tablature.update({ title, artist, content }, { where: { id } });
    if (updated) {
      const updatedTablature = await Tablature.findByPk(id);
      res.status(200).json(updatedTablature);
    } else {
      res.status(404).json({ message: 'Tablature not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTablature = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Tablature.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Tablature not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
