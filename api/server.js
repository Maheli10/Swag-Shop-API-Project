const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Product = require('./models/product');
const Wishlist = require('./models/wishlist');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/swag-shop';

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

function invalidId(res) {
  return res.status(400).json({ error: 'Invalid id' });
}

app.get('/', (req, res) => {
  res.json({
    message: 'Swag Shop API',
    resources: {
      products: '/api/products',
      wishlists: '/api/wishlists'
    }
  });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  if (!req.body || !req.body.title || req.body.price === undefined) {
    return res.status(400).json({ error: 'title and price are required' });
  }
  try {
    const doc = new Product();
    doc.title = req.body.title;
    doc.price = req.body.price;
    if (req.body.likes !== undefined) doc.likes = req.body.likes;
    const saved = await doc.save();
    res.status(201).location('/api/products/' + saved._id).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Could not create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.price !== undefined) updates.price = req.body.price;
    if (req.body.likes !== undefined) updates.likes = req.body.likes;
    const doc = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Could not update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const doc = await Product.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Product not found' });
    await Wishlist.updateMany({}, { $pull: { products: doc._id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Could not delete product' });
  }
});

app.get('/api/wishlists', async (req, res) => {
  try {
    const list = await Wishlist.find().populate({ path: 'products', model: 'product' });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch wishlists' });
  }
});

app.get('/api/wishlists/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const doc = await Wishlist.findById(req.params.id).populate({ path: 'products', model: 'product' });
    if (!doc) return res.status(404).json({ error: 'Wishlist not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch wishlist' });
  }
});

app.post('/api/wishlists', async (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: 'title is required' });
  }
  try {
    const doc = new Wishlist();
    doc.title = req.body.title;
    const saved = await doc.save();
    res.status(201).location('/api/wishlists/' + saved._id).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Could not create wishlist' });
  }
});

app.put('/api/wishlists/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const updates = {};
    if (req.body && req.body.title !== undefined) updates.title = req.body.title;
    const doc = await Wishlist.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Wishlist not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Could not update wishlist' });
  }
});

app.delete('/api/wishlists/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const doc = await Wishlist.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Wishlist not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Could not delete wishlist' });
  }
});

app.post('/api/wishlists/:wishlistId/products', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.wishlistId)) return invalidId(res);
  if (!req.body || !req.body.productId) {
    return res.status(400).json({ error: 'productId is required in body' });
  }
  if (!mongoose.isValidObjectId(req.body.productId)) return invalidId(res);
  try {
    const foundProduct = await Product.findById(req.body.productId);
    if (!foundProduct) return res.status(404).json({ error: 'Product not found' });

    const updated = await Wishlist.findOneAndUpdate(
      { _id: req.params.wishlistId },
      { $addToSet: { products: foundProduct._id } },
      { new: true }
    ).populate({ path: 'products', model: 'product' });

    if (!updated) return res.status(404).json({ error: 'Wishlist not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not add product to wishlist' });
  }
});

app.delete('/api/wishlists/:wishlistId/products/:productId', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.wishlistId) || !mongoose.isValidObjectId(req.params.productId)) {
    return invalidId(res);
  }
  try {
    const updated = await Wishlist.findOneAndUpdate(
      { _id: req.params.wishlistId },
      { $pull: { products: req.params.productId } },
      { new: true }
    ).populate({ path: 'products', model: 'product' });

    if (!updated) return res.status(404).json({ error: 'Wishlist not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Could not remove product from wishlist' });
  }
});

app.listen(PORT, () => {
  console.log(`Swag Shop API running on http://localhost:${PORT}`);
});
